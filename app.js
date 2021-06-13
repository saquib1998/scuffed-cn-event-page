const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//tags link - https://api.codingninjas.com/api/v3/event_tags
//events link - https://api.codingninjas.com/api/v3/events

app.get("/", async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return res.redirect(
            "/?event_category=ALL_EVENTS&event_sub_category=Upcoming&tag_list=&offset="
        );
    }
    const { event_category, event_sub_category, tag_list, offset } = req.query;
    const {
        data: {
            data: { events },
        },
    } = await axios.get(
        `https://api.codingninjas.com/api/v3/events?event_category=${event_category}&event_sub_category=${event_sub_category}&tag_list=${tag_list}&offset=${offset}`
    );
    const {
        data: {
            data: { tags },
        },
    } = await axios.get("https://api.codingninjas.com/api/v3/event_tags");
    res.render("index", { events, tags, event_category, event_sub_category });
});

app.listen(process.env.port, () => {
    console.log("server running at port");
});
