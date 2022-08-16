# calver-cli

A CLI tool suite for [Calendar Versioning](https://calver.org/).

Essentially, this tool is just a thin wrapper around
[calver](https://github.com/muratgozel/node-calver).

## Installation

With `node` and `npm` installed:

```shell
npm install -g calver-cli
```

## Usage

### Incrementing

Increment an existing version by provide a current version (or none at all), a format, and the
"levels" of the version you want to increment.

Examples (if run in August 2022):

```shell
calver inc 2022.7.0 --format yyyy.mm.minor --levels calendar
# => 2022.8.0

calver inc 2022.8.0 --format yyyy.mm.minor --levels calendar
# => Error: No change happened in the version.
```

```shell
calver inc 2022.7.0 --format yyyy.mm.minor --levels calendar.minor
# => 2022.8.0

calver inc 2022.8.0 --format yyyy.mm.minor --levels calendar.minor
# => 2022.8.1
# note the spillover when calver and semver levels are specified
```

```shell
calver inc --format yyyy.mm.minor --levels calendar.minor
# => 2022.8.0
# new version created from current time if no previous version specified
```

### Validating

Validate that a given version conforms to a format. Outputs `valid` or `invalid` accordingly. If
invalid, the exit code will be non-zero.

```shell
calver validate 2022.8.0 --format yyyy.mm.minor
# => valid
```

As of writing, this seems to only point out issues with zero-padding (`3` is not valid for `0m`) and
erroneous years (year `1000` is okay for `yyyy`, but `999` is not).

```shell
calver validate 2022.3 --format yyyy.0m
# => invalid

calver validate 999.3.0 --format yyyy.mm
# => invalid
```

## Format strings

This tool internally uses [calver](https://github.com/muratgozel/node-calver). See its
documentation for all the flags available. Format strings are parse without case sensitivity.
