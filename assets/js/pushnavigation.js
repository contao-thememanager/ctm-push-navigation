function getParents(elem, selector) {
    var parents = [];
    var supports = 'classList' in document.documentElement;
    var firstChar, attribute, value;

    if ( selector ) {
        firstChar = selector.charAt(0);
        if ( firstChar === '[' ) {
            selector = selector.substr(1, selector.length - 2);
            attribute = selector.split( '=' );

            if ( attribute.length > 1 ) {
                value = true;
                attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
            }
        }
    }

    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( selector ) {

            // If selector is a class
            if ( firstChar === '.' ) {
                if ( supports ) {
                    if ( elem.classList.contains( selector.substr(1) ) ) {
                        parents.push( elem );
                    }
                } else {
                    if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
                        parents.push( elem );
                    }
                }
            }

            // If selector is an ID
            if ( firstChar === '#' ) {
                if ( elem.id === selector.substr(1) ) {
                    parents.push( elem );
                }
            }

            // If selector is a data attribute
            if ( firstChar === '[' ) {
                if ( elem.hasAttribute( attribute[0] ) ) {
                    if ( value ) {
                        if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
                            parents.push( elem );
                        }
                    } else {
                        parents.push( elem );
                    }
                }
            }

            // If selector is a tag
            if ( elem.tagName.toLowerCase() === selector ) {
                parents.push( elem );
            }

        } else {
            parents.push( elem );
        }
    }

    // Return parents if any exist
    if ( parents.length === 0 ) {
        return null;
    } else {
        return parents;
    }
}

