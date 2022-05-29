(defun fetch (self name)
  ;; fetch a named field from self object
  (multiple-value-bind (v foundv)
      (gethash name self)
    (cond (foundv v)
	  (t
	   (multiple-value-bind (parent found-parent)
	       (gethash 'parent self)
	     (cond (found-parent
		    (fetch parent name))
		   (t nil)))))))


(defun putv (self name v)
  ;; put v as the own-value under the key "name" on object self
  (multiple-value-bind (dont-care foundkey)
      (gethash name self)
    (declare (ignore dont-care))
    (cond 
      (foundkey (setf (gethash name self) v)) ;; overwrite previous value
      (t (setf (gethash name self) v)))     ;; insert new key+value (in CL, this is the same as above, is this true in other languages?)
    v))

(defun new-object (&rest pairs)
  (let ((obj (make-hash-table :test 'equal)))
    (let ((dont-care (insert-pairs obj pairs)))
      (declare (ignore dont-care))
      obj)))

(defun insert-pairs (self pairs)
  (cond
    ((null pairs) nil)
    (t
     (let ((key (car pairs))
	   (v   (car (cdr pairs))))
       (setf (gethash key self) v)
       (insert-pairs self (cdr (cdr pairs)))))))

(defun @ (self func &rest args)
  (apply (fetch self func) (cons self args)))