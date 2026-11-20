const routingButtons = document.querySelectorAll('[data-routing]');
const routingImage = document.getElementById('routing-image');
const routingDescription = document.getElementById('routing-description');
const routingViews = {
  pooled: {
    description: 'Across all objects, queries on the finest grid (P2) assign <strong>74.9%</strong> of their attention to P4, two levels coarser.',
    alt: 'AGPF-S routing across all objects. P2 queries assign 74.9 percent of their attention to P4.'
  },
  small: {
    description: 'For small objects, P2 queries assign <strong>75.8%</strong> of their attention to P4 and <strong>16.0%</strong> to P5.',
    alt: 'AGPF-S routing for small objects. P2 queries assign 75.8 percent to P4 and 16.0 percent to P5.'
  },
  medium: {
    description: 'P4 remains the largest source for P2 queries on medium objects. P5 receives a larger share than it does for small objects.',
    alt: 'AGPF-S routing for medium objects. P2 queries assign approximately 74 percent to P4 and 18 percent to P5.'
  },
  large: {
    description: 'For large objects, P2 still favors P4 at <strong>72.8%</strong>, while the share going to P5 rises to <strong>18.9%</strong>.',
    alt: 'AGPF-S routing for large objects. P2 queries assign 72.8 percent to P4 and 18.9 percent to P5.'
  }
};
routingButtons.forEach(button => {
  button.addEventListener('click', () => {
    const group = button.dataset.routing;
    routingButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    routingImage.src = `static/images/routing-${group}.svg`;
    routingImage.alt = routingViews[group].alt;
    routingDescription.innerHTML = routingViews[group].description;
  });
});

const scaleButtons = document.querySelectorAll('[data-scale-plot]');
const scalePlots = document.querySelectorAll('[data-scale-view]');
scaleButtons.forEach(button => {
  button.addEventListener('click', () => {
    scaleButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    scalePlots.forEach(plot => {
      plot.hidden = plot.dataset.scaleView !== button.dataset.scalePlot;
    });
  });
});

const examples = {
  small: { imageKey: 'small', description: 'a small object in a group photograph' },
  medium: { imageKey: 'large', description: 'a medium object in a flower-shop scene' },
  large: { imageKey: 'medium', description: 'a large object in a street scene' }
};
const exampleButtons = document.querySelectorAll('[data-example]');
exampleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const example = examples[button.dataset.example];
    exampleButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    for (const model of ['fpn', 'agpf']) {
      const img = document.getElementById(`${model}-example`);
      img.src = `static/images/${example.imageKey}-${model}.webp`;
      img.alt = `${model === 'fpn' ? 'FPN' : 'AGPF-S'} gradient dependency map for ${example.description}.`;
    }
  });
});

document.getElementById('copy-citation').addEventListener('click', async event => {
  const button = event.currentTarget;
  const text = document.getElementById('bibtex').textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = 'Copy BibTeX'; }, 1800);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('bibtex'));
    selection.removeAllRanges();
    selection.addRange(range);
    button.textContent = 'Selected — press Ctrl/Cmd+C';
  }
});
