# Multi-stage build for Next.js frontend
FROM node:20-alpine AS base

# Enable Corepack to use the correct Yarn version (4.6.0 as specified in package.json)
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable Corepack in this stage too
RUN corepack enable

# Copy package files
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout 300000

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
# Enable Corepack in builder stage
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables (if needed)
# These should be provided at build time via --build-arg or .env
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_STRIPE_KEY

ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION
ENV NEXT_PUBLIC_STRIPE_KEY=$NEXT_PUBLIC_STRIPE_KEY

# Build the application
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Enable Corepack in runner stage
RUN corepack enable

# Copy package files for production dependencies
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock* ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production --network-timeout 300000 && \
    yarn cache clean

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

# Set the correct permission for prerender cache
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 8000

ENV PORT=8000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["yarn", "start"]

