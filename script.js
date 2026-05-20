/**
 * ============================================================================
 * INTERACTIVE PORTAL PORTFOLIO ARCHITECTURE CORE MOTOR
 * ============================================================================
 */

// Paste your actual dynamic Executable web app link directly here:
const REAL_VS_REELS_URL = "https://script.google.com/macros/s/AKfycbzRynxTmaZV5OkdcdCZHxvlZS1SRWK3dzQ2xi-nD-KQn03goQF14mj0zf6_jJfR_3Zu/exec";

/**
 * Handles custom header trigger button toggling for horizontal stacks
 */
function togglePremiumMenu() {
  const stack = document.getElementById('premiumHorizontalStack');
  const btn = document.getElementById('menuButton');
  
  if (!stack) return;

  const isCurrentlyHidden = stack.classList.contains('hidden');

  if (isCurrentlyHidden) {
    if (btn) btn.setAttribute('aria-expanded', 'true');
    
    // Switch element layer map from display:none to layout tracking block
    stack.classList.remove('hidden');
    
    // Smoothly apply transforms in sequence frame cycles
    requestAnimationFrame(() => {
      stack.classList.remove('opacity-0', 'pointer-events-none', '-translate-x-2');
      stack.classList.add('opacity-100', 'translate-x-0');
    });
  } else {
    if (btn) btn.setAttribute('aria-expanded', 'false');
    
    stack.classList.add('opacity-0', 'pointer-events-none', '-translate-x-2');
    stack.classList.remove('opacity-100', 'translate-x-0');
    
    setTimeout(() => {
      stack.classList.add('hidden');
    }, 300);
  }
}

/**
 * Safely forces the menu open row closed immediately on viewport transformations
 */
function closePremiumMenu() {
  const stack = document.getElementById('premiumHorizontalStack');
  if (stack && !stack.classList.contains('hidden')) {
    togglePremiumMenu(); 
  }
}

// ==========================================================
// SPA ROUTING WITH LAZY IFRAME ATTACH ENGINE
// ==========================================================

function switchView(viewId) {
  closePremiumMenu();
  
  const sections = document.querySelectorAll('.view-section');
  const targetView = document.getElementById(`view-${viewId}`);
  const iframe = document.getElementById('gasIframe');
  
  if (!targetView) return;

  // 1. Instantly hide visible views
  sections.forEach(section => {
    section.classList.add('hidden');
    section.style.opacity = '0';
  });

  // 2. LAZY-LOAD TRIGGER: Inject target system address into iframe bounds only when activated
  if (viewId === 'real-vs-reels' && iframe && !iframe.src) {
    iframe.src = REAL_VS_REELS_URL;
  }

  // 3. Mount and cleanly paint the current viewport target card
  targetView.classList.remove('hidden');
  requestAnimationFrame(() => {
    targetView.style.opacity = '1';
  });
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================
// BACKGROUND LAYER INTERCEPT CAPTURES
// ==========================================================
window.addEventListener('click', function(e) {
  const stack = document.getElementById('premiumHorizontalStack');
  const btn = document.getElementById('menuButton');
  const activeSection = document.querySelector('.view-section:not(.hidden)');
  
  if (stack && !stack.classList.contains('hidden')) {
    if (!btn.contains(e.target) && !stack.contains(e.target)) {
      togglePremiumMenu();
    }
  }

  if (!activeSection || activeSection.id === 'view-home' || activeSection.id === 'view-real-vs-reels') return;

  const clickedInsideSection = activeSection.contains(e.target);
  const clickedMenuButton = btn && btn.contains(e.target);
  const clickedHorizontalMenu = stack && stack.contains(e.target);
  const clickedInlineRouteBtn = e.target.closest('button[onclick^="switchView"]');

  if (!clickedInsideSection && !clickedMenuButton && !clickedHorizontalMenu && !clickedInlineRouteBtn) {
    switchView('home');
  }
});
