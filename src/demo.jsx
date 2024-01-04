// @target 'InDesign'
// @targetengine 'demo'

// @include './MenuMaker.jsx'

function demo() {

  var someContext = {status: 'active'}
  // You can make sub-menus disabled or enabled based on
  // some context. Disabled items appears greyed-out
  // and not clickable.

  function isEnabledByContext() {
    return someContext.status === 'active' ? true : false
  }

  function isEnabled() {
    return true
  }


  // DEFINE SUB-MENUS' HANDLERS

  function setContext(status) {
    someContext.status = status
  }

  function sayHello() {
    alert('Hello World!')
    // ...
  }

  function unloadMenu() {
    customMenu.unload()
  }


  // DEFINE SUB-MENUS

  // You can disable or enable submenu items.
  // NOTE: `enabled` parameter must be a function
  // or a callback which return boolean
  var disabledSubMenu = new SubMenu({
    name: 'Submenu Disabled By Default',
    handler: sayHello,
    enabled: function () {
      return false
    }
  })

  // You may omit `enabled` parameter entirely
  // so the menu item will be always active by default
  var enabledSubMenu = new SubMenu({
    name: 'Submenu Enabled By Default',
    handler: sayHello,
  })

  // You can pass parameters to handlers
  // This sub-menu will become inactive when clicked
  var changeContextSubMenu = new SubMenu({
    name: 'Change Context',
    handler: function () {
      setContext('inactive')
    },
    enabled: isEnabledByContext
  })

  var fourthSubMenu = new SubMenu({
    name: 'Unload the Custom menu',
    handler: unloadMenu,
    enabled: isEnabled
  })


  // CREATE MENU

  // Add a new item to the menu bar of InDesign
  // Sub-menus will appear in the same order
  // as they listed in the `items` array
  var customMenu = new MenuMaker({
    name: 'Custom Menu',
    items: [
      changeContextSubMenu,
      disabledSubMenu,
      enabledSubMenu,
      fourthSubMenu
    ],
  })
}

demo()
