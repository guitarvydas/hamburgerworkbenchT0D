{ every condition must be true

  { for every child of me ⇒ «c»
    { for every port of «c» ⇒ «p»
      { unless
        { OR
          { «p» has 0 edges }
          { «p» has 1 edge  }
        }
        { design rule violation "restriction error: fanout on «p»" }
      }
    }
  }

  { for every output port of me ⇒ «p»
    { unless
      { OR
        { «p» has 0 edges }
        { «p» has 1 edge  }
      }
      { design rule violation "restriction error: fanout on «p»" }
    }
  }

}