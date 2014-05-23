'use strict';

/**
 * Dependencies
 */
var should = require('should');
require('colors');
var EventEmitter = require('events').EventEmitter;
var Writable = require('stream').Writable;
var Transform = require('stream').Transform;
var ssh = function(err) {
  return {
    exec: function(command, cb) {
      command.should.be.eql('sort of a command');
      var stream = new EventEmitter();
      cb(err, stream);
      stream.emit('data', 'Success!');
      stream.emit('end');
    }
  };
};
var Sssh = require('../');
var Command = Sssh.Command;
var writable = Writable();

writable._write = function(chunk, enc, next) {
  chunk.toString().should.containEql('Success!');

  next();
};

describe('Sssh', function() {
  describe('Command', function() {
    it('is a transform stream', function(done) {
      var command = new Command(ssh());
      command.should.be.an.instanceOf(Transform);

      done();
    });

    describe('executes the command and', function() {
      it('throws an error on failure', function(done) {
        (function() {
          var command = new Command(ssh(new Error('Ouch!')), 'sort of a command');
        }).should.throwError();

        done();
      });

      it('streams the output on success', function(done) {
        var command = new Command(ssh(), 'sort of a command');
        writable.on('finish', function() {
          done();
        });

        command.pipe(writable);
      });
    });
  });
});
