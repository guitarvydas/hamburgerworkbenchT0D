	      'states (list (list "idle" 'fidleenter 'fidlemessagehandler 'fieldexit)
			    (list "generating" 'fgeneratingenter 'fgeneratingmessagehandler 'fgeneratingexit)
			    (list "blocked" 'fblockedenter 'fblockedmessagehandler 'fblockedexit))

'states (make-list
	 (make-state "idle" 'enter 'fidleenter 'handler 'fidlemessagehandler 'exit 'fieldexit)
	 (make-state "generating" 'enter 'fgeneratingenter 'handler 'fgeneratingmessagehandler 'exit 'fgeneratingexit)
	 (make-state "blocked" 'enter 'fblockedenter 'handler 'fblockedmessagehandler 'exit 'fblockedexit))
