# port
a command line utility for managing local ports

## Install

One line install
```console
curl -o /usr/local/bin/port https://raw.githubusercontent.com/dylanstanfield/port/master/port && chmod +x /usr/local/bin/port
```

## Usage

### Clear
Kill the process running on a given port

```console
$ port clear 5432

Cleared { port: 5432 }
```

### List
Lists active ports

```console
$ port list

Found 2 active ports

   port          command                 pid           type          fd
   --------------------------------------------------------------------------
   8000          node                    320           IPv4          3u
   3000          node                    1170          IPv4          15u

```