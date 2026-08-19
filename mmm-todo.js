Module.register("mmm-todo", {
    // Configuration par défaut
    defaults: {
        title: "Mes Rappels",
        items: [
            "Acheter du pain",
            "Penser au projet MagicMirror"
        ]
    },

    // Définir la structure HTML affichée
    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "todo-container";

        if (this.config.title) {
            const header = document.createElement("header");
            header.className = "module-header";
            header.innerHTML = this.config.title;
            wrapper.appendChild(header);
        }

        const list = document.createElement("ul");
        list.style.listStyle = "none";
        list.style.padding = "0";

        this.config.items.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = "• " + item;
            list.appendChild(li);
        });

        wrapper.appendChild(list);
        return wrapper;
    }
});
