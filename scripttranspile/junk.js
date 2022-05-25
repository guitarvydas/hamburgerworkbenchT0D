machine foreach{

code  {
⟪var files;⟫

}
state idle {

on begin {
⟪files = fs.readdirSync ("${s}");⟫
☞ generating

} 
}
code generating {
⟪
      if (0 === files.length) {
        ☞ idle
      } else {
        var newenv = env.cons ({f: file.unshift ()}, env);
        ⇑ env ⟪newenv⟫

        ⇑ kick ⟪true⟫

      }
    ⟫
☞ blocked

}
state blocked {

on resume {
☞ generating



} 
}
}

\`foreach tag=/\${message.etag}/\`
