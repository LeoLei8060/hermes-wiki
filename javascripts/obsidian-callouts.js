(function () {
  const icons = {
    note: 'i', info: 'i', tip: '✓', success: '✓', warning: '!', attention: '!', danger: '×', error: '×', failure: '×', question: '?', example: '◇'
  };
  const labels = {
    note: 'Note', info: 'Info', tip: 'Tip', success: 'Success', warning: 'Warning', attention: 'Attention', danger: 'Danger', error: 'Error', failure: 'Failure', question: 'Question', example: 'Example'
  };
  function transformCallouts(root) {
    const quotes = root.querySelectorAll('.md-typeset blockquote:not(.obsidian-callout)');
    quotes.forEach((bq) => {
      const first = bq.querySelector(':scope > p:first-child');
      if (!first) return;
      const html = first.innerHTML.trim();
      const match = html.match(/^\[!(\w+)\]([+-])?\s*(.*)$/i);
      if (!match) return;
      const type = (match[1] || 'note').toLowerCase();
      const titleText = (match[3] || labels[type] || type).trim() || labels[type] || type;
      first.innerHTML = titleText;
      const wrapper = document.createElement('div');
      wrapper.className = `obsidian-callout obsidian-callout-${type}`;
      const title = document.createElement('div');
      title.className = 'obsidian-callout-title';
      title.innerHTML = `<span class="obsidian-callout-title-icon">${icons[type] || 'i'}</span><span>${first.innerHTML}</span>`;
      const content = document.createElement('div');
      content.className = 'obsidian-callout-content';
      Array.from(bq.childNodes).slice(1).forEach(node => content.appendChild(node));
      wrapper.appendChild(title);
      wrapper.appendChild(content);
      bq.replaceWith(wrapper);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => transformCallouts(document));
  else transformCallouts(document);
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(() => transformCallouts(document));
  }
})();