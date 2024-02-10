# InDesign custom menu maker

With this simple framework you can create an infinite amount of your very own menu items in a declarative way.

Menus are useful for multi-purpose startup scripts.

![screenshot](/img/screenshot.png)
*Demo*

## Usage
- Include [MenuMaker.jsx](src/MenuMaker.jsx) into your script
- Define a handler:
  ```js
  var handler = function() {
    // Do your stuff here
  }
  ```
- Define a submenu:
  ```js
  var subMenu = new SubMenu({
    name: 'Do my stuff',
    onClick: handler
  })
  ```
- Define a menu:
  ```js
  var menu = new MenuMaker({
    name: 'Stuff',
    items: [subMenu]
  })
  ```

For more details see [demo.jsx](src/demo.jsx)

## Limitations
- Sub-sub-menus are not supported
- There are no extra error handlers or parameters checks
