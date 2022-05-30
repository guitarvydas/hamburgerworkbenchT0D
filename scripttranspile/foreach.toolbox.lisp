(defun new-foreach_0 ()
  (let ((obj (new-object
	      'state nil
	      'exitstack (new-stack)
	      'states (new-object
			'idle (new-object
				'enter 'idleenter
				'handler 'idlehandler
				'exit 'idleexit)
			'generating (new-object
				      'enter 'generatingenter
				      'handler 'generatinghandler
				      'exit 'generatingexit)
			'blocked (new-object
				      'enter 'blockedenter
				      'handler 'blockedhandler
				      'exit 'blockedexit))
	      'handler 'foreach_0_statehandler
	      'outputqueue (new-queue)
	      'env (new-environment)
	      'files (new-list))))
    (%call (? (? (? obj) 'idle) 'enter))))

(defun foreach_0_statehandler (self message)
  (cond
    ((eq 'idle (? (? self) state))
     (%call (? (? (? (? self) 'states) 'idle) 'handler) self message))
    ((eq 'idle (? (? self) state))
     )
    ((eq 'idle (? (? self) state))
     )
    (t (panic 'foreach_0_statehandler))))


(defun idleenter (self)
  (%call (? (? (? self) 'exitstack) 'push) (? (? (? (? self) 'states) 'idle) 'exit))
  (%overwrite (? (? self) 'files ❮list files '/Users/tarvydas/temp/ps/@book-Hamburger Workbench - A Frivolous Introduction to Ohm-JS'❯)))

(defun idleexit (self) (declare (ignore self)))

(defun idlehandler (self message)
  (cond
    ((eq 'env (? message 'etag))
     (%overwrite (? self 'env) (? message 'data)))
    ((eq 'begin (? message 'etag))
     (mapc #'(lambda (func) (funcall func self)) (? self 'exitstack))
     (%overwrite (? self 'state) 'generating)
     (%call (? (? self) 'generatingenter) self))))
    
  


(defun generatingenter (self)
  (%call (? (? (? self) 'exitstack) 'push) (? (? (? (? self) 'states) 'generating) 'exit))
  (cond

    ((? (? (? self) 'files) 'empty)
     (mapc #'(lambda (func) (funcall func self)) (? self 'exitstack))
     (%overwrite (? self 'state) 'idle)
     (%call (? (? self) 'idleenter) self)
     (return-from generatingenter))

    (t
     (let ((subenv (cons (? (? (? self) 'files) 'pop) (? (? self) 'env))))
       (%call (? (? (? self) 'outputqueue) 'enqueue) (list 'env subenv)))
     (%call (? (? (? self) 'outputqueue) 'enqueue) (list 'kick ❮trigger❯))
     (mapc #'(lambda (func) (funcall func self)) (? self 'exitstack))
     (%overwrite (? self 'state) 'blocked)
     (%call (? (? self) 'blockedenter) self))))

(defun generatingexit (self) (declare (ignore self)))

(defun generatinghandler (self message)
  (cond
    ((eq 'env (? message 'etag))
     (%overwrite (? self 'env) (? message 'data)))))  
     
    
  
(defun blockedenter (self)
  (%call (? (? (? self) 'exitstack) 'push) (? (? (? (? self) 'states) 'blocked) 'exit)))

(defun blockedexit (self) (declare (ignore self)))

(defun blockedhandler (self message)
  (cond
    ((eq 'env (? message 'etag))
     (%overwrite (? self 'env) (? message 'data)))
    ((eq 'resume (? message 'etag))
     (mapc #'(lambda (func) (funcall func self)) (? self 'exitstack))
     (%overwrite (? self 'state) 'generating)
     (%call (? (? self) 'generatingenter) self))))
  
  
