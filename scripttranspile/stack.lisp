(defun new-stack ()
  (let ((self (new-object
               'kind "stack"
	       'parent nil 
	       'stack nil 
	       'push 'f-push 
	       'pop 'f-pop)))
    self))

(defun f-push (self v)
  (let ((stack (fetch self 'stack)))
    (let ((newstack (cons v stack)))
      (putv self 'stack newstack))))

(defun f-pop (self)
  (let ((stack (fetch self 'stack)))
    (let ((v (car stack)))
      (let ((newstack (cdr stack)))
	(putv self 'stack newstack)
	v))))
