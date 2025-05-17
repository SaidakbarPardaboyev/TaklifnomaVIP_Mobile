FROM golang:1.21-alpine AS builder

# Install necessary dependencies for building the application and Cgo support
RUN apk update && apk add --no-cache \
    build-base \
    libwebp-dev \
    curl

WORKDIR /go/src/github.com/SaidakbarPardaboyev/TaklifnomaVIP_Mobile

# Copy the local package files to the container's workspace.
COPY . ./

# Make sure to copy the config folder into the builder container
COPY ./backend/config /go/src/github.com/SaidakbarPardaboyev/TaklifnomaVIP_Mobile/backend/config

# Install dependencies and build the application
RUN export CGO_ENABLED=1 && \
    export GOOS=linux && \
    go mod vendor && \
    go build -o /taklifnomavip_mobile ./backend/cmd/main.go

# Use a minimal Alpine image for the final runtime stage
FROM alpine

# Copy the built Go binary from the builder stage
COPY --from=builder /taklifnomavip_mobile .

# Copy the Flutter web build files
COPY ./backend/cmd/web /mobile/web

# Copy the config directory from the builder stage to the final image
COPY --from=builder /go/src/github.com/SaidakbarPardaboyev/TaklifnomaVIP_Mobile/backend/config /config

# Install necessary runtime dependencies (e.g., curl)
RUN apk add --no-cache curl

# Set the entry point for the container
ENTRYPOINT ["/taklifnomavip_mobile"]


