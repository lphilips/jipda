function Addr()
{
}

Addr.isAddress =
  function(value)
  {
    return value instanceof Addr;
  }


//// 

function ContextAddr(base, context)
{
  assertDefinedNotNull(base);
//  assertDefinedNotNull(context);
  this.base = base; 
  this.context = context;
}
ContextAddr.prototype = Object.create(Addr.prototype);

ContextAddr.prototype.accept =
  function (visitor)
  {
    return visitor.visitContextAddr(this);
  }

ContextAddr.base =
  function (addr)
  {
    return addr.base;
  }

ContextAddr.context =
  function (addr)
  {
    return addr.context;
  }

ContextAddr.prototype.toString =
  function ()
  {
    return this.base + "@" + this.context;
  }

ContextAddr.prototype.equals =
  function (x)
  {
    if (this === x)
    {
      return true;
    }
    if (!(x instanceof ContextAddr))
    {
      return false;
    }
    return Eq.equals(this.base, x.base) && Eq.equals(this.context, x.context);
  }

ContextAddr.prototype.subsumes =
  function (x)
  {
    return this.equals(x);
  }

ContextAddr.prototype.hashCode =
  function ()
  {
    var prime = 71;
    var result = 1;
    result = prime * result + this.base.hashCode();
    result = prime * result + HashCode.hashCode(this.context);
    return result;
  }
