(function () {
  const canvas = document.getElementById('orient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const SPACING = 48;
  const CURSOR_SIZE = 10;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let lines = [];
  let canvasHeight = 0;
  let blobCenterX = 0;
  let blobCenterY = 0;
  let blobRadiusX = 0;
  let blobRadiusY = 0;

  // Attempt to get the blob boundary radius at a given angle
  // Uses multiple sine waves at different frequencies for organic shape
  function blobRadius(angle) {
    return 1
      + 0.25 * Math.sin(angle * 2 + 0.5)
      + 0.15 * Math.sin(angle * 3 + 1.7)
      + 0.10 * Math.sin(angle * 5 + 3.1)
      + 0.08 * Math.sin(angle * 7 + 0.3)
      + 0.05 * Math.sin(angle * 11 + 2.0);
  }

  function resize() {
    var sections = document.querySelectorAll('.section');
    var firstSection = sections.length ? sections[0] : null;
    if (firstSection) {
      canvasHeight = firstSection.offsetTop;
    } else {
      canvasHeight = window.innerHeight;
    }

    canvas.width = window.innerWidth;
    canvas.height = canvasHeight;

    var container = document.querySelector('.site-container');
    var hero = document.querySelector('.hero');
    var containerRect = container ? container.getBoundingClientRect() : { left: 0, right: canvas.width };
    var contentLeft = containerRect.left;
    var contentRight = containerRect.right;
    var contentMid = (contentLeft + contentRight) / 2;

    blobCenterX = (contentMid + contentRight) / 2;
    blobRadiusX = (contentRight - contentMid) / 2 + 40;

    if (hero) {
      var heroRect = hero.getBoundingClientRect();
      blobCenterY = heroRect.top + window.scrollY + heroRect.height / 2;
      blobRadiusY = heroRect.height / 2 + 20;
    } else {
      blobCenterY = canvasHeight / 2;
      blobRadiusY = canvasHeight / 3;
    }

    buildGrid();
  }

  function buildGrid() {
    lines = [];
    var cols = Math.ceil(canvas.width / SPACING) + 1;
    var rows = Math.ceil(canvasHeight / SPACING) + 1;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        lines.push({
          x: c * SPACING + SPACING / 2,
          y: r * SPACING + SPACING / 2,
        });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var scrollY = window.scrollY;
    var targetX = mouseX;
    var targetY = mouseY + scrollY;

    for (var i = 0; i < lines.length; i++) {
      var l = lines[i];

      // Normalized position relative to blob center
      var nx = (l.x - blobCenterX) / blobRadiusX;
      var ny = (l.y - blobCenterY) / blobRadiusY;
      var dist = Math.sqrt(nx * nx + ny * ny);

      // Get the blob boundary at this angle
      var angle = Math.atan2(ny, nx);
      var boundary = blobRadius(angle);

      if (dist > boundary) continue;

      // Fade near blob edges
      var fade = 1 - dist / boundary;
      fade = Math.min(1, fade * 3);
      var opacity = 0.08 * fade;
      if (opacity < 0.003) continue;

      var aimAngle = Math.atan2(targetY - l.y, targetX - l.x);

      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(aimAngle);

      ctx.fillStyle = 'rgba(0, 0, 0, ' + opacity + ')';
      ctx.beginPath();
      ctx.moveTo(CURSOR_SIZE, 0);
      ctx.lineTo(-CURSOR_SIZE * 0.5, -CURSOR_SIZE * 0.45);
      ctx.lineTo(-CURSOR_SIZE * 0.2, 0);
      ctx.lineTo(-CURSOR_SIZE * 0.5, CURSOR_SIZE * 0.45);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
