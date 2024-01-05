// @target 'InDesign'
// @targetengine 'demo'

// @include './MenuMaker.jsx'

function demo() {

  /*************************
   * DEFINE SUB-MENUS STATE
  *************************/

  var someContext = {status: 'active'}

  function isEnabledByContext() {
    return someContext.status === 'active' ? true : false
    /* You can disable or enable sub-menus based on some context.
       Disabled items appears greyed-out and not clickable. */
  }

  function isEnabled() {
    return true
    /* You can disable or enable sub-menus explicitly */
  }

  /*****************************
   * DEFINE SUB-MENUS' HANDLERS
  *****************************/

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

  /*******************
   * DEFINE SUB-MENUS
  *******************/

  var disabledSubMenu = new SubMenu({
    name: 'Submenu Disabled By Default',
    onClick: sayHello,
    enabled: function () {
      return false
      /* NOTE: `enabled` parameter must be a function
         or a callback that returns boolean */
    }
  })

  var enabledSubMenu = new SubMenu({
    name: 'Submenu Enabled By Default',
    onClick: sayHello,
    /* You may omit `enabled` parameter entirely
       so the menu item will always be active by default */
  })

  var changeContextSubMenu = new SubMenu({
    name: 'Change Context',
    onClick: function () {
      setContext('inactive')
      /* When clicked, this item will become inactive
         the next time you open the menu */
    },
    enabled: isEnabledByContext
  })


  var fourthSubMenu = new SubMenu({
    name: 'Unload the Custom menu',
    onClick: unloadMenu,
    enabled: isEnabled
  })

  /**************
   * CREATE MENU
  **************/

  var customMenu = new MenuMaker({
    name: 'Custom Menu',
    items: [
      disabledSubMenu,
      enabledSubMenu,
      changeContextSubMenu,
      fourthSubMenu
      /* Sub-menus will appear in the same order
         as they listed here */
    ],
  })

  app.addEventListener(Event.BEFORE_QUIT, unloadMenu)
}

demo()
