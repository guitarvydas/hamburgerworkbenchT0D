(defun new-queue ()
  (let ((self (new-object
               'kind "queue"
	       'parent nil 
	       'q nil 
	       'enqueue 'f-enqueue 
	       'dequeue 'f-dequeue)))
    self))

(defun f-enqueue (self v)
  (let ((q (fetch self 'q)))
    (let ((newq (cons v q)))
      (putv self 'q newq))))

(defun f-dequeue (self)
  (let ((q (fetch self 'q)))
    (let ((v (car (last q))))
      (let ((newq (butlast q)))
	(putv self 'q newq)
	v))))
