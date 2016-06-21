Test.utils.renderBoolean = function (value, props, row) {
    return value
        ? String.format('<span class="green">{0}</span>', _('yes'))
        : String.format('<span class="red">{0}</span>', _('no'));
};

Test.utils.getMenu = function (actions, grid, selected) {
    var menu = [];
    var cls, icon, title, action = '';


    for (var i in actions) {
        if (!actions.hasOwnProperty(i)) {
            continue;
        }

        var a = actions[i];
        if (!a['menu']) {
            if (a == '-') {
                menu.push('-');
            }
            continue;
        }
        else if (menu.length > 0 && /^remove/i.test(a['action'])) {
            menu.push('-');
        }

        if (selected.length > 1) {
            if (!a['multiple']) {
                continue;
            }
            else if (typeof(a['multiple']) == 'string') {
                a['title'] = a['multiple'];
            }
        }

        cls = a['cls'] ? a['cls'] : '';
        icon = a['icon'] ? a['icon'] : '';
        title = a['title'] ? a['title'] : a['title'];
        action = a['action'] ? grid[a['action']] : '';


        menu.push({
            handler: action,
            text: String.format(
                '<span class="{0}"><i class="x-menu-item-icon {1}"></i>{2}</span>',
                cls, icon, title
            ),
        });
    }

    return menu;
};

