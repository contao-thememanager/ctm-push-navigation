# ctm-push-navigation

## Description
Extends the theme manager configuration with new fields for a push navigation integration.

After compiling your theme, make sure to add:
- _pushnavigation.css to your Layout stylesheet settings
- js_ctm_pushnavigation to your javascript template

Make sure to follow following order of css files in your layout due to performance

1. _pushnavigation.css
2. ...
3. _theme.css (theme manager core)
4. ...

## Settings
<table>
  <tr>
    <th colspan="2"><strong>Push Navigation</strong></th>
  </tr>
  <tr>
    <td><strong>Option</strong></td>
    <td><strong>Description</strong></td>
  </tr>
  <tr>
    <td>$pn-background</td>
    <td>Background color of the push navigation</td>
  </tr>
  <tr>
    <td>$pn-border-bottom-color</td>
    <td>Bottom border of the push navigation items</td>
  </tr>
  <tr>
    <td>$pn-breadcrumb-color</td>
    <td>Color for the breadcrumb icons of the push navigation</td>
  </tr>
  <tr>
    <td>$pn-breadcrumb-color-hover</td>
    <td>Color for the breadcrumb icons of the push navigation when hovered</td>
  </tr>
  <tr>
    <td>$pn-item-font-size</td>
    <td>Font size of the push navigation items</td>
  </tr>
  <tr>
    <td>$pn-item-font-weight</td>
    <td>Font weight of the push navigation items</td>
  </tr>
  <tr>
    <td>$pn-item-color</td>
    <td>Text color of the push navigation items</td>
  </tr>
  <tr>
    <td>$pn-item-color-active</td>
    <td>Text color of active or trailing push navigation items</td>
  </tr>
</table>
