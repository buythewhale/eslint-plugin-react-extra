# Disallow inline styles (no-inline-styles)

Require that inline styles either aren't used or depend on a variable.

## Rule Details

The following patterns are considered warnings:

```jsx
<div style="color: red" />

<div style={"color: red;"} />

<div style={`color: red;`} />

<div style={{ "height": 100 }} />

<div style={{ height: 100 }} />
```

The following patterns are not considered warnings:

```jsx
const height = 50 + "%";
const styles = { height: height };
return <div style={styles} />;

const height = 50 + "%";
return <div style={{ height: height }} />;

const height = 50 + "%";
const key = "height";
return <div style={{ [key]: height }} />;

const height = 50 + "%";
return <div style={`height: ${height}`} />;
```
