foreach.mdsm
 -> convert triple-backticked quotes to unicode "❮ ... ❯" (verbatim3.ohm + verbatim.fmt)
  -> convert single-backticked quotes to unicode "❮ ... ❯" (verbatim1.ohm + verbatim.fmt)
   -> convert to CFG .sm file (from .md indentation-oriented to brace-bracketed) (mdsm.ohm+mdsm.fmt) 
    -> foreach.sm
	
-> (sm.ohm+???) groks brace-bracketed state machine
 -> (sm.ohm + sm.pseudo.fmt) converts to sm.pseudo (e.g. target.foreach.pseudo)

 
