#https://bitfieldconsulting.com/golang/docker-image

FROM golang:1.14-alpine AS build

WORKDIR /src/
COPY /src /src/
RUN CGO_ENABLED=0 go build -o /bin/build

FROM scratch
COPY --from=build /bin/build /bin/build
ENTRYPOINT ["/bin/build"]