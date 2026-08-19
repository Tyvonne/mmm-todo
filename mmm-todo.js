Module.register("mmm-todo", {
    defaults: {
        items: [
            "Acheter du pain",
            "Sortir la poubelle",
            "Penser au projet MagicMirror"
        ],
        updateInterval: 10000,
        fadeSpeed: 1000,
        random: false
    },

    lastIndexUsed: -1,

    start: function () {
        Log.info(`Starting module: ${this.name}`);

        setInterval(() => {
            this.updateDom(this.config.fadeSpeed);
        }, this.config.updateInterval);
    },

    getItemIndex: function () {
        if (this.config.items.length <= 1) {
            return 0;
        }

        if (this.config.random) {
            let index;
            do {
                index = Math.floor(Math.random() * this.config.items.length);
            } while (index === this.lastIndexUsed);
            this.lastIndexUsed = index;
            return index;
        } else {
            this.lastIndexUsed = this.lastIndexUsed >= this.config.items.length - 1 ? 0 : ++this.lastIndexUsed;
            return this.lastIndexUsed;
        }
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";

        if (this.config.items.length === 0) {
            return wrapper;
        }

        const itemIndex = this.getItemIndex();
        const itemText = this.config.items[itemIndex] || "";

        const parts = itemText.split("\n");
        const container = document.createElement("span");

        for (const part of parts) {
            if (part !== "") {
                container.appendChild(document.createTextNode(part));
                container.appendChild(document.createElement("BR"));
            }
        }

        if (container.children.length > 0) {
            container.lastElementChild.remove();
            wrapper.appendChild(container);
        }

        return wrapper;
    }
});