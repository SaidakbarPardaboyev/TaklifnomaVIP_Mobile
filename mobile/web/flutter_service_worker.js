'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "798050a070251b3f2368e895e5fe5567",
"version.json": "142860d1f3c12a22d067f29db066208c",
"index.html": "646a05b715c7e8126029191830f1b92d",
"/": "646a05b715c7e8126029191830f1b92d",
"main.dart.js": "73fd42a923014a447004415323efbb59",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"favicon.png": "8a1bab0e0a8552e86cd4e03c5f478a50",
"icons/Icon-192.png": "01fb0e96317f3a796c5ab4122c4bd9e5",
"icons/Icon-maskable-192.png": "01fb0e96317f3a796c5ab4122c4bd9e5",
"icons/Icon-maskable-512.png": "fda552347d669a21aa9550942513b8b7",
"icons/Icon-512.png": "fda552347d669a21aa9550942513b8b7",
"manifest.json": "dbe548ed7fce3e5f7cdd3d45bf910da8",
"assets/AssetManifest.json": "3f9cce8c2a581c57fec1e656e302892d",
"assets/NOTICES": "4defc77583cfef75e60eae49751f372c",
"assets/FontManifest.json": "bb43c8f278597117ec754393baa34535",
"assets/AssetManifest.bin.json": "5a25d980be93989e8ec36ad536a57c35",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "2b53c9938cc596f2f62be860cd09f450",
"assets/packages/youtube_player_iframe/assets/player.html": "663ba81294a9f52b1afe96815bb6ecf9",
"assets/packages/youtube_player_flutter/assets/speedometer.webp": "50448630e948b5b3998ae5a5d112622b",
"assets/packages/flutter_inappwebview_web/assets/web/web_support.js": "509ae636cfdd93e49b5a6eaf0f06d79f",
"assets/packages/templates/assets/svg/user.svg": "eace666c84eea7cfcb871e2e3afe8e9f",
"assets/packages/templates/assets/svg/unitedkingdom.svg": "7fac5a13c61e66ac7c0435f0b150c68b",
"assets/packages/templates/assets/svg/instagram.svg": "f2400d51834102edc3b2d51f2c4c3273",
"assets/packages/templates/assets/svg/mail.svg": "6b110e206ca2ec3a7c8cebeb7a51f14b",
"assets/packages/templates/assets/svg/sales.svg": "35e70968da802a46c02a9ed946252b86",
"assets/packages/templates/assets/svg/dashboard.svg": "3018be86ea2476472e9b3ef2fb96dafa",
"assets/packages/templates/assets/svg/telegram.svg": "f08d2618457daa76d1724352a70d47ba",
"assets/packages/templates/assets/svg/support.svg": "db53706ea66ef1b65b2ec111a45826dc",
"assets/packages/templates/assets/svg/russia.svg": "bbb771a1ddf36af68c0aee9df8ab8133",
"assets/packages/templates/assets/svg/uzbekistan.svg": "f5a4f78911bd00d2ae8dd316eaa90c77",
"assets/packages/templates/assets/svg/invitation.svg": "467ab6cd6825ad3306ae2c3b239efc3b",
"assets/packages/templates/assets/svg/youtube.svg": "50062cfea3f4ce696bd088d3d9abc768",
"assets/packages/templates/assets/svg/phone.svg": "d94192d6558c0e731ab1106a290dd347",
"assets/packages/templates/assets/svg/profile.svg": "b1056243c2ae1679dcaa1b6e2fe40e34",
"assets/packages/templates/assets/svg/instagram%2520copy.svg": "cf49b1bfd12995f984a701670c692d3d",
"assets/packages/templates/assets/svg/monitor.svg": "dcae1f037798608b99d951b82a9b8397",
"assets/packages/templates/assets/music/ed_sheeran_perfect.mp3": "8784e4d58f58c19de511d1e59359b8d1",
"assets/packages/templates/assets/images/card_image.png": "9a168dfd75ca07243924184cbd21d113",
"assets/packages/templates/assets/images/kamolliddin.jpg": "22a00e322541f073521015e6f13dd284",
"assets/packages/templates/assets/images/bluebottomimage.png": "2be27ab287d888315e027c38ff674ee3",
"assets/packages/templates/assets/images/murod.jpg": "c1018e544befd8adce83a13770e2dbe9",
"assets/packages/templates/assets/images/bluetopimage.png": "0bae583d6d9f5d3213a2bb405c53831d",
"assets/packages/templates/assets/images/saidakbar.jpg": "01771a7a31d919e673f7add81c9799f1",
"assets/packages/templates/assets/images/samandar.jpg": "0d741800390e0b63ab22e5584832ed93",
"assets/packages/templates/assets/images/greentopimage.png": "f3b0bbc436332713332a2b27c39e2174",
"assets/packages/templates/assets/images/gap.png": "e4dd93520099c4209af2d0b880f91b3b",
"assets/packages/templates/assets/images/greenflowercenter.png": "2ac6aa5ab6a8ee58166503fbcbcacc05",
"assets/packages/templates/assets/images/bluecenterimage.png": "1687256dab09bb5a3261cddc095d4c0d",
"assets/packages/templates/assets/images/topflowers_yellow.png": "d1138b1b5e167477bcd11f340fad6611",
"assets/packages/templates/assets/images/mixPhone.png": "2a3d5f5b50f75b5d5349fc6182a131a2",
"assets/packages/templates/assets/images/image4.png": "6f788640c8248a3c1bfdf9283ef5cda0",
"assets/packages/templates/assets/images/invoiceIcon.png": "90f5294b5c7a11233dd070bb8cb58fd2",
"assets/packages/templates/assets/images/image5.png": "d38248ef9c95a85585423a03dc36bc25",
"assets/packages/templates/assets/images/image1.png": "84c75923f916e1946ef9981937c68bb1",
"assets/packages/templates/assets/images/muhammadjon.jpg": "edc5ce9e5024f6c4537bae83061ad57b",
"assets/packages/templates/assets/images/greenbottomimage.png": "7aaa5acd5c745c84642363800e4f5228",
"assets/packages/templates/assets/images/image2.png": "42ee770ca7b9bbeacaaed56532ace5f3",
"assets/packages/templates/assets/images/bottomflowers_yellow.png": "56047312120169094f9fcb303a12b788",
"assets/packages/templates/assets/images/centerinvetationflower.JPG": "ba6d1bc57a37b72580e8ce6927a08503",
"assets/packages/templates/assets/images/image3.png": "ec717fce5d5aa2067be9fd6f029e582a",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "268fceb82e90bac1667dcdf3fc6e2a08",
"assets/fonts/MaterialIcons-Regular.otf": "228af00e7235c5915db9f348fb2861e4",
"assets/assets/svg/user.svg": "eace666c84eea7cfcb871e2e3afe8e9f",
"assets/assets/svg/unitedkingdom.svg": "7fac5a13c61e66ac7c0435f0b150c68b",
"assets/assets/svg/instagram.svg": "f2400d51834102edc3b2d51f2c4c3273",
"assets/assets/svg/mail.svg": "6b110e206ca2ec3a7c8cebeb7a51f14b",
"assets/assets/svg/sales.svg": "35e70968da802a46c02a9ed946252b86",
"assets/assets/svg/bot.svg": "452e879aa86b53169589b15b9af3cf7e",
"assets/assets/svg/dashboard.svg": "3018be86ea2476472e9b3ef2fb96dafa",
"assets/assets/svg/telegram.svg": "f08d2618457daa76d1724352a70d47ba",
"assets/assets/svg/support.svg": "db53706ea66ef1b65b2ec111a45826dc",
"assets/assets/svg/russia.svg": "bbb771a1ddf36af68c0aee9df8ab8133",
"assets/assets/svg/uzbekistan.svg": "f5a4f78911bd00d2ae8dd316eaa90c77",
"assets/assets/svg/invitation.svg": "467ab6cd6825ad3306ae2c3b239efc3b",
"assets/assets/svg/youtube.svg": "50062cfea3f4ce696bd088d3d9abc768",
"assets/assets/svg/phone.svg": "d94192d6558c0e731ab1106a290dd347",
"assets/assets/svg/profile.svg": "b1056243c2ae1679dcaa1b6e2fe40e34",
"assets/assets/svg/instagram%2520copy.svg": "cf49b1bfd12995f984a701670c692d3d",
"assets/assets/svg/monitor.svg": "dcae1f037798608b99d951b82a9b8397",
"assets/assets/music/ed_sheeran_perfect.mp3": "8784e4d58f58c19de511d1e59359b8d1",
"assets/assets/images/card_image.png": "9a168dfd75ca07243924184cbd21d113",
"assets/assets/images/kamolliddin.jpg": "22a00e322541f073521015e6f13dd284",
"assets/assets/images/bluebottomimage.png": "2be27ab287d888315e027c38ff674ee3",
"assets/assets/images/murod.jpg": "c1018e544befd8adce83a13770e2dbe9",
"assets/assets/images/bluetopimage.png": "0bae583d6d9f5d3213a2bb405c53831d",
"assets/assets/images/saidakbar.jpg": "01771a7a31d919e673f7add81c9799f1",
"assets/assets/images/samandar.jpg": "0d741800390e0b63ab22e5584832ed93",
"assets/assets/images/greentopimage.png": "f3b0bbc436332713332a2b27c39e2174",
"assets/assets/images/gap.png": "e4dd93520099c4209af2d0b880f91b3b",
"assets/assets/images/greenflowercenter.png": "2ac6aa5ab6a8ee58166503fbcbcacc05",
"assets/assets/images/bluecenterimage.png": "1687256dab09bb5a3261cddc095d4c0d",
"assets/assets/images/topflowers_yellow.png": "d1138b1b5e167477bcd11f340fad6611",
"assets/assets/images/mixPhone.png": "2a3d5f5b50f75b5d5349fc6182a131a2",
"assets/assets/images/image4.png": "6f788640c8248a3c1bfdf9283ef5cda0",
"assets/assets/images/invoiceIcon.png": "90f5294b5c7a11233dd070bb8cb58fd2",
"assets/assets/images/image5.png": "d38248ef9c95a85585423a03dc36bc25",
"assets/assets/images/image1.png": "84c75923f916e1946ef9981937c68bb1",
"assets/assets/images/muhammadjon.jpg": "edc5ce9e5024f6c4537bae83061ad57b",
"assets/assets/images/greenbottomimage.png": "7aaa5acd5c745c84642363800e4f5228",
"assets/assets/images/image2.png": "42ee770ca7b9bbeacaaed56532ace5f3",
"assets/assets/images/bottomflowers_yellow.png": "56047312120169094f9fcb303a12b788",
"assets/assets/images/centerinvetationflower.JPG": "ba6d1bc57a37b72580e8ce6927a08503",
"assets/assets/images/image3.png": "ec717fce5d5aa2067be9fd6f029e582a",
"assets/assets/icons/shapeWebEng.png": "1dca33f69c4b68b0bc6de16a6c389e71",
"assets/assets/icons/shapeWebRu.png": "bb763dbd3922b7f10b8e372eb570d718",
"assets/assets/icons/background_phone.png": "43433f5d49b5d4ffe584cb49a675760e",
"assets/assets/icons/secondTemplate.png": "974047e14920cb015e03f2f4e32f228c",
"assets/assets/icons/iphone_top1_fon.png": "dba526ff737a9f0515ed66abb1b511f3",
"assets/assets/icons/IMG_7450.PNG": "6156fde0a44d0c8e13fe7eb090bd142f",
"assets/assets/icons/cube1.svg": "118607236d4b511ffca1e674d01c3ccc",
"assets/assets/icons/cube.svg": "ee847a2d2ba9fc01a904da965e709277",
"assets/assets/icons/star250.png": "3c1447030acd240e67b2b40a667ff0d8",
"assets/assets/icons/star45.png": "2655d16fc69620dc1636f4923ccbdcde",
"assets/assets/icons/thirdTemplate.png": "2d5cd815a810c8e9a16ebcabf5776bd5",
"assets/assets/icons/star_red.svg": "bd1ab22c245a039df54e2f106c8d83dc",
"assets/assets/icons/shapeWebUzKril.png": "207768586ab1e6b2133db5895ee819a6",
"assets/assets/icons/circle_phone.png": "468033c1a37657966fe365825db45758",
"assets/assets/icons/star_top.png": "423de6cbf0534eff2625fe4ede002cef",
"assets/assets/icons/animationBKG.png": "e25031c2673ca23c008b2a3abdee5ffb",
"assets/assets/icons/firstTemplate.png": "1d59236173da5f018c98788019fcae98",
"assets/assets/icons/background_effect.png": "014e33f7acd6dd1ad236c203a5aeb569",
"assets/assets/icons/shapeWebUz.png": "725827792cc5a047cc26896e0df29e41",
"assets/assets/icons/star_full.png": "29fb985c6ef4682ec660dd007bb86c4d",
"assets/assets/icons/notification.png": "2f29757ea075ab2a875edcf52ad5d2cd",
"assets/assets/icons/iphone1.png": "e5f61b579f5a054bb0f430c9fee4f0ba",
"assets/assets/icons/iphone3.png": "5468185b0928175194f008a2b42aa7c8",
"assets/assets/icons/iphone2.png": "b10ba30d47ff32fb5b1194d5bd8f4d8f",
"assets/assets/fonts/PoppinsMedium.ttf": "bf59c687bc6d3a70204d3944082c5cc0",
"assets/assets/fonts/Ananda.ttf": "c4216e8a75f7413e053b0b5b7d1f122a",
"assets/assets/fonts/Dancing.ttf": "d58bb592345e95e81157b07c2db7bc00",
"assets/assets/fonts/GreatVibes.ttf": "859a0d361f82ed6adb24057ef6cfa543",
"assets/assets/fonts/LucySaid.ttf": "25c571a05fe90f36592a7be2c8485485",
"assets/assets/fonts/Rolling.ttf": "15a13a6c3bf840005daa90abf981f27d",
"assets/assets/fonts/Weather.otf": "282e5f2f9a13cd3c5408d1647effb53c",
"assets/assets/fonts/Coneria.ttf": "8636b0a53429bdc062863b2304df8070",
"assets/assets/fonts/Geraldine.ttf": "f54f980c88361538e9f438bddf5eb509",
"assets/assets/gif/centerinvetationflower.gif": "0b2400fb7783daa7cad5d177cff34d57",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
