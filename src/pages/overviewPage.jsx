import { Page, Color } from 'tabris';
import { Tab, TabFolder } from 'tabris';

export function overviewPage() {
    const page = new Page({ title: 'Overview', background: Color.white, autoDispose: true });
    const tabs = new TabFolder({ left: 0, top: 'prev() 8', right: 0, bottom: 0 })
        .onSelect(({ selection }) => console.log(`Tab changed to ${selection}`))
        .appendTo(page);

    const overview_tab = new Tab({ title: 'Overview' }).appendTo(tabs);
    const secondary_tab = new Tab({ title: 'Stats' }).appendTo(tabs);

    return page;
}
