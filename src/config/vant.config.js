import { 
    Button, 
    List, 
    Cell, 
    CellGroup,
    Tabbar, 
    TabbarItem,
    NavBar,
    Icon,
    Popup,
    Toast,
    Dialog
 } from 'vant';

export function vant(app) {
    app.use(Button);
    app.use(List)
    app.use(Cell);
    app.use(CellGroup);
    app.use(Tabbar);
    app.use(TabbarItem);
    app.use(NavBar);
    app.use(Icon);
    app.use(Popup);
    app.use(Toast);
    app.use(Dialog);
}
