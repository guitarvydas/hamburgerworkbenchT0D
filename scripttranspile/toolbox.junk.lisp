

(defclass Runnable ()
  ((outputqueue :accessor outputqueue :initform (make-instance 'queue))))

(defclass HSM (Runnable) ;; hierarchical state machine
  ((state :accessor state :initform "idle")
   (exitstack :accessor exitstack :initform nil)
   ))

(defclass foreach_0 (HSM))

(defmethod handler ((self foreach_0) message)
  (fforeach_0_handler self message))

(defmethod initialize-instance :after ((self foreach_0))
  (fidlehandler self))

(defmethod fforeach_0_handler ((self foreach_0) message)
  
