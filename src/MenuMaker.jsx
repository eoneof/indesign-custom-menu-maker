var MenuMaker =  /** @class */ (function () {
  var menuBar = app.menus.item('$ID/Main').submenus

  /**
   * @constructor
   * @arg {{ name: string, items: [{ name: string, handler(): void, enabled(): boolean }] }} props
   */
  function $(props) {
    this.menuName = props.name
    this.newMenuItems = props.items

    try {menuBar.item(this.menuName).remove()} catch (err) {} // Prevent duplication

    this.menu = menuBar.add(this.menuName, LocationOptions.AFTER, menuBar.lastItem())
    this.menuList = menuBar.item(this.menuName).menuItems

    var l = this.newMenuItems.length
    for (var i = 0; i < l; i++) {
      var newItem = this.newMenuItems[i]
      var subMenu = app.scriptMenuActions.add(newItem.name)

      this.menuList.add(subMenu)
      newItem.setHandlers(subMenu)
    }
  }

  /** @method */
  $.prototype.unload = function () {
    this.menu.remove()
  }

  return $
}())

var SubMenu = /** @class */ (function () {

  /**
   * @constructor
   * @arg {{ name: string, handler(): void, enabled(): boolean }} props
   */
  function $(props) {
    this.name = props.name
    this.handler = props.handler
    this.enabled = props.enabled || function () {
      return true
    }
  }

  /**
   * @method
   * @arg {MenuItem} subMenu
   */
  $.prototype.setHandlers = function (subMenu) {
    var self = this
    subMenu.eventListeners.add(Event.ON_INVOKE, this.handler)
    subMenu.eventListeners.add('beforeDisplay', function () {
      subMenu.enabled = self.enabled()
    })
  }

  return $
}())
