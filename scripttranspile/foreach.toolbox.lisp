(defstruct foreach_0
  handler
  (outputqueue (make-queue))
  state
  exitstack ...
  files nil
  )

(defun new-foreach_0 ()
  (let ((obj (make-foreach_0 :handler handler-fforeach_0
			     :outputqueue nil
			     :state nil
			     :exitstack nil)))
    (fidleenter obj)))

(defun handler-fforeach_0 (self message)
  (cond 
    ((string= "idle" (foreach_0-state self))
     (funcall fidlestatehandler self message))
    ((string= "generating" (foreach_0-state self))
     (funcall fgeneratingstatehandler self message))
    ((string= "blocked" (foreach_0-state self))
     (funcall fblockedstatehandler self message))
    (t (panic (format nil "handler-fforeach_0 invalid state ~a" self)))))

(defun fidleenter (self)
  (push fidleexit (foreach_0-exitstack self)))
(defun fidleexit (self)
  )
(defun fidlestatehandler (self message)
  (cond ((string= "env" (message-etag message))
	 (setf (foreach_0-env self) (message-data message)))
	((string= "begin" (message-etag message))
	 (mapc #'(lambda (f) (funcall f self)) (foreach_0-exitstack self))
	 (setf (foreach_0-state self) "generating")
	 (funcall fgeneratingenter self))))

(defun fgeneratingenter (self)
  (cond
    ((empty (foreach_0-files self))
     (mapc #'(lambda (f) (funcall f self)) (foreach_0-exitstack self))
     (setf (foreach_0-state self) "idle")
     (funcall fidleenter self)
     (return-from fgeneratingenter))
    (t
     (let ((subenv (cons (pop (foreach_0-files self)) (foreach_0-env self))))
       (funcall (enqueue (foreach_0-outputqueue self) (list "env" subenv))))
     (funcall (enqueue (foreach_0-outputqueue self) (list "kick" subenv)))
     (mapc #'(lambda (f) (funcall f self)) (foreach_0-exitstack self))
     (setf (foreach_0-state self) "blocked")
     (funcall fblockedenter self))))

(defun fgeneratingexit (self)
  )
(defun fgeneratingstatehandler (self message)
  (cond ((string= "env" (message-etag message))
	 (setf (foreach_0-env self) (message-data message)))))

(defun fblockedenter (self)
  (push fidlblockedexit (foreach_0-exitstack self)))
(defun fblockedexit (self)
  )
(defun blockedstatehandler (self message)
  (cond ((string= "env" (message-etag message))
	 (setf (foreach_0-env self) (message-data message)))
	((string= "resme" (message-etag message))
	 (mapc #'(lambda (f) (funcall f self)) (foreach_0-exitstack self))
	 (setf (foreach_0-state self) "generating")
	 (funcall fgeneratingenter self))))


