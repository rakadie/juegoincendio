/**
 * Framework-free browser behaviour shared by the contract fixture and future
 * scene migrations. Every input path delegates to the same open operation.
 */
export const SCENE_HOTSPOT_CLIENT = String.raw`
  (function () {
    function openSceneHotspot(hotspot) {
      var cardId = hotspot.getAttribute('aria-controls');
      var targetId = hotspot.getAttribute('data-scene-target-id');
      var card = cardId ? document.getElementById(cardId) : null;
      var target = targetId ? document.getElementById(targetId) : null;
      if (!card || !target) return null;

      document.querySelectorAll('[data-scene-hotspot]').forEach(function (candidate) {
        candidate.setAttribute('aria-expanded', 'false');
      });
      document.querySelectorAll('[data-scene-card]').forEach(function (candidate) {
        candidate.hidden = true;
      });
      document.querySelectorAll('[data-scene-state-object].is-hotspot-active').forEach(function (candidate) {
        candidate.classList.remove('is-hotspot-active');
      });

      hotspot.setAttribute('aria-expanded', 'true');
      card.hidden = false;
      target.classList.add('is-hotspot-active');
      hotspot.dispatchEvent(new CustomEvent('scene-hotspot-open', {
        bubbles: true,
        detail: { hotspotId: hotspot.dataset.visualElementId, cardId: cardId, targetId: targetId }
      }));
      return card;
    }

    function wireSceneHotspots(root) {
      root.querySelectorAll('[data-scene-hotspot]').forEach(function (hotspot) {
        if (hotspot.dataset.sceneHotspotWired === 'true') return;
        hotspot.dataset.sceneHotspotWired = 'true';
        hotspot.addEventListener('pointerenter', function () { openSceneHotspot(hotspot); });
        hotspot.addEventListener('focus', function () { openSceneHotspot(hotspot); });
        hotspot.addEventListener('click', function () { openSceneHotspot(hotspot); });
        hotspot.addEventListener('keydown', function (event) {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          openSceneHotspot(hotspot);
        });
      });
    }

    window.SceneHotspots = { open: openSceneHotspot, wire: wireSceneHotspots };
    wireSceneHotspots(document);
  })();
`;
