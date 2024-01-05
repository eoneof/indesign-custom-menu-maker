/* Add semicolon to prevent bad things from happening to concatenated code. */
;

var MenuMaker = /** @class */ (function () {
  var menuBar = app.menus.item('$ID/Main').submenus

  /**
   * @param {{ name: string, items: [{ name: string, onClick(): void, enabled(): boolean }] }} props
   */
  function /** @constructor */ $(props) {
    this.menuName = props.name
    this.newMenuItems = props.items

    this.unload() // Prevent possible duplication on instance init
    menuBar.add(this.menuName, LocationOptions.AFTER, menuBar.lastItem())

    this.menu = menuBar.item(this.menuName).menuItems

    var l = this.newMenuItems.length
    for (var i = 0; i < l; i++) {
      var newItem = this.newMenuItems[i]
      var subMenu = app.scriptMenuActions.add(newItem.name)

      this.menu.add(subMenu)
      newItem.setHandlers(subMenu)
    }
  }

  $.prototype.unload = /** method */ function () {
    try {
      menuBar.item(this.menuName).remove()
    } catch (err) {}
  }

  return $
}())

var SubMenu = /** @class */ (function () {
  /**
   * @param {{ name: string, onClick(): void, enabled(): boolean }} props
   */
  function /** @constructor */ $(props) {
    this.name = props.name
    this.onClick = props.onClick
    this.enabled = props.enabled || function () {return true}
  }

  /**
   * @param {MenuItem} subMenu
   */
  $.prototype.setHandlers = /** method */ function (subMenu) {
    var self = this

    subMenu.eventListeners.add(Event.ON_INVOKE, this.onClick)
    subMenu.eventListeners.add(Event.BEFORE_DISPLAY, function () {
      subMenu.enabled = self.enabled()
    })
  }

  return $
}())
