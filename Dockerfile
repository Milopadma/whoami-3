# ---------------------------------------------------------------------------
# build stage
# ---------------------------------------------------------------------------
FROM denoland/deno:2.1.4 AS builder

WORKDIR /app

# copy configuration files
COPY deno.json deno.lock* ./
COPY vite.config.ts tsconfig.json* ./
COPY postcss.config.js tailwind.config.js tailwind.config.ts ./

# copy source files
COPY index.html ./
COPY public ./public
COPY src ./src

# cache dependencies
RUN deno cache --node-modules-dir npm:vite

# build the application
RUN deno task build

# ---------------------------------------------------------------------------
# production stage
# ---------------------------------------------------------------------------
FROM denoland/deno:alpine-2.1.4

WORKDIR /app

# copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# expose port
EXPOSE 8000

# serve the static files
CMD ["deno", "run", "--allow-net", "--allow-read", "jsr:@std/http@1/file-server", "dist/", "--port", "8000", "--host", "0.0.0.0"]