function parseHtml(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

class PushNavigation {

    constructor(o) {

        this.o = this._m({
            selector: 'header .nav',
            startSelector: 'strong.active',
            mode: 'slide',
            toggle: {
                selector: '.mod_toggle',
                cssClassOpen: 'open'
            },
            levelStructure: {
                container: 'ul',
                item: 'li.submenu'
            },
            handle: {
                append: null,
                element: 'span',
                content: '',
                cssClass: 'i-navigate_forward'
            },
            breadcrumb: {
                element: 'li',
                default: 'Navigation',
                closeOnFirst: false,
                content: '<i class="i-navigate_back"></i> ',
                textSelector: 'a,strong',
                cssClass: ''
            },
            keepOpenStateOnResize: false,
            maxWidth: parseInt(window.getComputedStyle(document.body).getPropertyValue('--nav-bhr'),10) || 1024,
            modules: [],
            onShow: () => {},
            onHide: () => {},
            onInit: () => {},
            onDestroy: () => {}
        }, o || {})

        if(!(this.n = document.querySelector(this.o.selector)))
            return

        this.c = {
            i: 'pn-init',
            t: 'pn-toggle',
            h: 'pn-handle',
            b: 'pn-breadcrumb',
            s: 'pn-show',
            a: 'pn-active',
            n: 'pn-next',
        }

        this.t = document.querySelector(this.o.toggle.selector)

        if (!this.t)
            return

        this.t.classList.add(this.c.t)

        this.i = this.n.querySelectorAll(this.o.levelStructure.item)

        this.b = false
        this.a = false

        this._build()
        this._registerEvents()
    }

    _m(a, b)
    {
        return[...new Set([...Object.keys(a),...Object.keys(b)])].reduce((c,k)=>({...c,[k]:"object"===typeof(a[k])?Object.assign({},a[k],b[k]):!b[k]?a[k]:b[k]}),{})
    }

    _build(){
        if(this.b || this.o.maxWidth <= window.innerWidth)
            return

        // Toggle
        this.t.classList.add(this.c.s);

        // Templates
        this.h = document.createElement(this.o.handle.element)
        this.h.innerHTML = this.o.handle.content
        this.h.classList.add(this.c.h)

        if(this.o.handle.cssClass)
            this.h.classList.add(this.o.handle.cssClass)

        this.k = document.createElement(this.o.breadcrumb.element)
        this.k.innerHTML = this.o.breadcrumb.default
        this.k.classList.add(this.c.b)

        if(this.o.breadcrumb.cssClass)
            this.h.classList.add(this.o.breadcrumb.cssClass)

        // Add first level breadcrumb
        let firstContainer = this.n.querySelector(this.o.levelStructure.container)
        this.d = this.k.cloneNode(true)

        firstContainer.insertBefore(this.d, firstContainer.childNodes[0])

        this._createMarkup()
        this._createModules()

        if(this.o.startSelector){
            let startItem = this.n.querySelector(this.o.startSelector)

            if(startItem){
                let parents = getParents(startItem, this.o.levelStructure.container)

                for (let i = 0; i < parents.length; i++)
                {
                    if(i === 0)
                        parents[i].classList.add(this.c.a)
                    else if(i === parents.length - 1)
                        parents[i].classList.add(this.c.n)
                    else
                        parents[i].classList.add(this.c.a, this.c.n)
                }
            }
        }

        // Close on first breadcrumb
        if(this.o.breadcrumb.closeOnFirst)
            this.d.addEventListener('click', (e) => { this.hide() }, false)

        this.n.classList.add(this.c.i)
        this.b = true
    }

    _registerEvents(){
        // Resize event
        window.addEventListener('resize', () => {
            this.o.maxWidth > window.innerWidth ? this._build() : this._destroy()
        }, false)

        // Toggle event
        this.t.addEventListener('click', (e) => {
            e.preventDefault()
            !this.a ? this.show() : this.hide()
        })
    }

    _createMarkup(){
        for(let item of this.i)
        {
            // Append handle
            let handle = this.h.cloneNode(true)
            handle.addEventListener('click', (e) => this._move(e.target, 1), false)

            if(this.o.handle.append)
                item.querySelector(this.o.handle.append).appendChild(handle)
            else
                item.appendChild(handle)

            // Append breadcrumb
            let title = item.querySelector(this.o.breadcrumb.textSelector)

            let breadcrumb = this.k.cloneNode(true)
            breadcrumb.innerHTML = this.o.breadcrumb.content + title.innerText || title.textContent
            breadcrumb.addEventListener('click', (e) => this._move(e.target, -1), false)

            let container = item.querySelector(this.o.levelStructure.container)
            container.insertBefore(breadcrumb, container.childNodes[0])

            item.pnHandle = handle;
            item.pnBreadcrumb = breadcrumb;
        }
    }

    _createModules(){
        this.modules = [];

        if(this.o.modules.length)
        {
            for(let module of this.o.modules.reverse())
            {
                let parents = this.n.querySelectorAll(module.append)
                let content = parseHtml(module.markup)

                for(let parent of parents)
                {
                    this.modules.push(content);
                    parent.append(content)
                }
            }
        }
    }

    _move(scope, direction){
        let parent = scope.closest(this.o.levelStructure.container)

        if(direction > 0)
        {
            let item = scope.closest(this.o.levelStructure.item)
            let container = item.querySelector(this.o.levelStructure.container)

            container.classList.add(this.c.a)
            parent.classList.add(this.c.n)

            this.n.scrollTo(0,0, {behavior: 'smooth'})
        }
        else
        {
            let _parent = parent.closest('.' + this.c.n)

            parent.classList.remove(this.c.a)
            _parent.classList.remove(this.c.n)
        }
    }

    _destroy(){
        if(!this.b) return

        this.t.classList.remove(this.c.s);

        if(this.o.breadcrumb.closeOnFirst)
            this.d.removeEventListener('click', this.hide)

        this.d.remove()

        for(let item of this.i)
        {
            item.pnHandle.removeEventListener('click', this._move, false)
            item.pnHandle.remove()

            item.pnBreadcrumb.removeEventListener('click', this._move, false)
            item.pnBreadcrumb.remove()
        }

        for(let module of this.modules)
        {
            module.remove()
        }

        this.b = false
        this.n.classList.remove(this.c.i)

        if(!this.o.keepOpenStateOnResize) {
            this.a = false
            this.n.classList.remove(this.c.s)
            this.t.classList.remove(this.o.toggle.cssClassOpen);
        }

        this.o.onDestroy.call(this)

        if (typeof sh !== 'undefined')
        {
            sh.play()
            document.body.classList.remove('sh-blur')
        }
    }

    show(){
        this.n.classList.add(this.c.s)
        this.t.classList.add(this.o.toggle.cssClassOpen);
        this.a = true
        this.o.onShow.call(this)

        if (typeof sh !== 'undefined')
        {
            sh.stop(false,true)
            document.body.classList.add('sh-blur')
        }
    }

    hide(){
        this.n.classList.remove(this.c.s)
        this.t.classList.remove(this.o.toggle.cssClassOpen);
        this.a = false
        this.o.onHide.call(this)

        if (typeof sh !== 'undefined')
        {
            sh.play()
            document.body.classList.remove('sh-blur')
        }
    }

    isOpen(){
        return this.a
    }
}

module.exports = PushNavigation;
