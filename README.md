# hamburger workbench

Design rules:
- names of components must be unique, multiple instances not supported
- fanout not supported: every output port must have 0 or 1 connections, error if >1

Design rules:
supported but not atomic:
- etag - each message should be wrapped in a wrapper, e,g, [etag message end-etag] -> [message] after unwrapping by etag layerm or, maybe [etag message] -> [message] (end-etag is syntactic sugar)
  - etag is just a wrapper layer

- Fundamental component
  - in and out
  - use unwrapper component to understand etags and to forward stripped message to 1:many receivers
  
  
- need diagram macros
  - etag demultiplexor is hidden in certain variants (ag macros)
  - fanout is hidden in certain variants (ag macros)
  - bounded queues are hidden in (FBP macros)


Note to self:
```
var cloneddata = Object.assign ({}, message.data);
```
