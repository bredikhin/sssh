# Streaming SSH

[![Build Status](https://travis-ci.org/bredikhin/sssh.png?branch=master)](https://travis-ci.org/bredikhin/sssh)
[![NPM version](https://badge.fury.io/js/sssh.png)](http://badge.fury.io/js/sssh)

## Installation

`npm install --save sssh`

[![NPM](https://nodei.co/npm/sssh.png)](https://nodei.co/npm/sssh/)

## Usage

```javascript
  var Connection = require('ssh2');
  var ssh = new Connection();
  var settings = { <your connection settings> };
  var Sssh = require('sssh').Command;
  var sssh = new Sssh(ssh, 'pwd');
  sssh.pipe(process.stdout);

  ssh.connect(settings);
```

This will output the path to the current folder after establishing an SSH connection.

## Contributions

* are welcome;
* should be tested;
* should follow the same coding style.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 [Ruslan Bredikhin](http://www.ruslanbredikhin.com/)
