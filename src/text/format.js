function escapeHtml(text, allowImg = false) {
    if (allowImg) {
        // temporarily replace img tags so we don't escape them
        const imgMatches = [];
        text = text.replace(/<img[^>]*>/gi, match => {
            imgMatches.push(match);
            return `___IMG_PLACEHOLDER_${imgMatches.length - 1}___`;
        });

        // then escape the rest
        const div = document.createElement('div');
        div.textContent = text;
        text = div.innerHTML;

        // restore img tags
        text = text.replace(/___IMG_PLACEHOLDER_(\d+)___/g, (_, index) => imgMatches[index]);

        return text;
    } else {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
}

function linkify(text) {
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const usernamePattern = /@(\w+)/g;

    // split on <img ...> tags
    return text.split(/(<img[^>]*>)/i).map(part => {
        if (part.startsWith('<img')) {
            return part; // leave img tags alone
        }
        // replace URLs
        part = part.replace(urlPattern, '<a href="javascript:void(0)" onclick="openLink(`$1`)">$1</a>');
        // replace usernames
        part = part.replace(usernamePattern, '<a href="/u/$1">@$1</a>');
        return part;
    }).join('');
}

function addNewlines(text) {
    return text.replace(/(\r\n|\n\r|\n|\r)/g, '<br>');
}

function markdownify(text) {
    // headers
    // ###, ## and #
    text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // bold, italics, strikethrough and monospace
    text = text.replace(/(?<!\\)\*(.+?)(?<!\\)\*/g, '<strong>$1</strong>'); //bold
    text = text.replace(/(?<!\\)_(.+?)(?<!\\)_/g, '<em>$1</em>'); // italics
    text = text.replace(/(?<!\\)~(.+?)(?<!\\)~/g, '<del>$1</del>'); // strikethrough
    text = text.replace(/(?<!\\)```([^`]+)```/g, '<pre><code>$1</code></pre>'); // multi-line monospace
    text = text.replace(/(?<!\\)`([^`]+)(?<!\\)`/g, '<code>$1</code>'); // monospace

    // lists
    text = text.replace(/^(?<!\\)- (.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*?<\/li>\n)+/g, match => {
        return '<ul>' + match.replace(/\n/g, '') + '</ul>';
    });

    // blockquotes
    text = text.replace(/^(?<!\\)> (.+)$/gm, '<blockquote-line>$1</blockquote-line>');
    text = text.replace(/(<blockquote-line>.*?<\/blockquote-line>\n?)+/g, match => {
        const content = match.replace(/<\/?blockquote-line>/g, '').replace(/\n/g, '<br>');
        return '<blockquote>' + content + '</blockquote>';
    });

    // Remove ALL newlines after headers and lists (not just extras)
    text = text.replace(/(<\/h[1-6]>)\n/g, '$1');
    text = text.replace(/(<\/ul>)\n/g, '$1');
    text = text.replace(/(<\/blockquote>)\n/g, '$1');

    // escape backslashes
    text = text.replace(/\\(.)/g, '$1');

    return text;
}

function emojify(text) {
    const emojiMap = {
        "concerned": "/assets/mascot/concerned.png",
        "excited": "/assets/mascot/excited.png",
        "love": "/assets/mascot/love.png",
        "peace": "/assets/mascot/peace.png",
        "smug": "/assets/mascot/smug.png",
        "tired": "/assets/mascot/tired.png",
        "violence": "/assets/mascot/violence.png",
        "yelling": "/assets/mascot/yelling.png",
    };

    for (const [phrase, imageUrl] of Object.entries(emojiMap)) {
        const regex = new RegExp(`\\[${phrase}\\]`, "g");
        text = text.replace(regex, `<img src="${imageUrl}" alt=${phrase} class="emoji aurora" draggable="false" />`);
    }
    return text;
}

function hashtagify(text) {
    return text.replace(/(^|\s|>)#([\w-]+)/g, (match, prefix, tag) => {
        const link = `<a href="/search?q=#${tag.toLowerCase()}">#${tag}</a>`;
        return prefix + link;
    });
}

export function format(text, formats = ["html", "markdown", "emoji", "link", "newline", "hashtag"], options = {}) {
   // map names to functions to avoid huge switch statement
    const formatMap = {
        html: t => escapeHtml(t, options.allowImg),
        markdown: markdownify,
        emoji: emojify,
        link: linkify,
        newline: addNewlines,
        hashtag: hashtagify
    };

    for (const format of formats) {
        text = (formatMap[format])(text);
    }

    return text;
}