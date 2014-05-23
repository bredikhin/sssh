'use strict';

/**
 * Dependencies
 */
var util = require('util');
var Transform = require('stream').Transform;
var path = require('path');

var Sssh = {};

module.exports = Sssh;

function Command(ssh, command) {
  if (!(this instanceof Command))
    return new Command(ssh, command);

  Transform.call(this);

  var self = this;
  if (command) {
    ssh.exec(command, function(err, stream) {
      if (err) {
        self.emit('error', err);
        return;
      }

      stream.on('data', function(data, type) {
        data = data.toString().replace(/^\s+|\s+$/g, '');
        if (type === 'stderr') {
          ssh.emit('error', new Error(data));
        }
        else
          self.push(data);
      });

      stream.on('end', function() {
        self.push(null);
      });
    });
  }
  else {
    this.push(null);
  }
}

util.inherits(Command, Transform);

Command.prototype._transform = function(chunk, enc, cb) {
  this.push(chunk, enc);

  cb();
};

Sssh.Command = Command;
