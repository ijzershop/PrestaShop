function Kl(wo, gs) {
  for (var F = 0; F < gs.length; F++) {
    const G = gs[F];
    if (typeof G != "string" && !Array.isArray(G)) {
      for (const o in G)
        if (o !== "default" && !(o in wo)) {
          const j = Object.getOwnPropertyDescriptor(G, o);
          j && Object.defineProperty(wo, o, j.get ? j : {
            enumerable: !0,
            get: () => G[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(wo, Symbol.toStringTag, { value: "Module" }));
}
var Jl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zl(wo) {
  return wo && wo.__esModule && Object.prototype.hasOwnProperty.call(wo, "default") ? wo.default : wo;
}
var Hs = { exports: {} };
(function(wo, gs) {
  (function(F, G) {
    wo.exports = G();
  })(typeof self < "u" ? self : Jl, function() {
    return function(F) {
      var G = {};
      function o(j) {
        if (G[j])
          return G[j].exports;
        var z = G[j] = { i: j, l: !1, exports: {} };
        return F[j].call(z.exports, z, z.exports, o), z.l = !0, z.exports;
      }
      return o.m = F, o.c = G, o.d = function(j, z, $) {
        o.o(j, z) || Object.defineProperty(j, z, { enumerable: !0, get: $ });
      }, o.r = function(j) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(j, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(j, "__esModule", { value: !0 });
      }, o.t = function(j, z) {
        if (1 & z && (j = o(j)), 8 & z || 4 & z && typeof j == "object" && j && j.__esModule)
          return j;
        var $ = /* @__PURE__ */ Object.create(null);
        if (o.r($), Object.defineProperty($, "default", { enumerable: !0, value: j }), 2 & z && typeof j != "string")
          for (var m in j)
            o.d($, m, function(v) {
              return j[v];
            }.bind(null, m));
        return $;
      }, o.n = function(j) {
        var z = j && j.__esModule ? function() {
          return j.default;
        } : function() {
          return j;
        };
        return o.d(z, "a", z), z;
      }, o.o = function(j, z) {
        return Object.prototype.hasOwnProperty.call(j, z);
      }, o.p = "", o(o.s = "fb15");
    }({ "00b4": function(F, G, o) {
      o("ac1f");
      var j = o("23e7"), z = o("da84"), $ = o("c65b"), m = o("e330"), v = o("1626"), u = o("861d"), S = function() {
        var a = !1, f = /[ac]/;
        return f.exec = function() {
          return a = !0, /./.exec.apply(this, arguments);
        }, f.test("abc") === !0 && a;
      }(), g = z.Error, w = m(/./.test);
      j({ target: "RegExp", proto: !0, forced: !S }, { test: function(a) {
        var f = this.exec;
        if (!v(f))
          return w(this, a);
        var y = $(f, this, a);
        if (y !== null && !u(y))
          throw new g("RegExp exec method returned something other than an Object or null");
        return !!y;
      } });
    }, "00ee": function(F, G, o) {
      var j = o("b622"), z = j("toStringTag"), $ = {};
      $[z] = "z", F.exports = String($) === "[object z]";
    }, "01b4": function(F, G) {
      var o = function() {
        this.head = null, this.tail = null;
      };
      o.prototype = { add: function(j) {
        var z = { item: j, next: null };
        this.head ? this.tail.next = z : this.head = z, this.tail = z;
      }, get: function() {
        var j = this.head;
        if (j)
          return this.head = j.next, this.tail === j && (this.tail = null), j.item;
      } }, F.exports = o;
    }, "0366": function(F, G, o) {
      var j = o("e330"), z = o("59ed"), $ = j(j.bind);
      F.exports = function(m, v) {
        return z(m), v === void 0 ? m : $ ? $(m, v) : function() {
          return m.apply(v, arguments);
        };
      };
    }, "057f": function(F, G, o) {
      var j = o("c6b6"), z = o("fc6a"), $ = o("241c").f, m = o("4dae"), v = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], u = function(S) {
        try {
          return $(S);
        } catch {
          return m(v);
        }
      };
      F.exports.f = function(S) {
        return v && j(S) == "Window" ? u(S) : $(z(S));
      };
    }, "06cf": function(F, G, o) {
      var j = o("83ab"), z = o("c65b"), $ = o("d1e7"), m = o("5c6c"), v = o("fc6a"), u = o("a04b"), S = o("1a2d"), g = o("0cfb"), w = Object.getOwnPropertyDescriptor;
      G.f = j ? w : function(a, f) {
        if (a = v(a), f = u(f), g)
          try {
            return w(a, f);
          } catch {
          }
        if (S(a, f))
          return m(!z($.f, a, f), a[f]);
      };
    }, "07fa": function(F, G, o) {
      var j = o("50c4");
      F.exports = function(z) {
        return j(z.length);
      };
    }, "0825": function(F) {
      F.exports = JSON.parse(`{"psaccounts":{"accountManager":{"errorInstallEnable":"Si \xE8 verificato un errore, si prega di riprovare."},"alert":{"ps_accounts":{"enable":{"title":"Attiva il modulo PrestaShop Account","message":"Il modulo PrestaShop account \xE8 necessario per continuare la configurazione di questo modulo.","action":"Attiva","loading":"Attivazione del modulo PrestaShop Account in corso..."},"install":{"title":"Installa il modulo PrestaShop Account","message":"Il modulo PrestaShop account \xE8 necessario per continuare la configurazione di questo modulo.","action":"Installare","loading":"Installazione del modulo PrestaShop Account in corso..."},"update":{"title":"Aggiorna modulo Account PrestaShop","message":"Una nuova versione di PrestaShop Accounts \xE8 disponibile, si prega di aggiornare il modulo per continuare a utilizzare i servizi","action":"Aggiornare","loading":"Il modulo PrestaShop Account \xE8 attualmente in fase di aggiornamento..."}},"ps_eventbus":{"enable":{"title":"Attivare il modulo PrestaShop Event Bus","message":"Hai bisogno del modulo PrestaShop Event Bus per continuare a configurare questo modulo.","action":"Attiva","loading":"Il modulo PrestaShop Event Bus \xE8 in fase di attivazione..."},"install":{"title":"Installa il modulo Prestashop Event Bus","message":"Il modulo Prestashop Event Bus \xE8 necessario per continuare la configurazione di questo modulo.","action":"Installare","loading":"Installazione del modulo Prestashop Event Bus in corso..."}}},"alertShopDomainShouldExists":{"title":"URL del negozio non compilato!","message":"Solo i negozi con un URL assegnato possono essere associati a un account PrestaShop.<br />I seguenti negozi non hanno un URL assegnato: "},"account":{"title":"Associa il tuo negozio a un account PrestaShop | Associa i tuoi negozi a un account PrestaShop","authorize":"Puoi associare il tuo negozio a un solo account. Quindi assicurati di scegliere quello giusto!","authorized":"Il tuo negozio \xE8 associato all'account PrestaShop: | I tuoi negozi sono associati all'account PrestaShop:","authorizedPartially":"I tuoi negozi sono parzialmente associati a un account PrestaShop","authorizedSeveral":"I tuoi negozi sono associati a diversi account PrestaShop","connectButton":"Associa","reonboardButton":"Riassociare","disconnectButton":"Usa un altro account","moduleUpdateInformation":"<strong>Nuovo aggiornamento:</strong> da oggi, puoi gestire i tuoi negozi associati.<br /> Ti preghiamo di riassociarli, <strong>utilizzando lo stesso indirizzo e-mail</strong> per usufruire di questo aggiornamento.<br /> Altri aggiornamenti del modulo sono disponibili nella sezione \\"Module Manager\\", alla scheda \\"Aggiornamenti\\".","emailNotVerified":{"title":"Una mail di conferma \xE8 stata inviata.","description":"Controlla la tua casella di posta e clicca sul link per attivare il tuo account."},"sendEmail":"Invia di nuovo","needToBeAdmin":"Per continuare, devi essere l'amministratore del negozio","pleaseContact":"Ti preghiamo di contattare","manageAccountButton":"Vedi i miei negozi associati","unlinkButton":"Scollega"}}}`);
    }, "0b42": function(F, G, o) {
      var j = o("da84"), z = o("e8b5"), $ = o("68ee"), m = o("861d"), v = o("b622"), u = v("species"), S = j.Array;
      F.exports = function(g) {
        var w;
        return z(g) && (w = g.constructor, $(w) && (w === S || z(w.prototype)) ? w = void 0 : m(w) && (w = w[u], w === null && (w = void 0))), w === void 0 ? S : w;
      };
    }, "0cfb": function(F, G, o) {
      var j = o("83ab"), z = o("d039"), $ = o("cc12");
      F.exports = !j && !z(function() {
        return Object.defineProperty($("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }, "0d51": function(F, G, o) {
      var j = o("da84"), z = j.String;
      F.exports = function($) {
        try {
          return z($);
        } catch {
          return "Object";
        }
      };
    }, "107c": function(F, G, o) {
      var j = o("d039"), z = o("da84"), $ = z.RegExp;
      F.exports = j(function() {
        var m = $("(?<a>b)", "g");
        return m.exec("b").groups.a !== "b" || "b".replace(m, "$<a>c") !== "bc";
      });
    }, "12c0": function(F, G, o) {
      o("b64b"), o("a4d3"), o("4de4"), o("d3b7"), o("e439"), o("159b"), o("dbb4");
      var j = o("5757");
      function z(m, v) {
        var u = Object.keys(m);
        if (Object.getOwnPropertySymbols) {
          var S = Object.getOwnPropertySymbols(m);
          v && (S = S.filter(function(g) {
            return Object.getOwnPropertyDescriptor(m, g).enumerable;
          })), u.push.apply(u, S);
        }
        return u;
      }
      function $(m) {
        for (var v = 1; v < arguments.length; v++) {
          var u = arguments[v] != null ? arguments[v] : {};
          v % 2 ? z(Object(u), !0).forEach(function(S) {
            j(m, S, u[S]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(m, Object.getOwnPropertyDescriptors(u)) : z(Object(u)).forEach(function(S) {
            Object.defineProperty(m, S, Object.getOwnPropertyDescriptor(u, S));
          });
        }
        return m;
      }
      F.exports = $, F.exports.__esModule = !0, F.exports.default = F.exports;
    }, "14c3": function(F, G, o) {
      var j = o("da84"), z = o("c65b"), $ = o("825a"), m = o("1626"), v = o("c6b6"), u = o("9263"), S = j.TypeError;
      F.exports = function(g, w) {
        var a = g.exec;
        if (m(a)) {
          var f = z(a, g, w);
          return f !== null && $(f), f;
        }
        if (v(g) === "RegExp")
          return z(u, g, w);
        throw S("RegExp#exec called on incompatible receiver");
      };
    }, "14d2": function(F, G, o) {
      var j = o("12c0").default, z = o("f3e1").default, $ = ["class", "staticClass", "style", "staticStyle", "attrs"];
      o("cca6"), o("99af"), F.exports = { functional: !0, render: function(m, v) {
        var u = v._c, S = (v._v, v.data), g = v.children, w = g === void 0 ? [] : g, a = S.class, f = S.staticClass, y = S.style, l = S.staticStyle, c = S.attrs, s = c === void 0 ? {} : c, b = z(S, $);
        return u("svg", j({ class: [a, f], style: [y, l], attrs: Object.assign({ fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 46 46" }, s) }, b), w.concat([u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.514 33.983c.352-.157.71-.302 1.07-.437a19.734 19.734 0 012.8-.831 19.384 19.384 0 012.161-.334 67.404 67.404 0 01-1.346 3.822c.02.245.032.492.039.74a15.68 15.68 0 016.076 0c.006-.248.017-.495.038-.74a67.72 67.72 0 01-1.346-3.822c.727.07 1.448.183 2.16.334a19.544 19.544 0 012.801.831 19.143 19.143 0 017.72 5.345c4.686-4.046 7.656-10.026 7.656-16.703C44.343 10 34.463.12 22.276.12 10.088.12.208 10 .208 22.188c0 6.677 2.97 12.657 7.656 16.703a19.156 19.156 0 016.65-4.908z", fill: "#9FD6DC" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.969 37.975a15.501 15.501 0 013.269-1.033 12.605 12.605 0 00-.039-.74c.488-1.265.939-2.54 1.346-3.82a19.43 19.43 0 00-2.16.333 19.61 19.61 0 00-2.801.831l1.609.39-1.224 4.039zm-3.793 2.379c.04-.41.065-.826.065-1.245 0-.253.205-.457.457-.457h.401l1.415-4.67a19.155 19.155 0 00-6.65 4.91 22.06 22.06 0 003.328 2.374c.315-.317.643-.622.984-.912zm17.862-6.371l1.415 4.669h.4c.253 0 .457.204.457.457 0 .419.025.834.065 1.245.341.29.67.595.985.912a22.109 22.109 0 003.327-2.375 19.143 19.143 0 00-6.65-4.908zm-2.678-.047l1.607-.39a19.734 19.734 0 00-2.8-.831 19.41 19.41 0 00-2.161-.334 67.67 67.67 0 001.346 3.822c-.02.245-.032.492-.038.74 1.14.224 2.233.574 3.27 1.032l-1.225-4.04z", fill: "#4B4D4A" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M22.276 38.652h3.11a12.41 12.41 0 01-.072-1.71 15.685 15.685 0 00-6.076 0c.015.566-.008 1.137-.072 1.71h3.11zm-11.085 2.614c.257.15.516.295.778.434.093-.442.163-.89.207-1.346-.34.29-.67.595-.985.912z", fill: "#1A1919" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.763 38.652h3.403c.064-.573.087-1.144.072-1.71a15.51 15.51 0 00-3.27 1.033l-.205.677zm16.612 1.702c.044.455.115.904.207 1.346.262-.139.521-.285.778-.434a15.728 15.728 0 00-.985-.912zm-3.586-1.702l-.205-.677a15.494 15.494 0 00-3.27-1.033 12.41 12.41 0 00.072 1.71h3.403z", fill: "#1A1919" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.764 38.652l1.429-4.716-1.609-.39c-.36.135-.717.28-1.07.437L13.1 38.651h2.665zm12.82-.677l.204.677h2.665l-1.415-4.67c-.353-.156-.71-.3-1.07-.436l-1.609.39 1.225 4.04z", fill: "#9E8D6F" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M13.146 39.635l.097-.07h-.093l-.005.07z", fill: "#B8A98F" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M22.276 39.566h-9.089l-.041.03c-.03.862-.146 1.707-.334 2.53a21.979 21.979 0 009.464 2.129v-4.69z", fill: "#B8A98F" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M31.458 39.566h-.094l.098.069c-.001-.023-.004-.046-.004-.07z", fill: "#9E8D6F" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M31.364 39.566h-9.088v4.689c3.387 0 6.595-.766 9.463-2.13a13.532 13.532 0 01-.333-2.53 2.36 2.36 0 00-.042-.03z", fill: "#9E8D6F" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M32.375 40.354c-.04-.41-.065-.826-.065-1.245a.457.457 0 00-.457-.457H12.698a.457.457 0 00-.457.457 12.843 12.843 0 01-.272 2.591c.278.147.558.29.843.426.187-.823.303-1.668.333-2.53l.002-.03h18.257l.002.03c.03.862.146 1.707.333 2.53.285-.136.565-.279.843-.426a12.623 12.623 0 01-.207-1.346z", fill: "#806D59" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M29.471 36.363l.008.025-.008-.025s-.387-.302-.877-.86c.49.558.877.86.877.86z", fill: "#9E8D6F" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M36.732 22.404l.001-.016v.015z", fill: "#FFFFFE" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M36.969 17.277l-.011-.014a7.518 7.518 0 00-.567-.698s0-.002-.002-.002l.002.002-.005-.006a6.04 6.04 0 00-.267-.273c-.034-.033-.07-.062-.104-.093-.057-.051-.113-.104-.17-.152v2.053l.786 3.6c.008.027.019.054.026.083l.545.61.005-.006h.57c0-.053.004-.105.004-.158 0-1.699-.28-3.33-.785-4.858-.01-.029-.018-.059-.027-.088zm-.236 5.119v-.014.014z", fill: "#B6B7B4" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M36.74 22.044l.005.017c0 .004.002.007.003.01v.002c.017.085.024.172.027.261 0 .017.005.032.005.048v.013c0 .017-.005.034-.005.051a1.67 1.67 0 01-.026.256v.001l-.004.013c-.001.007-.004.013-.006.02a1.53 1.53 0 01-.08.26l-.001.002.005-.003.002-.005.877-.603-.885-.61v.001c.036.085.063.174.083.266z", fill: "#5F6360" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M35.877 22.186c-.184 0-.333-.256-.333-.571 0-.316.149-.571.333-.571.184 0 .333.255.333.571 0 .315-.15.57-.333.57zm.83.55l.007-.034c.01-.083.014-.169.016-.256 0-.02.003-.038.003-.058 0-.018-.003-.035-.003-.054a2.438 2.438 0 00-.017-.26l-.005-.03a2.293 2.293 0 00-.05-.266c-.008-.03-.019-.056-.027-.085a1.712 1.712 0 00-.243-.501.881.881 0 00-.186-.195c-.014-.012-.03-.02-.046-.03a.657.657 0 00-.153-.073.536.536 0 00-.158-.027.536.536 0 00-.206.044.67.67 0 00-.106.057c-.015.01-.03.017-.046.03a.88.88 0 00-.185.194 1.712 1.712 0 00-.243.502l-.007.02a2.338 2.338 0 00-.056.248l-.014.079a2.4 2.4 0 00-.022.298l-.003.042h.004c0 .84.398 1.522.888 1.522a.552.552 0 00.243-.06l.037-.02a.695.695 0 00.094-.063c.016-.013.032-.03.048-.044a1.17 1.17 0 00.224-.297 2.41 2.41 0 00.07-.144l.022-.055a2.016 2.016 0 00.12-.485z", fill: "#1A1919" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M35.986 21.044c-.245 0-.442.256-.442.571 0 .315.197.57.442.57.244 0 .442-.255.442-.57 0-.315-.198-.57-.442-.57z", fill: "#FFFFFE" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M35.059 21.693a1.71 1.71 0 01.242-.501.85.85 0 01.185-.195c.016-.012.032-.02.047-.03a.641.641 0 01.153-.073.52.52 0 01.158-.027.521.521 0 01.206.044.62.62 0 01.105.057c.016.01.032.017.047.03a.849.849 0 01.186.194 1.713 1.713 0 01.243.501l-.787-3.598-.785 3.598z", fill: "#8A8D88" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M23.353 22.11a.781.781 0 110-1.561.781.781 0 010 1.562zm2.077.245a2.07 2.07 0 00-.014-.215v-.003a2.152 2.152 0 00-.035-.204l-.001-.005a1.963 1.963 0 00-.054-.196l-.002-.004a2.107 2.107 0 00-.072-.188l-.002-.004a2.092 2.092 0 00-1.11-1.076l-.007-.002a2.074 2.074 0 00-1.172-.114c-.004 0-.009 0-.013.002a2.037 2.037 0 00-.366.109l-.009.003a2.061 2.061 0 00-.338.176h-.002c-.107.07-.207.148-.3.235l-.003.007-.008.002c-.148.14-.275.303-.377.482l-.003.006a2.02 2.02 0 00-.086.17l-.008.018a1.932 1.932 0 00-.063.165c-.004.01-.009.021-.012.032-.017.052-.03.106-.043.16l-.012.045a2.223 2.223 0 00-.025.162l-.008.05a2.039 2.039 0 00.029.618v.008c.027.13.065.255.114.375l.002.005a2.093 2.093 0 001.082 1.11l.014.008c.055.023.11.044.168.063.01.003.018.008.028.01.053.017.107.03.16.043l.045.011c.052.012.106.019.16.026.017.002.033.006.05.007a2.071 2.071 0 001.94-.906 2.072 2.072 0 00.355-1.162v-.014l-.002-.015z", fill: "#1A1919" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M23.353 20.55a.78.78 0 100 1.56.78.78 0 000-1.56z", fill: "#FFFFFE" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M21.923 20.878l.008-.002.002-.007 1.432-4.379v-1.037a12.236 12.236 0 00-2.457-.253c-.28 0-.558.012-.834.031l-.121.008c-1.437.11-2.853.484-4.163 1.082a13.288 13.288 0 00-3.107 1.991l-.002.002c-.252.214-.493.44-.73.67l-.132.131c-.222.224-.436.455-.644.693l-.134.157a15.74 15.74 0 00-.604.756c-.015.021-.03.044-.047.066-.183.25-.358.506-.526.767-.033.05-.067.1-.1.152a16.18 16.18 0 00-.388.66h6.523l6.024-1.488z", fill: "#B6B7B4" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M27.43 20.386a21.522 21.522 0 00.057-1.208c.004-.18.003-.36.002-.54 0-.051.002-.103 0-.155a27.012 27.012 0 00-.05-1.392c-.002 0-.003-.002-.004-.003l-.002-.003a1.897 1.897 0 00-.015-.008l-.02-.012a139.987 139.987 0 00-.495-.283l-.135-.076-.002-.001-.094-.052-.018-.011a12.952 12.952 0 00-.985-.468c-.742-.313-1.742-.588-2.304-.72v1.036l1.419 4.386.002.004a2.11 2.11 0 01.464.657l.002.003c.027.061.051.124.073.188l.001.004c.021.064.04.129.054.196l.002.005c.014.067.026.135.034.204v.003c.009.07.014.142.015.215l.005.011h1.738c.117-.636.199-1.28.25-1.927l.006-.053z", fill: "#E0DAD3" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M29.706 18.834l-.007.015a.09.09 0 00.007-.014", fill: "#F1A948" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M25.446 28.616a76.93 76.93 0 001.121-1.136c.211-.218.418-.435.614-.649 1.453-1.576 2.52-3.052 3.16-4.95a1.764 1.764 0 00.052-.202c.015-.07.03-.15.044-.238l.018-.178c-.161-.827-.474-1.63-.75-2.423a.065.065 0 01.003.008.117.117 0 01-.008-.008c-.053-.05-.109-.096-.162-.146-.164-.15-.33-.298-.5-.44a13.319 13.319 0 00-1.6-1.163c.03.464.047.928.052 1.392v.156c0 .18 0 .36-.003.539a22.594 22.594 0 01-.057 1.207l-.005.054a18.905 18.905 0 01-.251 1.927l-.204.966c-.426 1.728-1.292 3.296-2.005 4.915a19.462 19.462 0 00-.569 1.43c.222-.234.42-.436.57-.584l.48-.477z", fill: "#F1A948" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M21.933 20.87c.093-.088.193-.167.3-.236h.002c.106-.069.22-.128.338-.176l.01-.003a2.04 2.04 0 01.365-.11l.013-.001a2.042 2.042 0 01.79 0l.01.002c.13.026.254.064.373.112l.006.003c.241.099.46.242.645.42l-.001-.005-1.42-4.386-1.431 4.38z", fill: "#8A8D88" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M21.428 23.17a2.075 2.075 0 01-.113-.376l-.001-.008a2.085 2.085 0 01-.029-.618l.008-.05c.007-.054.015-.109.026-.162l.011-.045c.013-.054.026-.108.043-.16l.012-.032a1.98 1.98 0 01.063-.165l.008-.018c.026-.058.055-.115.086-.17l.003-.006c.102-.179.23-.341.378-.482l-6.024 1.488h-.012l5.967 1.457a2.092 2.092 0 01-.424-.649c0-.001 0-.003-.002-.005z", fill: "#5F6360" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M34.982 22.04l.014-.078c.015-.085.033-.169.056-.248.003-.009.004-.02.006-.028l.787-3.599v-2.052c-.642-.53-1.33-.82-2.047-.82-.904 0-1.748.5-2.379 1.116-.69.675-1.223 1.525-1.655 2.382l-.06.117c.134.116.265.233.395.351.294.269.581.545.864.824.133.13.262.264.392.396a42.721 42.721 0 01.931.98c.072.078.145.157.216.237.206.228.412.458.614.69v.001c.035.036.059.061.068.072h1.773l.002-.042c.002-.102.01-.202.023-.298zm-5.272-3.193a.052.052 0 00-.004-.012.09.09 0 01-.007.013.398.398 0 00.019.018.157.157 0 00-.007-.019z", fill: "#E0DAD3" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.307 24.631l.016-.04c.114-.298.24-.593.37-.884.037-.082.075-.162.113-.243.107-.229.22-.454.34-.678.047-.091.094-.183.144-.273.027-.05.058-.097.086-.147.126-.222.252-.444.388-.66l.1-.152c.168-.261.343-.517.526-.767l.047-.066c.193-.26.396-.51.604-.756l.134-.157c.207-.238.422-.47.644-.693l.133-.13c.236-.231.477-.457.73-.671v-.002c.992-3.321 4.025-5.739 7.615-5.739a7.93 7.93 0 014.113 1.17 8.055 8.055 0 012.96 3.223l.01.02c.018.033.037.065.053.1l.002.003.004.002c.56.345 1.093.735 1.6 1.163.169.142.335.29.498.44.054.05.11.096.163.146l.003-.006a.02.02 0 00.002-.003l.054-.113c.506-3.192 1.914-5.492 3.575-5.492 1.252 0 2.361 1.305 3.048 3.315l.008.021a7.518 7.518 0 01.568.7l.01.015.028.088-.025-.105c-2.067-6.117-7.852-10.52-14.667-10.52-8.548 0-15.477 6.928-15.477 15.476 0 1.685.27 3.307.77 4.817a16.791 16.791 0 01.71-2.402z", fill: "#4B4D4A" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M37.201 22.387l-.54.604v.004a2.117 2.117 0 01-.074.225l-.023.055a1.642 1.642 0 01-.11.216 1.111 1.111 0 01-.072.1 1.04 1.04 0 01-.111.125c-.016.014-.032.031-.049.044a.695.695 0 01-.13.083.552.552 0 01-.243.06c-.49 0-.888-.682-.888-1.522h-1.783l.001.001a55.855 55.855 0 01.989 1.175c.312.38.62.765.923 1.15l.045.058c.288.367.573.737.856 1.108l.082.108c.299.393.595.787.889 1.182l.006.008c.51-1.507.794-3.116.811-4.79h-.573l-.006.006z", fill: "#FFFFFE" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19.953 15.239l.12-.008c.277-.019.554-.03.835-.03.839 0 1.66.09 2.456.252v.395-.395c.563.133 1.563.408 2.305.72a12.865 12.865 0 01.985.469l.018.01.094.053.002.001.135.076.012.007.483.276.02.012.015.008c-.017-.034-.036-.066-.052-.1-.004-.005-.007-.012-.01-.019a8.053 8.053 0 00-2.961-3.223 7.928 7.928 0 00-4.113-1.17c-3.59 0-6.623 2.418-7.614 5.739a13.288 13.288 0 013.107-1.99 12.297 12.297 0 014.163-1.083zm11.467 1.092c.63-.617 1.474-1.116 2.379-1.116.716 0 1.404.29 2.046.82v.007c.057.047.114.1.17.151.035.031.07.06.104.093.09.086.18.177.267.273l.006.006-.002-.002-.008-.022c-.686-2.01-1.796-3.315-3.047-3.315-1.662 0-3.07 2.3-3.576 5.492l.006-.004c.431-.858.965-1.707 1.654-2.383z", fill: "#1A1919" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16.763 36.653c.141.054.285.103.428.153 1.601.561 3.32.87 5.113.87 2.045 0 3.994-.4 5.78-1.12.095-.038.188-.08.281-.12.152-.064.302-.13.451-.2.134-.062.267-.123.399-.189l-.096.014a6.462 6.462 0 01-1.644-.011c-3.185-.458-3.89-1.994-3.79-3.593a7.84 7.84 0 01-.7-.453c-2.448-1.777-3.902-3.67-3.902-3.67s1.89 1.459 4.712 2.55c.06.024.117.044.176.067.132-.456.288-.89.425-1.274l.044-.125c.158-.442.337-.876.525-1.305.713-1.62 1.579-3.187 2.005-4.915l.204-.966h-1.742v.019a2.073 2.073 0 01-1.27 1.915 2.072 2.072 0 01-1.025.152l-.049-.007a1.853 1.853 0 01-.161-.026l-.044-.01a2.034 2.034 0 01-.16-.043c-.01-.003-.02-.008-.03-.01a2.054 2.054 0 01-.167-.064l-.014-.007a2.04 2.04 0 01-.172-.086c-.001 0-.002 0-.003-.002a2.1 2.1 0 01-.483-.374l-5.967-1.457H9.376c-.028.05-.059.098-.086.148-.05.09-.097.181-.145.272a16.072 16.072 0 00-.451.92c-.132.293-.257.587-.371.886l-.016.04a16.85 16.85 0 00-.708 2.392 15.516 15.516 0 005.626 7.707c.076.055.156.104.233.157a15.414 15.414 0 003.305 1.765z", fill: "#FFFFFE" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M27.448 31.846a4.254 4.254 0 00.117 1.795 4.897 4.897 0 00.822 1.61 5.156 5.156 0 00.715.756l.004.014.013.04.096-.014a9.765 9.765 0 002.071-.52c.35-.126.698-.262 1.04-.418.105-.048.207-.101.311-.151 3.545-1.715 6.514-4.747 6.514-4.747-4.454 2.19-8.808 2.102-11.703 1.635z", fill: "#8B234A" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M35.992 25.873c-.283-.37-.568-.74-.856-1.108l-.045-.057a73.54 73.54 0 00-.935-1.165 49.47 49.47 0 00-.977-1.16 47.482 47.482 0 00-1.412-1.558 44.39 44.39 0 00-.412-.424c-.13-.132-.26-.265-.392-.396a32.18 32.18 0 00-.864-.824c-.13-.119-.262-.236-.395-.35a.027.027 0 01-.002.003c.28.804.599 1.618.759 2.456.042.218.076.43.104.638.39 2.9-.54 4.795-2.017 7.287l-.325.545a5.873 5.873 0 00-.68 1.596 5.41 5.41 0 00-.095.49c2.895.467 7.248.554 11.703-1.635 0 0-.874-1.284-2.188-3.048-.294-.395-.59-.79-.89-1.182l-.081-.108z", fill: "#D01665" } }), u("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M29.102 36.007s-.224-.177-.508-.504a5.205 5.205 0 01-.477-.64 4.896 4.896 0 01-.305-.561 4.499 4.499 0 01-.357-1.155 4.246 4.246 0 01-.007-1.301c.023-.16.054-.323.096-.49a5.879 5.879 0 01.682-1.6l.323-.541c1.476-2.492 2.405-4.387 2.016-7.287a11.86 11.86 0 00-.104-.638c-.022.151-.045.28-.068.39l-.007.03c-.014.066-.03.126-.044.171-.642 1.898-1.708 3.374-3.161 4.95-.197.214-.403.43-.614.65a77.99 77.99 0 01-1.122 1.136l-.48.476c-.15.148-.347.35-.57.584-.136.384-.292.818-.424 1.274l-.177-.067c-2.822-1.091-4.711-2.55-4.711-2.55s1.454 1.893 3.903 3.67c.237.172.47.321.7.453-.102 1.6.604 3.135 3.788 3.593.539.077 1.09.073 1.645.01l-.013-.038-.004-.015z", fill: "#1A1919" } })]));
      } };
    }, "159b": function(F, G, o) {
      var j = o("da84"), z = o("fdbc"), $ = o("785a"), m = o("17c2"), v = o("9112"), u = function(g) {
        if (g && g.forEach !== m)
          try {
            v(g, "forEach", m);
          } catch {
            g.forEach = m;
          }
      };
      for (var S in z)
        z[S] && u(j[S] && j[S].prototype);
      u($);
    }, "15be": function(F, G, o) {
      var j = o("12c0").default, z = o("f3e1").default, $ = ["class", "staticClass", "style", "staticStyle", "attrs"];
      o("cca6"), o("99af"), F.exports = { functional: !0, render: function(m, v) {
        var u = v._c, S = (v._v, v.data), g = v.children, w = g === void 0 ? [] : g, a = S.class, f = S.staticClass, y = S.style, l = S.staticStyle, c = S.attrs, s = c === void 0 ? {} : c, b = z(S, $);
        return u("svg", j({ class: [a, f], style: [y, l], attrs: Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" }, s) }, b), w.concat([u("path", { attrs: { d: "M0 0h24v24H0z", fill: "none" } }), u("path", { attrs: { d: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z" } })]));
      } };
    }, 1626: function(F, G) {
      F.exports = function(o) {
        return typeof o == "function";
      };
    }, "17c2": function(F, G, o) {
      var j = o("b727").forEach, z = o("a640"), $ = z("forEach");
      F.exports = $ ? [].forEach : function(m) {
        return j(this, m, arguments.length > 1 ? arguments[1] : void 0);
      };
    }, "19aa": function(F, G, o) {
      var j = o("da84"), z = o("3a9b"), $ = j.TypeError;
      F.exports = function(m, v) {
        if (z(v, m))
          return m;
        throw $("Incorrect invocation");
      };
    }, "1a2d": function(F, G, o) {
      var j = o("e330"), z = o("7b0b"), $ = j({}.hasOwnProperty);
      F.exports = Object.hasOwn || function(m, v) {
        return $(z(m), v);
      };
    }, "1be4": function(F, G, o) {
      var j = o("d066");
      F.exports = j("document", "documentElement");
    }, "1c7e": function(F, G, o) {
      var j = o("b622"), z = j("iterator"), $ = !1;
      try {
        var m = 0, v = { next: function() {
          return { done: !!m++ };
        }, return: function() {
          $ = !0;
        } };
        v[z] = function() {
          return this;
        }, Array.from(v, function() {
          throw 2;
        });
      } catch {
      }
      F.exports = function(u, S) {
        if (!S && !$)
          return !1;
        var g = !1;
        try {
          var w = {};
          w[z] = function() {
            return { next: function() {
              return { done: g = !0 };
            } };
          }, u(w);
        } catch {
        }
        return g;
      };
    }, "1cdc": function(F, G, o) {
      var j = o("342f");
      F.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(j);
    }, "1d80": function(F, G, o) {
      var j = o("da84"), z = j.TypeError;
      F.exports = function($) {
        if ($ == null)
          throw z("Can't call method on " + $);
        return $;
      };
    }, "1dde": function(F, G, o) {
      var j = o("d039"), z = o("b622"), $ = o("2d00"), m = z("species");
      F.exports = function(v) {
        return $ >= 51 || !j(function() {
          var u = [], S = u.constructor = {};
          return S[m] = function() {
            return { foo: 1 };
          }, u[v](Boolean).foo !== 1;
        });
      };
    }, "1fb5": function(F, G, o) {
      G.byteLength = g, G.toByteArray = a, G.fromByteArray = l;
      for (var j = [], z = [], $ = typeof Uint8Array < "u" ? Uint8Array : Array, m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", v = 0, u = m.length; v < u; ++v)
        j[v] = m[v], z[m.charCodeAt(v)] = v;
      function S(c) {
        var s = c.length;
        if (s % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var b = c.indexOf("=");
        b === -1 && (b = s);
        var h = b === s ? 0 : 4 - b % 4;
        return [b, h];
      }
      function g(c) {
        var s = S(c), b = s[0], h = s[1];
        return 3 * (b + h) / 4 - h;
      }
      function w(c, s, b) {
        return 3 * (s + b) / 4 - b;
      }
      function a(c) {
        var s, b, h = S(c), k = h[0], d = h[1], O = new $(w(c, k, d)), M = 0, L = d > 0 ? k - 4 : k;
        for (b = 0; b < L; b += 4)
          s = z[c.charCodeAt(b)] << 18 | z[c.charCodeAt(b + 1)] << 12 | z[c.charCodeAt(b + 2)] << 6 | z[c.charCodeAt(b + 3)], O[M++] = s >> 16 & 255, O[M++] = s >> 8 & 255, O[M++] = 255 & s;
        return d === 2 && (s = z[c.charCodeAt(b)] << 2 | z[c.charCodeAt(b + 1)] >> 4, O[M++] = 255 & s), d === 1 && (s = z[c.charCodeAt(b)] << 10 | z[c.charCodeAt(b + 1)] << 4 | z[c.charCodeAt(b + 2)] >> 2, O[M++] = s >> 8 & 255, O[M++] = 255 & s), O;
      }
      function f(c) {
        return j[c >> 18 & 63] + j[c >> 12 & 63] + j[c >> 6 & 63] + j[63 & c];
      }
      function y(c, s, b) {
        for (var h, k = [], d = s; d < b; d += 3)
          h = (c[d] << 16 & 16711680) + (c[d + 1] << 8 & 65280) + (255 & c[d + 2]), k.push(f(h));
        return k.join("");
      }
      function l(c) {
        for (var s, b = c.length, h = b % 3, k = [], d = 16383, O = 0, M = b - h; O < M; O += d)
          k.push(y(c, O, O + d > M ? M : O + d));
        return h === 1 ? (s = c[b - 1], k.push(j[s >> 2] + j[s << 4 & 63] + "==")) : h === 2 && (s = (c[b - 2] << 8) + c[b - 1], k.push(j[s >> 10] + j[s >> 4 & 63] + j[s << 2 & 63] + "=")), k.join("");
      }
      z["-".charCodeAt(0)] = 62, z["_".charCodeAt(0)] = 63;
    }, "201a": function(F, G, o) {
      var j = o("24fb");
      G = j(!1), G.push([F.i, "@media (min-width:768px){.crossdomain[data-v-03440518]{width:90%!important;height:90%!important;max-width:990px;max-height:810px}}.crossdomain>div[data-v-03440518]{width:100%;height:100%}.fade-enter-active[data-v-03440518],.fade-leave-active[data-v-03440518]{transition:opacity .25s}.fade-enter[data-v-03440518],.fade-leave-to[data-v-03440518]{opacity:0}", ""]), F.exports = G;
    }, 2266: function(F, G, o) {
      var j = o("da84"), z = o("0366"), $ = o("c65b"), m = o("825a"), v = o("0d51"), u = o("e95a"), S = o("07fa"), g = o("3a9b"), w = o("9a1f"), a = o("35a1"), f = o("2a62"), y = j.TypeError, l = function(s, b) {
        this.stopped = s, this.result = b;
      }, c = l.prototype;
      F.exports = function(s, b, h) {
        var k, d, O, M, L, x, T, N = h && h.that, Y = !(!h || !h.AS_ENTRIES), ot = !(!h || !h.IS_ITERATOR), at = !(!h || !h.INTERRUPTED), St = z(b, N), wt = function(It) {
          return k && f(k, "normal", It), new l(!0, It);
        }, Nt = function(It) {
          return Y ? (m(It), at ? St(It[0], It[1], wt) : St(It[0], It[1])) : at ? St(It, wt) : St(It);
        };
        if (ot)
          k = s;
        else {
          if (d = a(s), !d)
            throw y(v(s) + " is not iterable");
          if (u(d)) {
            for (O = 0, M = S(s); M > O; O++)
              if (L = Nt(s[O]), L && g(c, L))
                return L;
            return new l(!1);
          }
          k = w(s, d);
        }
        for (x = k.next; !(T = $(x, k)).done; ) {
          try {
            L = Nt(T.value);
          } catch (It) {
            f(k, "throw", It);
          }
          if (typeof L == "object" && L && g(c, L))
            return L;
        }
        return new l(!1);
      };
    }, "23cb": function(F, G, o) {
      var j = o("5926"), z = Math.max, $ = Math.min;
      F.exports = function(m, v) {
        var u = j(m);
        return u < 0 ? z(u + v, 0) : $(u, v);
      };
    }, "23e7": function(F, G, o) {
      var j = o("da84"), z = o("06cf").f, $ = o("9112"), m = o("6eeb"), v = o("ce4e"), u = o("e893"), S = o("94ca");
      F.exports = function(g, w) {
        var a, f, y, l, c, s, b = g.target, h = g.global, k = g.stat;
        if (f = h ? j : k ? j[b] || v(b, {}) : (j[b] || {}).prototype, f)
          for (y in w) {
            if (c = w[y], g.noTargetGet ? (s = z(f, y), l = s && s.value) : l = f[y], a = S(h ? y : b + (k ? "." : "#") + y, g.forced), !a && l !== void 0) {
              if (typeof c == typeof l)
                continue;
              u(c, l);
            }
            (g.sham || l && l.sham) && $(c, "sham", !0), m(f, y, c, g);
          }
      };
    }, "241c": function(F, G, o) {
      var j = o("ca84"), z = o("7839"), $ = z.concat("length", "prototype");
      G.f = Object.getOwnPropertyNames || function(m) {
        return j(m, $);
      };
    }, "24fb": function(F, G, o) {
      function j($, m) {
        var v = $[1] || "", u = $[3];
        if (!u)
          return v;
        if (m && typeof btoa == "function") {
          var S = z(u), g = u.sources.map(function(w) {
            return "/*# sourceURL=".concat(u.sourceRoot || "").concat(w, " */");
          });
          return [v].concat(g).concat([S]).join(`
`);
        }
        return [v].join(`
`);
      }
      function z($) {
        var m = btoa(unescape(encodeURIComponent(JSON.stringify($)))), v = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(m);
        return "/*# ".concat(v, " */");
      }
      F.exports = function($) {
        var m = [];
        return m.toString = function() {
          return this.map(function(v) {
            var u = j(v, $);
            return v[2] ? "@media ".concat(v[2], " {").concat(u, "}") : u;
          }).join("");
        }, m.i = function(v, u, S) {
          typeof v == "string" && (v = [[null, v, ""]]);
          var g = {};
          if (S)
            for (var w = 0; w < this.length; w++) {
              var a = this[w][0];
              a != null && (g[a] = !0);
            }
          for (var f = 0; f < v.length; f++) {
            var y = [].concat(v[f]);
            S && g[y[0]] || (u && (y[2] ? y[2] = "".concat(u, " and ").concat(y[2]) : y[2] = u), m.push(y));
          }
        }, m;
      };
    }, "25f0": function(F, G, o) {
      var j = o("e330"), z = o("5e77").PROPER, $ = o("6eeb"), m = o("825a"), v = o("3a9b"), u = o("577e"), S = o("d039"), g = o("ad6d"), w = "toString", a = RegExp.prototype, f = a[w], y = j(g), l = S(function() {
        return f.call({ source: "a", flags: "b" }) != "/a/b";
      }), c = z && f.name != w;
      (l || c) && $(RegExp.prototype, w, function() {
        var s = m(this), b = u(s.source), h = s.flags, k = u(h === void 0 && v(a, s) && !("flags" in a) ? y(s) : h);
        return "/" + b + "/" + k;
      }, { unsafe: !0 });
    }, 2626: function(F, G, o) {
      var j = o("d066"), z = o("9bf2"), $ = o("b622"), m = o("83ab"), v = $("species");
      F.exports = function(u) {
        var S = j(u), g = z.f;
        m && S && !S[v] && g(S, v, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, "2a62": function(F, G, o) {
      var j = o("c65b"), z = o("825a"), $ = o("dc4a");
      F.exports = function(m, v, u) {
        var S, g;
        z(m);
        try {
          if (S = $(m, "return"), !S) {
            if (v === "throw")
              throw u;
            return u;
          }
          S = j(S, m);
        } catch (w) {
          g = !0, S = w;
        }
        if (v === "throw")
          throw u;
        if (g)
          throw S;
        return z(S), u;
      };
    }, "2ba4": function(F, G) {
      var o = Function.prototype, j = o.apply, z = o.bind, $ = o.call;
      F.exports = typeof Reflect == "object" && Reflect.apply || (z ? $.bind(j) : function() {
        return $.apply(j, arguments);
      });
    }, "2cf4": function(F, G, o) {
      var j, z, $, m, v = o("da84"), u = o("2ba4"), S = o("0366"), g = o("1626"), w = o("1a2d"), a = o("d039"), f = o("1be4"), y = o("f36a"), l = o("cc12"), c = o("1cdc"), s = o("605d"), b = v.setImmediate, h = v.clearImmediate, k = v.process, d = v.Dispatch, O = v.Function, M = v.MessageChannel, L = v.String, x = 0, T = {}, N = "onreadystatechange";
      try {
        j = v.location;
      } catch {
      }
      var Y = function(wt) {
        if (w(T, wt)) {
          var Nt = T[wt];
          delete T[wt], Nt();
        }
      }, ot = function(wt) {
        return function() {
          Y(wt);
        };
      }, at = function(wt) {
        Y(wt.data);
      }, St = function(wt) {
        v.postMessage(L(wt), j.protocol + "//" + j.host);
      };
      b && h || (b = function(wt) {
        var Nt = y(arguments, 1);
        return T[++x] = function() {
          u(g(wt) ? wt : O(wt), void 0, Nt);
        }, z(x), x;
      }, h = function(wt) {
        delete T[wt];
      }, s ? z = function(wt) {
        k.nextTick(ot(wt));
      } : d && d.now ? z = function(wt) {
        d.now(ot(wt));
      } : M && !c ? ($ = new M(), m = $.port2, $.port1.onmessage = at, z = S(m.postMessage, m)) : v.addEventListener && g(v.postMessage) && !v.importScripts && j && j.protocol !== "file:" && !a(St) ? (z = St, v.addEventListener("message", at, !1)) : z = N in l("script") ? function(wt) {
        f.appendChild(l("script"))[N] = function() {
          f.removeChild(this), Y(wt);
        };
      } : function(wt) {
        setTimeout(ot(wt), 0);
      }), F.exports = { set: b, clear: h };
    }, "2d00": function(F, G, o) {
      var j, z, $ = o("da84"), m = o("342f"), v = $.process, u = $.Deno, S = v && v.versions || u && u.version, g = S && S.v8;
      g && (j = g.split("."), z = j[0] > 0 && j[0] < 4 ? 1 : +(j[0] + j[1])), !z && m && (j = m.match(/Edge\/(\d+)/), (!j || j[1] >= 74) && (j = m.match(/Chrome\/(\d+)/), j && (z = +j[1]))), F.exports = z;
    }, "342f": function(F, G, o) {
      var j = o("d066");
      F.exports = j("navigator", "userAgent") || "";
    }, "35a1": function(F, G, o) {
      var j = o("f5df"), z = o("dc4a"), $ = o("3f8c"), m = o("b622"), v = m("iterator");
      F.exports = function(u) {
        if (u != null)
          return z(u, v) || z(u, "@@iterator") || $[j(u)];
      };
    }, "37e8": function(F, G, o) {
      var j = o("83ab"), z = o("aed9"), $ = o("9bf2"), m = o("825a"), v = o("fc6a"), u = o("df75");
      G.f = j && !z ? Object.defineProperties : function(S, g) {
        m(S);
        for (var w, a = v(g), f = u(g), y = f.length, l = 0; y > l; )
          $.f(S, w = f[l++], a[w]);
        return S;
      };
    }, "3a9b": function(F, G, o) {
      var j = o("e330");
      F.exports = j({}.isPrototypeOf);
    }, "3bbe": function(F, G, o) {
      var j = o("da84"), z = o("1626"), $ = j.String, m = j.TypeError;
      F.exports = function(v) {
        if (typeof v == "object" || z(v))
          return v;
        throw m("Can't set " + $(v) + " as a prototype");
      };
    }, "3ca3": function(F, G, o) {
      var j = o("6547").charAt, z = o("577e"), $ = o("69f3"), m = o("7dd0"), v = "String Iterator", u = $.set, S = $.getterFor(v);
      m(String, "String", function(g) {
        u(this, { type: v, string: z(g), index: 0 });
      }, function() {
        var g, w = S(this), a = w.string, f = w.index;
        return f >= a.length ? { value: void 0, done: !0 } : (g = j(a, f), w.index += g.length, { value: g, done: !1 });
      });
    }, "3f8c": function(F, G) {
      F.exports = {};
    }, "408a": function(F, G, o) {
      var j = o("e330");
      F.exports = j(1 .valueOf);
    }, "428f": function(F, G, o) {
      var j = o("da84");
      F.exports = j;
    }, "44ad": function(F, G, o) {
      var j = o("da84"), z = o("e330"), $ = o("d039"), m = o("c6b6"), v = j.Object, u = z("".split);
      F.exports = $(function() {
        return !v("z").propertyIsEnumerable(0);
      }) ? function(S) {
        return m(S) == "String" ? u(S, "") : v(S);
      } : v;
    }, "44d2": function(F, G, o) {
      var j = o("b622"), z = o("7c73"), $ = o("9bf2"), m = j("unscopables"), v = Array.prototype;
      v[m] == null && $.f(v, m, { configurable: !0, value: z(null) }), F.exports = function(u) {
        v[m][u] = !0;
      };
    }, "44de": function(F, G, o) {
      var j = o("da84");
      F.exports = function(z, $) {
        var m = j.console;
        m && m.error && (arguments.length == 1 ? m.error(z) : m.error(z, $));
      };
    }, "466d": function(F, G, o) {
      var j = o("c65b"), z = o("d784"), $ = o("825a"), m = o("50c4"), v = o("577e"), u = o("1d80"), S = o("dc4a"), g = o("8aa5"), w = o("14c3");
      z("match", function(a, f, y) {
        return [function(l) {
          var c = u(this), s = l == null ? void 0 : S(l, a);
          return s ? j(s, l, c) : new RegExp(l)[a](v(c));
        }, function(l) {
          var c = $(this), s = v(l), b = y(f, c, s);
          if (b.done)
            return b.value;
          if (!c.global)
            return w(c, s);
          var h = c.unicode;
          c.lastIndex = 0;
          for (var k, d = [], O = 0; (k = w(c, s)) !== null; ) {
            var M = v(k[0]);
            d[O] = M, M === "" && (c.lastIndex = g(s, m(c.lastIndex), h)), O++;
          }
          return O === 0 ? null : d;
        }];
      });
    }, 4840: function(F, G, o) {
      var j = o("825a"), z = o("5087"), $ = o("b622"), m = $("species");
      F.exports = function(v, u) {
        var S, g = j(v).constructor;
        return g === void 0 || (S = j(g)[m]) == null ? u : z(S);
      };
    }, "485a": function(F, G, o) {
      var j = o("da84"), z = o("c65b"), $ = o("1626"), m = o("861d"), v = j.TypeError;
      F.exports = function(u, S) {
        var g, w;
        if (S === "string" && $(g = u.toString) && !m(w = z(g, u)) || $(g = u.valueOf) && !m(w = z(g, u)) || S !== "string" && $(g = u.toString) && !m(w = z(g, u)))
          return w;
        throw v("Can't convert object to primitive value");
      };
    }, 4930: function(F, G, o) {
      var j = o("2d00"), z = o("d039");
      F.exports = !!Object.getOwnPropertySymbols && !z(function() {
        var $ = Symbol();
        return !String($) || !(Object($) instanceof Symbol) || !Symbol.sham && j && j < 41;
      });
    }, "499e": function(F, G, o) {
      function j(d, O) {
        for (var M = [], L = {}, x = 0; x < O.length; x++) {
          var T = O[x], N = T[0], Y = T[1], ot = T[2], at = T[3], St = { id: d + ":" + x, css: Y, media: ot, sourceMap: at };
          L[N] ? L[N].parts.push(St) : M.push(L[N] = { id: N, parts: [St] });
        }
        return M;
      }
      o.r(G), o.d(G, "default", function() {
        return y;
      });
      var z = typeof document < "u";
      if (typeof DEBUG < "u" && DEBUG && !z)
        throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
      var $ = {}, m = z && (document.head || document.getElementsByTagName("head")[0]), v = null, u = 0, S = !1, g = function() {
      }, w = null, a = "data-vue-ssr-id", f = typeof navigator < "u" && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
      function y(d, O, M, L) {
        S = M, w = L || {};
        var x = j(d, O);
        return l(x), function(T) {
          for (var N = [], Y = 0; Y < x.length; Y++) {
            var ot = x[Y], at = $[ot.id];
            at.refs--, N.push(at);
          }
          for (T ? (x = j(d, T), l(x)) : x = [], Y = 0; Y < N.length; Y++)
            if (at = N[Y], at.refs === 0) {
              for (var St = 0; St < at.parts.length; St++)
                at.parts[St]();
              delete $[at.id];
            }
        };
      }
      function l(d) {
        for (var O = 0; O < d.length; O++) {
          var M = d[O], L = $[M.id];
          if (L) {
            L.refs++;
            for (var x = 0; x < L.parts.length; x++)
              L.parts[x](M.parts[x]);
            for (; x < M.parts.length; x++)
              L.parts.push(s(M.parts[x]));
            L.parts.length > M.parts.length && (L.parts.length = M.parts.length);
          } else {
            var T = [];
            for (x = 0; x < M.parts.length; x++)
              T.push(s(M.parts[x]));
            $[M.id] = { id: M.id, refs: 1, parts: T };
          }
        }
      }
      function c() {
        var d = document.createElement("style");
        return d.type = "text/css", m.appendChild(d), d;
      }
      function s(d) {
        var O, M, L = document.querySelector("style[" + a + '~="' + d.id + '"]');
        if (L) {
          if (S)
            return g;
          L.parentNode.removeChild(L);
        }
        if (f) {
          var x = u++;
          L = v || (v = c()), O = h.bind(null, L, x, !1), M = h.bind(null, L, x, !0);
        } else
          L = c(), O = k.bind(null, L), M = function() {
            L.parentNode.removeChild(L);
          };
        return O(d), function(T) {
          if (T) {
            if (T.css === d.css && T.media === d.media && T.sourceMap === d.sourceMap)
              return;
            O(d = T);
          } else
            M();
        };
      }
      var b = function() {
        var d = [];
        return function(O, M) {
          return d[O] = M, d.filter(Boolean).join(`
`);
        };
      }();
      function h(d, O, M, L) {
        var x = M ? "" : L.css;
        if (d.styleSheet)
          d.styleSheet.cssText = b(O, x);
        else {
          var T = document.createTextNode(x), N = d.childNodes;
          N[O] && d.removeChild(N[O]), N.length ? d.insertBefore(T, N[O]) : d.appendChild(T);
        }
      }
      function k(d, O) {
        var M = O.css, L = O.media, x = O.sourceMap;
        if (L && d.setAttribute("media", L), w.ssrId && d.setAttribute(a, O.id), x && (M += `
/*# sourceURL=` + x.sources[0] + " */", M += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(x)))) + " */"), d.styleSheet)
          d.styleSheet.cssText = M;
        else {
          for (; d.firstChild; )
            d.removeChild(d.firstChild);
          d.appendChild(document.createTextNode(M));
        }
      }
    }, "49f8": function(F, G, o) {
      var j = { "./de.json": "6ce2", "./en.json": "edd4", "./es.json": "a306", "./fr.json": "f693", "./it.json": "0825", "./nl.json": "a625", "./pl.json": "89b2", "./pt.json": "5d67", "./ro.json": "9542", "./ru.json": "7704" };
      function z(m) {
        var v = $(m);
        return o(v);
      }
      function $(m) {
        if (!o.o(j, m)) {
          var v = new Error("Cannot find module '" + m + "'");
          throw v.code = "MODULE_NOT_FOUND", v;
        }
        return j[m];
      }
      z.keys = function() {
        return Object.keys(j);
      }, z.resolve = $, F.exports = z, z.id = "49f8";
    }, "4d64": function(F, G, o) {
      var j = o("fc6a"), z = o("23cb"), $ = o("07fa"), m = function(v) {
        return function(u, S, g) {
          var w, a = j(u), f = $(a), y = z(g, f);
          if (v && S != S) {
            for (; f > y; )
              if (w = a[y++], w != w)
                return !0;
          } else
            for (; f > y; y++)
              if ((v || y in a) && a[y] === S)
                return v || y || 0;
          return !v && -1;
        };
      };
      F.exports = { includes: m(!0), indexOf: m(!1) };
    }, "4dae": function(F, G, o) {
      var j = o("da84"), z = o("23cb"), $ = o("07fa"), m = o("8418"), v = j.Array, u = Math.max;
      F.exports = function(S, g, w) {
        for (var a = $(S), f = z(g, a), y = z(w === void 0 ? a : w, a), l = v(u(y - f, 0)), c = 0; f < y; f++, c++)
          m(l, c, S[f]);
        return l.length = c, l;
      };
    }, "4de4": function(F, G, o) {
      var j = o("23e7"), z = o("b727").filter, $ = o("1dde"), m = $("filter");
      j({ target: "Array", proto: !0, forced: !m }, { filter: function(v) {
        return z(this, v, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, "4df4": function(F, G, o) {
      var j = o("da84"), z = o("0366"), $ = o("c65b"), m = o("7b0b"), v = o("9bdd"), u = o("e95a"), S = o("68ee"), g = o("07fa"), w = o("8418"), a = o("9a1f"), f = o("35a1"), y = j.Array;
      F.exports = function(l) {
        var c = m(l), s = S(this), b = arguments.length, h = b > 1 ? arguments[1] : void 0, k = h !== void 0;
        k && (h = z(h, b > 2 ? arguments[2] : void 0));
        var d, O, M, L, x, T, N = f(c), Y = 0;
        if (!N || this == y && u(N))
          for (d = g(c), O = s ? new this(d) : y(d); d > Y; Y++)
            T = k ? h(c[Y], Y) : c[Y], w(O, Y, T);
        else
          for (L = a(c, N), x = L.next, O = s ? new this() : []; !(M = $(x, L)).done; Y++)
            T = k ? v(L, h, [M.value, Y], !0) : M.value, w(O, Y, T);
        return O.length = Y, O;
      };
    }, 5087: function(F, G, o) {
      var j = o("da84"), z = o("68ee"), $ = o("0d51"), m = j.TypeError;
      F.exports = function(v) {
        if (z(v))
          return v;
        throw m($(v) + " is not a constructor");
      };
    }, "50c4": function(F, G, o) {
      var j = o("5926"), z = Math.min;
      F.exports = function($) {
        return $ > 0 ? z(j($), 9007199254740991) : 0;
      };
    }, 5692: function(F, G, o) {
      var j = o("c430"), z = o("c6cd");
      (F.exports = function($, m) {
        return z[$] || (z[$] = m !== void 0 ? m : {});
      })("versions", []).push({ version: "3.20.2", mode: j ? "pure" : "global", copyright: "\xA9 2022 Denis Pushkarev (zloirock.ru)" });
    }, "56ef": function(F, G, o) {
      var j = o("d066"), z = o("e330"), $ = o("241c"), m = o("7418"), v = o("825a"), u = z([].concat);
      F.exports = j("Reflect", "ownKeys") || function(S) {
        var g = $.f(v(S)), w = m.f;
        return w ? u(g, w(S)) : g;
      };
    }, 5757: function(F, G) {
      function o(j, z, $) {
        return z in j ? Object.defineProperty(j, z, { value: $, enumerable: !0, configurable: !0, writable: !0 }) : j[z] = $, j;
      }
      F.exports = o, F.exports.__esModule = !0, F.exports.default = F.exports;
    }, "577e": function(F, G, o) {
      var j = o("da84"), z = o("f5df"), $ = j.String;
      F.exports = function(m) {
        if (z(m) === "Symbol")
          throw TypeError("Cannot convert a Symbol value to a string");
        return $(m);
      };
    }, 5899: function(F, G) {
      F.exports = `	
\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF`;
    }, "58a8": function(F, G, o) {
      var j = o("e330"), z = o("1d80"), $ = o("577e"), m = o("5899"), v = j("".replace), u = "[" + m + "]", S = RegExp("^" + u + u + "*"), g = RegExp(u + u + "*$"), w = function(a) {
        return function(f) {
          var y = $(z(f));
          return 1 & a && (y = v(y, S, "")), 2 & a && (y = v(y, g, "")), y;
        };
      };
      F.exports = { start: w(1), end: w(2), trim: w(3) };
    }, 5926: function(F, G) {
      var o = Math.ceil, j = Math.floor;
      F.exports = function(z) {
        var $ = +z;
        return $ !== $ || $ === 0 ? 0 : ($ > 0 ? j : o)($);
      };
    }, "59ed": function(F, G, o) {
      var j = o("da84"), z = o("1626"), $ = o("0d51"), m = j.TypeError;
      F.exports = function(v) {
        if (z(v))
          return v;
        throw m($(v) + " is not a function");
      };
    }, "5c6c": function(F, G) {
      F.exports = function(o, j) {
        return { enumerable: !(1 & o), configurable: !(2 & o), writable: !(4 & o), value: j };
      };
    }, "5d67": function(F) {
      F.exports = JSON.parse('{"psaccounts":{"accountManager":{"errorInstallEnable":"Ocorreu um erro, por favor tente novamente."},"alert":{"ps_accounts":{"enable":{"title":"Ativar o m\xF3dulo PrestaShop Account","message":"O m\xF3dulo PrestaShop Account \xE9 necess\xE1rio para continuar a configura\xE7\xE3o deste m\xF3dulo.","action":"Ativar","loading":"Ativa\xE7\xE3o do m\xF3dulo PrestaShop Account em curso..."},"install":{"title":"Ativar o m\xF3dulo PrestaShop Account","message":"O m\xF3dulo PrestaShop Account \xE9 necess\xE1rio para continuar a configura\xE7\xE3o deste m\xF3dulo.","action":"Instalar","loading":"Instala\xE7\xE3o do m\xF3dulo PrestaShop Account em curso..."},"update":{"title":"Atualizar m\xF3dulo de contas PrestaShop","message":"Uma nova vers\xE3o das contas PrestaShop est\xE1 dispon\xEDvel, atualize o m\xF3dulo para continuar usando os servi\xE7os","action":"Atualizar","loading":"O m\xF3dulo Conta PrestaShop est\xE1 actualmente a ser actualizado..."}},"ps_eventbus":{"enable":{"title":"Activar o m\xF3dulo PrestaShop Event Bus","message":"\xC9 necess\xE1rio o m\xF3dulo PrestaShop Event Bus para continuar a configurar este m\xF3dulo.","action":"Ativar","loading":"O m\xF3dulo PrestaShop Event Bus est\xE1 actualmente a ser activado..."},"install":{"title":"Ativar o m\xF3dulo Prestashop Event Bus","message":"O m\xF3dulo Prestashop Event Bus \xE9 necess\xE1rio para continuar a configura\xE7\xE3o deste m\xF3dulo.","action":"Instalar","loading":"Instala\xE7\xE3o do m\xF3dulo Prestashop Event Bus em curso..."}}},"alertShopDomainShouldExists":{"title":"URL da loja n\xE3o preenchida!","message":"Somente lojas com um URL atribu\xEDdo podem ser associadas a uma conta PrestaShop.<br />As seguintes lojas n\xE3o t\xEAm uma URL atribu\xEDda: "},"account":{"title":"Associar a sua loja a uma conta PrestaShop | Associar a sua loja a uma conta PrestaShop","authorize":"Apenas pode associar a sua loja a uma conta. Escolha bem!","authorized":"A sua loja est\xE1 associada \xE0 conta da PrestaShop: | A sua loja est\xE1 associada \xE0 conta da PrestaShop:","authorizedPartially":"As suas lojas est\xE3o parcialmente associadas a uma conta PrestaShop","authorizedSeveral":"As suas lojas est\xE3o associadas a v\xE1rias contas PrestaShop","connectButton":"Associada","reonboardButton":"Reassociate","disconnectButton":"Usar outra conta","moduleUpdateInformation":"<strong>Nova actualiza\xE7\xE3o:</strong> pode gerir as suas lojas associadas.<br /> Por favor, volte a participar usando o <strong>mesmo endere\xE7o de correio electr\xF3nico</strong> para tirar partido desta actualiza\xE7\xE3o.<br /> Outras actualiza\xE7\xF5es de m\xF3dulos podem estar dispon\xEDveis em Module Manager, separador Updates.","emailNotVerified":{"title":"Foi enviado um e-mail de confirma\xE7\xE3o.","description":"Verifique a sua caixa de entrada e clique no link para activar a sua conta."},"sendEmail":"Reenviar","needToBeAdmin":"Para continuar, dever\xE1 ser um administrador da loja.","pleaseContact":"Por favor entre em contacto","manageAccountButton":"Ver as minhas lojas associadas","unlinkButton":"Desassociar"}}}');
    }, "5daa": function(F, G, o) {
      var j = o("12c0").default, z = o("f3e1").default, $ = ["class", "staticClass", "style", "staticStyle", "attrs"];
      o("cca6"), o("99af"), F.exports = { functional: !0, render: function(m, v) {
        var u = v._c, S = (v._v, v.data), g = v.children, w = g === void 0 ? [] : g, a = S.class, f = S.staticClass, y = S.style, l = S.staticStyle, c = S.attrs, s = c === void 0 ? {} : c, b = z(S, $);
        return u("svg", j({ class: [a, f], style: [y, l], attrs: Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" }, s) }, b), w.concat([u("path", { attrs: { d: "M0 0h24v24H0z", fill: "none" } }), u("path", { attrs: { d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" } })]));
      } };
    }, "5e77": function(F, G, o) {
      var j = o("83ab"), z = o("1a2d"), $ = Function.prototype, m = j && Object.getOwnPropertyDescriptor, v = z($, "name"), u = v && function() {
      }.name === "something", S = v && (!j || j && m($, "name").configurable);
      F.exports = { EXISTS: v, PROPER: u, CONFIGURABLE: S };
    }, "605d": function(F, G, o) {
      var j = o("c6b6"), z = o("da84");
      F.exports = j(z.process) == "process";
    }, 6069: function(F, G) {
      F.exports = typeof window == "object";
    }, "60da": function(F, G, o) {
      var j = o("83ab"), z = o("e330"), $ = o("c65b"), m = o("d039"), v = o("df75"), u = o("7418"), S = o("d1e7"), g = o("7b0b"), w = o("44ad"), a = Object.assign, f = Object.defineProperty, y = z([].concat);
      F.exports = !a || m(function() {
        if (j && a({ b: 1 }, a(f({}, "a", { enumerable: !0, get: function() {
          f(this, "b", { value: 3, enumerable: !1 });
        } }), { b: 2 })).b !== 1)
          return !0;
        var l = {}, c = {}, s = Symbol(), b = "abcdefghijklmnopqrst";
        return l[s] = 7, b.split("").forEach(function(h) {
          c[h] = h;
        }), a({}, l)[s] != 7 || v(a({}, c)).join("") != b;
      }) ? function(l, c) {
        for (var s = g(l), b = arguments.length, h = 1, k = u.f, d = S.f; b > h; )
          for (var O, M = w(arguments[h++]), L = k ? y(v(M), k(M)) : v(M), x = L.length, T = 0; x > T; )
            O = L[T++], j && !$(d, M, O) || (s[O] = M[O]);
        return s;
      } : a;
    }, "63f5": function(F, G, o) {
      o("bf9f");
    }, 6547: function(F, G, o) {
      var j = o("e330"), z = o("5926"), $ = o("577e"), m = o("1d80"), v = j("".charAt), u = j("".charCodeAt), S = j("".slice), g = function(w) {
        return function(a, f) {
          var y, l, c = $(m(a)), s = z(f), b = c.length;
          return s < 0 || s >= b ? w ? "" : void 0 : (y = u(c, s), y < 55296 || y > 56319 || s + 1 === b || (l = u(c, s + 1)) < 56320 || l > 57343 ? w ? v(c, s) : y : w ? S(c, s, s + 2) : l - 56320 + (y - 55296 << 10) + 65536);
        };
      };
      F.exports = { codeAt: g(!1), charAt: g(!0) };
    }, "65f0": function(F, G, o) {
      var j = o("0b42");
      F.exports = function(z, $) {
        return new (j(z))($ === 0 ? 0 : $);
      };
    }, "68ee": function(F, G, o) {
      var j = o("e330"), z = o("d039"), $ = o("1626"), m = o("f5df"), v = o("d066"), u = o("8925"), S = function() {
      }, g = [], w = v("Reflect", "construct"), a = /^\s*(?:class|function)\b/, f = j(a.exec), y = !a.exec(S), l = function(s) {
        if (!$(s))
          return !1;
        try {
          return w(S, g, s), !0;
        } catch {
          return !1;
        }
      }, c = function(s) {
        if (!$(s))
          return !1;
        switch (m(s)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return !1;
        }
        try {
          return y || !!f(a, u(s));
        } catch {
          return !0;
        }
      };
      c.sham = !0, F.exports = !w || z(function() {
        var s;
        return l(l.call) || !l(Object) || !l(function() {
          s = !0;
        }) || s;
      }) ? c : l;
    }, "69f3": function(F, G, o) {
      var j, z, $, m = o("7f9a"), v = o("da84"), u = o("e330"), S = o("861d"), g = o("9112"), w = o("1a2d"), a = o("c6cd"), f = o("f772"), y = o("d012"), l = "Object already initialized", c = v.TypeError, s = v.WeakMap, b = function(x) {
        return $(x) ? z(x) : j(x, {});
      }, h = function(x) {
        return function(T) {
          var N;
          if (!S(T) || (N = z(T)).type !== x)
            throw c("Incompatible receiver, " + x + " required");
          return N;
        };
      };
      if (m || a.state) {
        var k = a.state || (a.state = new s()), d = u(k.get), O = u(k.has), M = u(k.set);
        j = function(x, T) {
          if (O(k, x))
            throw new c(l);
          return T.facade = x, M(k, x, T), T;
        }, z = function(x) {
          return d(k, x) || {};
        }, $ = function(x) {
          return O(k, x);
        };
      } else {
        var L = f("state");
        y[L] = !0, j = function(x, T) {
          if (w(x, L))
            throw new c(l);
          return T.facade = x, g(x, L, T), T;
        }, z = function(x) {
          return w(x, L) ? x[L] : {};
        }, $ = function(x) {
          return w(x, L);
        };
      }
      F.exports = { set: j, get: z, has: $, enforce: b, getterFor: h };
    }, "6ce2": function(F) {
      F.exports = JSON.parse('{"psaccounts":{"accountManager":{"errorInstallEnable":"Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."},"alert":{"ps_accounts":{"enable":{"title":"Aktivieren Sie das Modul PrestaShop Account","message":"Das Modul PrestaShop account ist notwendig, um die Konfiguration dieses Moduls fortzusetzen.","action":"Aktivator","loading":"Aktivierung des Moduls PrestaShop Account in Arbeit..."},"install":{"title":"Installieren Sie das Modul PrestaShop Account","message":"Das Modul PrestaShop account ist notwendig, um die Konfiguration dieses Moduls fortzusetzen.","action":"Installationsprogramm","loading":"Installation des Moduls PrestaShop Account in Arbeit..."},"update":{"title":"PrestaShop-Kontenmodul aktualisieren","message":"Eine neue Version von PrestaShop-Konten ist verf\xFCgbar. Bitte aktualisieren Sie das Modul, um die Dienste weiterhin nutzen zu k\xF6nnen","action":"Aktualisieren","loading":"Das PrestaShop Account-Modul wird derzeit aktualisiert..."}},"ps_eventbus":{"enable":{"title":"Aktivieren Sie das PrestaShop Event Bus Modul","message":"Sie ben\xF6tigen das PrestaShop Event Bus-Modul, um dieses Modul weiter einzurichten.","action":"Aktivator","loading":"Das PrestaShop Event Bus Modul wird gerade aktiviert..."},"install":{"title":"Installieren Sie das Modul Prestashop Event Bus","message":"Das Modul Prestashop Event Bus ist notwendig, um die Konfiguration dieses Moduls fortzusetzen.","action":"Installationsprogramm","loading":"Installation des Moduls Prestashop Event Bus in Arbeit..."}}},"alertShopDomainShouldExists":{"title":"Shop URL nicht ausgef\xFCllt!","message":"Nur Shops mit einer zugewiesenen URL k\xF6nnen mit einem PrestaShop-Konto verkn\xFCpft werden.<br />Die folgenden Shops haben keine zugewiesene URL: "},"account":{"title":"Verbinden Sie Ihren Shop mit einem PrestaShop-Konto | Verbinden Sie Ihre Shops mit einem PrestaShop-Konto","authorize":"Sie k\xF6nnen Ihren Shop nur mit einem Konto verkn\xFCpfen. W\xE4hlen Sie das richtige Konto!","authorized":"Ihr Shop ist mit dem PrestaShop-Konto verbunden: | Ihr Shop ist mit dem PrestaShop-Konto verkn\xFCpft:","authorizedPartially":"Ihre Shops sind teilweise mit einem PrestaShop-Konto verbunden","authorizedSeveral":"Ihre Shops sind mit mehreren PrestaShop-Konten verbunden","connectButton":"Verkn\xFCpfen","reonboardButton":"Neu zuordnen","disconnectButton":"Benutze ein anderes Konto","moduleUpdateInformation":"<strong>Neues Update:</strong> Sie k\xF6nnen Ihre zugeordneten Shops verwalten.<br /> Bitte melden Sie sich mit <strong>der gleichen E-Mail-Adresse erneut an,</strong> um von diesem Update zu profitieren.<br /> Andere Modul-Updates sind m\xF6glicherweise auf der Registerkarte \\"Updates\\" des Modul-Managers verf\xFCgbar.","emailNotVerified":{"title":"Eine Best\xE4tigungs-E-Mail wurde verschickt.","description":"Pr\xFCfen Sie Ihren Posteingang und klicken Sie auf den Link, um Ihr Konto zu aktivieren."},"sendEmail":"Erneut senden","needToBeAdmin":"Um fortzufahren, m\xFCssen Sie Administrator des Gesch\xE4fts sein","pleaseContact":"Vielen Dank f\xFCr den Kontakt","manageAccountButton":"Meine zugeh\xF6rigen Shops anzeigen","unlinkButton":"Entkoppeln"}}}');
    }, "6ce8": function(F, G, o) {
      var j = o("201a");
      j.__esModule && (j = j.default), typeof j == "string" && (j = [[F.i, j, ""]]), j.locals && (F.exports = j.locals);
      var z = o("499e").default;
      z("67fc70f8", j, !0, { sourceMap: !1, shadowMode: !1 });
    }, "6eeb": function(F, G, o) {
      var j = o("da84"), z = o("1626"), $ = o("1a2d"), m = o("9112"), v = o("ce4e"), u = o("8925"), S = o("69f3"), g = o("5e77").CONFIGURABLE, w = S.get, a = S.enforce, f = String(String).split("String");
      (F.exports = function(y, l, c, s) {
        var b, h = !!s && !!s.unsafe, k = !!s && !!s.enumerable, d = !!s && !!s.noTargetGet, O = s && s.name !== void 0 ? s.name : l;
        z(c) && (String(O).slice(0, 7) === "Symbol(" && (O = "[" + String(O).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), (!$(c, "name") || g && c.name !== O) && m(c, "name", O), b = a(c), b.source || (b.source = f.join(typeof O == "string" ? O : ""))), y !== j ? (h ? !d && y[l] && (k = !0) : delete y[l], k ? y[l] = c : m(y, l, c)) : k ? y[l] = c : v(l, c);
      })(Function.prototype, "toString", function() {
        return z(this) && w(this).source || u(this);
      });
    }, 7156: function(F, G, o) {
      var j = o("1626"), z = o("861d"), $ = o("d2bb");
      F.exports = function(m, v, u) {
        var S, g;
        return $ && j(S = v.constructor) && S !== u && z(g = S.prototype) && g !== u.prototype && $(m, g), m;
      };
    }, 7418: function(F, G) {
      G.f = Object.getOwnPropertySymbols;
    }, "746f": function(F, G, o) {
      var j = o("428f"), z = o("1a2d"), $ = o("e538"), m = o("9bf2").f;
      F.exports = function(v) {
        var u = j.Symbol || (j.Symbol = {});
        z(u, v) || m(u, v, { value: $.f(v) });
      };
    }, 7704: function(F) {
      F.exports = JSON.parse(`{"psaccounts":{"accountManager":{"errorInstallEnable":"Something went wrong. Please try again."},"alert":{"ps_accounts":{"enable":{"title":"Activate the PrestaShop Account module","message":"You need the PrestaShop account module to continue setting up this module.","action":"Activate","loading":"The PrestaShop Account module is currently being activated..."},"install":{"title":"Install the PrestaShop Account module","message":"You need the PrestaShop account module to continue setting up this module.","action":"Install","loading":"The PrestaShop Account module is currently being installed..."},"update":{"title":"Update PrestaShop Accounts module","message":"A new version of PrestaShop Accounts is available, please update the module to continue using the services","action":"Update","loading":"The PrestaShop Account module is currently being updated..."}},"ps_eventbus":{"enable":{"title":"Activate the PrestaShop Event Bus module","message":"You need the PrestaShop Event Bus module to continue setting up this module.","action":"Activate","loading":"The PrestaShop Event Bus module is currently being activated..."},"install":{"title":"Install the Prestashop Event Bus module","message":"You need the Prestashop Event Bus module to continue setting up this module.","action":"Install","loading":"The Prestashop Event Bus module is currently being installed..."}}},"alertShopDomainShouldExists":{"title":"Shop URL not filled in!","message":"Only shop with an assigned URL can be associated to a PrestaShop account.<br />The following shops don't have an assigned URL: "},"account":{"title":"Associate your shop with a PrestaShop account | Associate your shops with a PrestaShop account","authorize":"You can only associate your shop with one account. So be sure to choose the right one!","authorized":"Your shop is associated with the PrestaShop account: | Your shops is associated with the PrestaShop account:","authorizedPartially":"Your shops are partially associated with a PrestaShop Account","authorizedSeveral":"Your shops are associated with several PrestaShop account","connectButton":"Associate","reonboardButton":"Re-associate","disconnectButton":"Use another account","moduleUpdateInformation":"<strong>New update:</strong> you can manage your associated shops.<br /> Please reassociate yourself using <strong>the same email address</strong> to benefit from this update.<br /> Other module updates may be available in the Updates tab of the module manager.","emailNotVerified":{"title":"A confirmation email has been sent.","description":"Check your inbox and click on the link to activate your account."},"sendEmail":"Send it again","needToBeAdmin":"In order to proceed you need to be administrator of the shop","pleaseContact":"Please contact","manageAccountButton":"View my associated shops","unlinkButton":"Dissociate"}}}`);
    }, 7839: function(F, G) {
      F.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }, "785a": function(F, G, o) {
      var j = o("cc12"), z = j("span").classList, $ = z && z.constructor && z.constructor.prototype;
      F.exports = $ === Object.prototype ? void 0 : $;
    }, "7b0b": function(F, G, o) {
      var j = o("da84"), z = o("1d80"), $ = j.Object;
      F.exports = function(m) {
        return $(z(m));
      };
    }, "7c73": function(F, G, o) {
      var j, z = o("825a"), $ = o("37e8"), m = o("7839"), v = o("d012"), u = o("1be4"), S = o("cc12"), g = o("f772"), w = ">", a = "<", f = "prototype", y = "script", l = g("IE_PROTO"), c = function() {
      }, s = function(d) {
        return a + y + w + d + a + "/" + y + w;
      }, b = function(d) {
        d.write(s("")), d.close();
        var O = d.parentWindow.Object;
        return d = null, O;
      }, h = function() {
        var d, O = S("iframe"), M = "java" + y + ":";
        return O.style.display = "none", u.appendChild(O), O.src = String(M), d = O.contentWindow.document, d.open(), d.write(s("document.F=Object")), d.close(), d.F;
      }, k = function() {
        try {
          j = new ActiveXObject("htmlfile");
        } catch {
        }
        k = typeof document < "u" ? document.domain && j ? b(j) : h() : b(j);
        for (var d = m.length; d--; )
          delete k[f][m[d]];
        return k();
      };
      v[l] = !0, F.exports = Object.create || function(d, O) {
        var M;
        return d !== null ? (c[f] = z(d), M = new c(), c[f] = null, M[l] = d) : M = k(), O === void 0 ? M : $.f(M, O);
      };
    }, "7db0": function(F, G, o) {
      var j = o("23e7"), z = o("b727").find, $ = o("44d2"), m = "find", v = !0;
      m in [] && Array(1)[m](function() {
        v = !1;
      }), j({ target: "Array", proto: !0, forced: v }, { find: function(u) {
        return z(this, u, arguments.length > 1 ? arguments[1] : void 0);
      } }), $(m);
    }, "7dd0": function(F, G, o) {
      var j = o("23e7"), z = o("c65b"), $ = o("c430"), m = o("5e77"), v = o("1626"), u = o("9ed3"), S = o("e163"), g = o("d2bb"), w = o("d44e"), a = o("9112"), f = o("6eeb"), y = o("b622"), l = o("3f8c"), c = o("ae93"), s = m.PROPER, b = m.CONFIGURABLE, h = c.IteratorPrototype, k = c.BUGGY_SAFARI_ITERATORS, d = y("iterator"), O = "keys", M = "values", L = "entries", x = function() {
        return this;
      };
      F.exports = function(T, N, Y, ot, at, St, wt) {
        u(Y, N, ot);
        var Nt, It, xe, mt = function(ye) {
          if (ye === at && Yt)
            return Yt;
          if (!k && ye in Mt)
            return Mt[ye];
          switch (ye) {
            case O:
              return function() {
                return new Y(this, ye);
              };
            case M:
              return function() {
                return new Y(this, ye);
              };
            case L:
              return function() {
                return new Y(this, ye);
              };
          }
          return function() {
            return new Y(this);
          };
        }, pt = N + " Iterator", Et = !1, Mt = T.prototype, xt = Mt[d] || Mt["@@iterator"] || at && Mt[at], Yt = !k && xt || mt(at), ce = N == "Array" && Mt.entries || xt;
        if (ce && (Nt = S(ce.call(new T())), Nt !== Object.prototype && Nt.next && ($ || S(Nt) === h || (g ? g(Nt, h) : v(Nt[d]) || f(Nt, d, x)), w(Nt, pt, !0, !0), $ && (l[pt] = x))), s && at == M && xt && xt.name !== M && (!$ && b ? a(Mt, "name", M) : (Et = !0, Yt = function() {
          return z(xt, this);
        })), at)
          if (It = { values: mt(M), keys: St ? Yt : mt(O), entries: mt(L) }, wt)
            for (xe in It)
              (k || Et || !(xe in Mt)) && f(Mt, xe, It[xe]);
          else
            j({ target: N, proto: !0, forced: k || Et }, It);
        return $ && !wt || Mt[d] === Yt || f(Mt, d, Yt, { name: at }), l[N] = Yt, It;
      };
    }, "7f9a": function(F, G, o) {
      var j = o("da84"), z = o("1626"), $ = o("8925"), m = j.WeakMap;
      F.exports = z(m) && /native code/.test($(m));
    }, "825a": function(F, G, o) {
      var j = o("da84"), z = o("861d"), $ = j.String, m = j.TypeError;
      F.exports = function(v) {
        if (z(v))
          return v;
        throw m($(v) + " is not an object");
      };
    }, "83ab": function(F, G, o) {
      var j = o("d039");
      F.exports = !j(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] != 7;
      });
    }, 8418: function(F, G, o) {
      var j = o("a04b"), z = o("9bf2"), $ = o("5c6c");
      F.exports = function(m, v, u) {
        var S = j(v);
        S in m ? z.f(m, S, $(0, u)) : m[S] = u;
      };
    }, "845c": function(F, G, o) {
      var j = o("12c0").default, z = o("f3e1").default, $ = ["class", "staticClass", "style", "staticStyle", "attrs"];
      o("cca6"), o("99af"), F.exports = { functional: !0, render: function(m, v) {
        var u = v._c, S = (v._v, v.data), g = v.children, w = g === void 0 ? [] : g, a = S.class, f = S.staticClass, y = S.style, l = S.staticStyle, c = S.attrs, s = c === void 0 ? {} : c, b = z(S, $);
        return u("svg", j({ class: [a, f], style: [y, l], attrs: Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" }, s) }, b), w.concat([u("path", { attrs: { d: "M0 0h24v24H0z", fill: "none" } }), u("path", { attrs: { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" } })]));
      } };
    }, 8525: function(F, G, o) {
      var j = o("12c0").default, z = o("f3e1").default, $ = ["class", "staticClass", "style", "staticStyle", "attrs"];
      o("cca6"), o("99af"), F.exports = { functional: !0, render: function(m, v) {
        var u = v._c, S = (v._v, v.data), g = v.children, w = g === void 0 ? [] : g, a = S.class, f = S.staticClass, y = S.style, l = S.staticStyle, c = S.attrs, s = c === void 0 ? {} : c, b = z(S, $);
        return u("svg", j({ class: [a, f], style: [y, l], attrs: Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" }, s) }, b), w.concat([u("path", { attrs: { d: "M0 0h24v24H0z", fill: "none" } }), u("path", { attrs: { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" } })]));
      } };
    }, "857a": function(F, G, o) {
      var j = o("e330"), z = o("1d80"), $ = o("577e"), m = /"/g, v = j("".replace);
      F.exports = function(u, S, g, w) {
        var a = $(z(u)), f = "<" + S;
        return g !== "" && (f += " " + g + '="' + v($(w), m, "&quot;") + '"'), f + ">" + a + "</" + S + ">";
      };
    }, "861d": function(F, G, o) {
      var j = o("1626");
      F.exports = function(z) {
        return typeof z == "object" ? z !== null : j(z);
      };
    }, 8875: function(F, G, o) {
      var j, z, $;
      (function(m, v) {
        z = [], j = v, $ = typeof j == "function" ? j.apply(G, z) : j, $ === void 0 || (F.exports = $);
      })(typeof self < "u" && self, function() {
        function m() {
          var v = Object.getOwnPropertyDescriptor(document, "currentScript");
          if (!v && "currentScript" in document && document.currentScript || v && v.get !== m && document.currentScript)
            return document.currentScript;
          try {
            throw new Error();
          } catch (h) {
            var u, S, g, w = /.*at [^(]*\((.*):(.+):(.+)\)$/gi, a = /@([^@]*):(\d+):(\d+)\s*$/gi, f = w.exec(h.stack) || a.exec(h.stack), y = f && f[1] || !1, l = f && f[2] || !1, c = document.location.href.replace(document.location.hash, ""), s = document.getElementsByTagName("script");
            y === c && (u = document.documentElement.outerHTML, S = new RegExp("(?:[^\\n]+?\\n){0," + (l - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i"), g = u.replace(S, "$1").trim());
            for (var b = 0; b < s.length; b++)
              if (s[b].readyState === "interactive" || s[b].src === y || y === c && s[b].innerHTML && s[b].innerHTML.trim() === g)
                return s[b];
            return null;
          }
        }
        return m;
      });
    }, 8925: function(F, G, o) {
      var j = o("e330"), z = o("1626"), $ = o("c6cd"), m = j(Function.toString);
      z($.inspectSource) || ($.inspectSource = function(v) {
        return m(v);
      }), F.exports = $.inspectSource;
    }, "89b2": function(F) {
      F.exports = JSON.parse('{"psaccounts":{"accountManager":{"errorInstallEnable":"Wyst\u0105pi\u0142 b\u0142\u0105d, spr\xF3buj ponownie."},"alert":{"ps_accounts":{"enable":{"title":"Aktywuj modu\u0142 PrestaShop Account","message":"Modu\u0142 PrestaShop konto jest konieczny w celu dalszej konfiguracji tego modu\u0142u.","action":"Aktywuj","loading":"Aktywacja modu\u0142u PrestaShop Account w toku..."},"install":{"title":"Zainstaluj modu\u0142 PrestaShop Account","message":"Modu\u0142 PrestaShop konto jest konieczny w celu dalszej konfiguracji tego modu\u0142u.","action":"Zainstaluj","loading":"Aktywacja modu\u0142u PrestaShop Account w toku..."},"update":{"title":"Zaktualizuj modu\u0142 Konta PrestaShop","message":"Dost\u0119pna jest nowa wersja Kont PrestaShop, zaktualizuj modu\u0142, aby m\xF3c dalej korzysta\u0107 z us\u0142ug","action":"Aktualizacja","loading":"Modu\u0142 PrestaShop Account jest obecnie aktualizowany..."}},"ps_eventbus":{"enable":{"title":"Aktywuj modu\u0142 PrestaShop Event Bus","message":"Potrzebujesz modu\u0142u PrestaShop Event Bus, aby kontynuowa\u0107 konfiguracj\u0119 tego modu\u0142u.","action":"Aktywuj","loading":"Modu\u0142 PrestaShop Event Bus jest obecnie aktywowany..."},"install":{"title":"Zainstaluj modu\u0142 Prestashop Event Bus","message":"Modu\u0142 PrestaShop konto jest konieczny w celu dalszej konfiguracji tego modu\u0142u.","action":"Zainstaluj","loading":"Aktywacja modu\u0142u Prestashop Event Bus w toku..."}}},"alertShopDomainShouldExists":{"title":"URL sklepu nie jest wype\u0142niony!","message":"Tylko sklep z przypisanym adresem URL mo\u017Ce by\u0107 powi\u0105zany z kontem PrestaShop.<br />Nast\u0119puj\u0105ce sklepy nie maj\u0105 przypisanego adresu URL: "},"account":{"title":"Po\u0142\u0105cz sw\xF3j sklep z kontem PrestaShop | Po\u0142\u0105cz swoje sklepy z kontem PrestaShop","authorize":"Mo\u017Cesz powi\u0105za\u0107 sw\xF3j sklep tylko z jednym kontem. Dokonaj dobrego wyboru!","authorized":"Tw\xF3j sklep jest powi\u0105zany z kontem PrestaShop: | Twoje sklepy s\u0105 powi\u0105zane z kontem PrestaShop:","authorizedPartially":"Twoje sklepy s\u0105 cz\u0119\u015Bciowo powi\u0105zane z kontem PrestaShop","authorizedSeveral":"Twoje sklepy s\u0105 powi\u0105zane z kilkoma kontami PrestaShop","connectButton":"Po\u0142\u0105cz","reonboardButton":"Ponownie skojarz","disconnectButton":"U\u017Cyj innego konta","moduleUpdateInformation":"<strong>Nowa aktualizacja:</strong> mo\u017Cesz zarz\u0105dza\u0107 swoimi powi\u0105zanymi sklepami.<br /> Prosimy o ponowne do\u0142\u0105czenie przy u\u017Cyciu <strong>tego samego adresu e-mail</strong> ,aby skorzysta\u0107 z tej aktualizacji.<br /> Inne aktualizacje modu\u0142u mog\u0105 by\u0107 dost\u0119pne w Managerze modu\u0142\xF3w, w zak\u0142adce Aktualizacje.","emailNotVerified":{"title":"Zosta\u0142a wys\u0142ana wiadomo\u015B\u0107 e-mail z potwierdzeniem.","description":"Sprawd\u017A swoj\u0105 skrzynk\u0119 odbiorcz\u0105 i kliknij link, aby aktywowa\u0107 konto."},"sendEmail":"Wr\xF3\u0107","needToBeAdmin":"Aby kontynuowa\u0107, musisz by\u0107 administratorem sklepu.","pleaseContact":"Prosimy o kontakt","manageAccountButton":"Zobacz moje powi\u0105zane sklepy","unlinkButton":"Od\u0142\u0105cz"}}}');
    }, "8aa5": function(F, G, o) {
      var j = o("6547").charAt;
      F.exports = function(z, $, m) {
        return $ + (m ? j(z, $).length : 1);
      };
    }, "90e3": function(F, G, o) {
      var j = o("e330"), z = 0, $ = Math.random(), m = j(1 .toString);
      F.exports = function(v) {
        return "Symbol(" + (v === void 0 ? "" : v) + ")_" + m(++z + $, 36);
      };
    }, 9112: function(F, G, o) {
      var j = o("83ab"), z = o("9bf2"), $ = o("5c6c");
      F.exports = j ? function(m, v, u) {
        return z.f(m, v, $(1, u));
      } : function(m, v, u) {
        return m[v] = u, m;
      };
    }, 9152: function(F, G) {
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      G.read = function(o, j, z, $, m) {
        var v, u, S = 8 * m - $ - 1, g = (1 << S) - 1, w = g >> 1, a = -7, f = z ? m - 1 : 0, y = z ? -1 : 1, l = o[j + f];
        for (f += y, v = l & (1 << -a) - 1, l >>= -a, a += S; a > 0; v = 256 * v + o[j + f], f += y, a -= 8)
          ;
        for (u = v & (1 << -a) - 1, v >>= -a, a += $; a > 0; u = 256 * u + o[j + f], f += y, a -= 8)
          ;
        if (v === 0)
          v = 1 - w;
        else {
          if (v === g)
            return u ? NaN : 1 / 0 * (l ? -1 : 1);
          u += Math.pow(2, $), v -= w;
        }
        return (l ? -1 : 1) * u * Math.pow(2, v - $);
      }, G.write = function(o, j, z, $, m, v) {
        var u, S, g, w = 8 * v - m - 1, a = (1 << w) - 1, f = a >> 1, y = m === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = $ ? 0 : v - 1, c = $ ? 1 : -1, s = j < 0 || j === 0 && 1 / j < 0 ? 1 : 0;
        for (j = Math.abs(j), isNaN(j) || j === 1 / 0 ? (S = isNaN(j) ? 1 : 0, u = a) : (u = Math.floor(Math.log(j) / Math.LN2), j * (g = Math.pow(2, -u)) < 1 && (u--, g *= 2), j += u + f >= 1 ? y / g : y * Math.pow(2, 1 - f), j * g >= 2 && (u++, g /= 2), u + f >= a ? (S = 0, u = a) : u + f >= 1 ? (S = (j * g - 1) * Math.pow(2, m), u += f) : (S = j * Math.pow(2, f - 1) * Math.pow(2, m), u = 0)); m >= 8; o[z + l] = 255 & S, l += c, S /= 256, m -= 8)
          ;
        for (u = u << m | S, w += m; w > 0; o[z + l] = 255 & u, l += c, u /= 256, w -= 8)
          ;
        o[z + l - c] |= 128 * s;
      };
    }, 9263: function(F, G, o) {
      var j = o("c65b"), z = o("e330"), $ = o("577e"), m = o("ad6d"), v = o("9f7f"), u = o("5692"), S = o("7c73"), g = o("69f3").get, w = o("fce3"), a = o("107c"), f = u("native-string-replace", String.prototype.replace), y = RegExp.prototype.exec, l = y, c = z("".charAt), s = z("".indexOf), b = z("".replace), h = z("".slice), k = function() {
        var L = /a/, x = /b*/g;
        return j(y, L, "a"), j(y, x, "a"), L.lastIndex !== 0 || x.lastIndex !== 0;
      }(), d = v.BROKEN_CARET, O = /()??/.exec("")[1] !== void 0, M = k || O || d || w || a;
      M && (l = function(L) {
        var x, T, N, Y, ot, at, St, wt = this, Nt = g(wt), It = $(L), xe = Nt.raw;
        if (xe)
          return xe.lastIndex = wt.lastIndex, x = j(l, xe, It), wt.lastIndex = xe.lastIndex, x;
        var mt = Nt.groups, pt = d && wt.sticky, Et = j(m, wt), Mt = wt.source, xt = 0, Yt = It;
        if (pt && (Et = b(Et, "y", ""), s(Et, "g") === -1 && (Et += "g"), Yt = h(It, wt.lastIndex), wt.lastIndex > 0 && (!wt.multiline || wt.multiline && c(It, wt.lastIndex - 1) !== `
`) && (Mt = "(?: " + Mt + ")", Yt = " " + Yt, xt++), T = new RegExp("^(?:" + Mt + ")", Et)), O && (T = new RegExp("^" + Mt + "$(?!\\s)", Et)), k && (N = wt.lastIndex), Y = j(y, pt ? T : wt, Yt), pt ? Y ? (Y.input = h(Y.input, xt), Y[0] = h(Y[0], xt), Y.index = wt.lastIndex, wt.lastIndex += Y[0].length) : wt.lastIndex = 0 : k && Y && (wt.lastIndex = wt.global ? Y.index + Y[0].length : N), O && Y && Y.length > 1 && j(f, Y[0], T, function() {
          for (ot = 1; ot < arguments.length - 2; ot++)
            arguments[ot] === void 0 && (Y[ot] = void 0);
        }), Y && mt)
          for (Y.groups = at = S(null), ot = 0; ot < mt.length; ot++)
            St = mt[ot], at[St[0]] = Y[St[1]];
        return Y;
      }), F.exports = l;
    }, "94ca": function(F, G, o) {
      var j = o("d039"), z = o("1626"), $ = /#|\.prototype\./, m = function(w, a) {
        var f = u[v(w)];
        return f == g || f != S && (z(a) ? j(a) : !!a);
      }, v = m.normalize = function(w) {
        return String(w).replace($, ".").toLowerCase();
      }, u = m.data = {}, S = m.NATIVE = "N", g = m.POLYFILL = "P";
      F.exports = m;
    }, 9542: function(F) {
      F.exports = JSON.parse('{"psaccounts":{"accountManager":{"errorInstallEnable":"A ap\u0103rut o problem\u0103. Te rug\u0103m s\u0103 mai \xEEncerci o dat\u0103."},"alert":{"ps_accounts":{"enable":{"title":"Activeaz\u0103 modulul PrestaShop Account","message":"Ai nevoie de modulul PrestaShop Account pentru a continua configurarea acestui modul.","action":"Activeaz\u0103","loading":"Modulul PrestaShop Account este \xEEn curs de activare..."},"install":{"title":"Instaleaz\u0103 modulul PrestaShop Account","message":"Ai nevoie de modulul PrestaShop Account pentru a continua configurarea acestui modul.","action":"Instaleaz\u0103","loading":"Modulul PrestaShop Account este \xEEn curs de instalare..."},"update":{"title":"Actualizeaz\u0103 modulul Prestashop Account","message":"O nou\u0103 versiune a PrestaShop Account este disponibil\u0103, te rug\u0103m s\u0103 actualizezi modulul pentru a continua s\u0103 utilizezi serviciile","action":"Actualizare","loading":"Modulul PrestaShop Account este \xEEn curs de actualizare..."}},"ps_eventbus":{"enable":{"title":"Activeaz\u0103 modulul Prestashop Event Bus","message":"Ai nevoie de modulul PrestaShop Event Bus pentru a continua configurarea acestui modul.","action":"Activeaz\u0103","loading":"Modulul Prestashop Event Bus este \xEEn curs de activare..."},"install":{"title":"Instaleaz\u0103 modulul Prestashop Event Bus","message":"Ai nevoie de modulul PrestaShop Event Bus pentru a continua configurarea acestui modul.","action":"Instaleaz\u0103","loading":"Modulul Prestashop Event Bus este \xEEn curs de instalare..."}}},"alertShopDomainShouldExists":{"title":"URL-ul magazinului nu este completat!","message":"Doar magazinul cu un URL atribuit poate fi asociat unui cont PrestaShop.<br />Urm\u0103toarele magazine nu au un URL atribuit: "},"account":{"title":"Asociaz\u0103-\u021Bi magazinul cu un cont PrestaShop | Asociaz\u0103-\u021Bi magazinele cu un cont PrestaShop","authorize":"Po\u021Bi asocia magazinul doar cu un singur cont. A\u0219a c\u0103 ai grij\u0103 s\u0103 il alegi pe cel potrivit!","authorized":"Magazinul t\u0103u este asociat cu contul t\u0103u din PrestaShop. | Magazinele tale sunt asociate cu contul t\u0103u din PrestaShop:","authorizedPartially":"Magazinele tale au fost par\u021Bial asociate cu contul t\u0103u PrestaShop Account","authorizedSeveral":"Magazinele tale sunt asociate cu mai multe conturi de PrestaShop","connectButton":"Asociaz\u0103","reonboardButton":"Reasociaz\u0103","disconnectButton":"Folose\u0219te un alt cont","moduleUpdateInformation":"<strong>Nou\u0103 actualizare:</strong> po\u021Bi gestiona magazinele asociate.<br /> Te rug\u0103m s\u0103 te reasociezi folosind <strong>aceea\u0219i adres\u0103 de e-mail</strong> pentru a beneficia de aceast\u0103 actualizare.<br /> Alte actualiz\u0103ri ale modulelor pot fi disponibile \xEEn fila Actualiz\u0103ri din managerul de module.","emailNotVerified":{"title":"Un e-mail de confirmare a fost trimis la adresa.","description":"Verific\u0103 c\u0103su\u021Ba po\u0219tal\u0103 \u0219i f\u0103 clic pe link pentru a activa contul."},"sendEmail":"Trimite din nou","needToBeAdmin":"Pentru a continua, trebuie s\u0103 fii administratorul magazinului","pleaseContact":"Te rug\u0103m s\u0103 contactezi","manageAccountButton":"Vezi magazinele mele asociate","unlinkButton":"Disociaz\u0103"}}}');
    }, "96cf": function(F, G, o) {
      var j = function(z) {
        var $, m = Object.prototype, v = m.hasOwnProperty, u = typeof Symbol == "function" ? Symbol : {}, S = u.iterator || "@@iterator", g = u.asyncIterator || "@@asyncIterator", w = u.toStringTag || "@@toStringTag";
        function a(mt, pt, Et) {
          return Object.defineProperty(mt, pt, { value: Et, enumerable: !0, configurable: !0, writable: !0 }), mt[pt];
        }
        try {
          a({}, "");
        } catch {
          a = function(pt, Et, Mt) {
            return pt[Et] = Mt;
          };
        }
        function f(mt, pt, Et, Mt) {
          var xt = pt && pt.prototype instanceof k ? pt : k, Yt = Object.create(xt.prototype), ce = new Nt(Mt || []);
          return Yt._invoke = ot(mt, Et, ce), Yt;
        }
        function y(mt, pt, Et) {
          try {
            return { type: "normal", arg: mt.call(pt, Et) };
          } catch (Mt) {
            return { type: "throw", arg: Mt };
          }
        }
        z.wrap = f;
        var l = "suspendedStart", c = "suspendedYield", s = "executing", b = "completed", h = {};
        function k() {
        }
        function d() {
        }
        function O() {
        }
        var M = {};
        a(M, S, function() {
          return this;
        });
        var L = Object.getPrototypeOf, x = L && L(L(It([])));
        x && x !== m && v.call(x, S) && (M = x);
        var T = O.prototype = k.prototype = Object.create(M);
        function N(mt) {
          ["next", "throw", "return"].forEach(function(pt) {
            a(mt, pt, function(Et) {
              return this._invoke(pt, Et);
            });
          });
        }
        function Y(mt, pt) {
          function Et(Yt, ce, ye, fe) {
            var Oe = y(mt[Yt], mt, ce);
            if (Oe.type !== "throw") {
              var be = Oe.arg, ar = be.value;
              return ar && typeof ar == "object" && v.call(ar, "__await") ? pt.resolve(ar.__await).then(function(fr) {
                Et("next", fr, ye, fe);
              }, function(fr) {
                Et("throw", fr, ye, fe);
              }) : pt.resolve(ar).then(function(fr) {
                be.value = fr, ye(be);
              }, function(fr) {
                return Et("throw", fr, ye, fe);
              });
            }
            fe(Oe.arg);
          }
          var Mt;
          function xt(Yt, ce) {
            function ye() {
              return new pt(function(fe, Oe) {
                Et(Yt, ce, fe, Oe);
              });
            }
            return Mt = Mt ? Mt.then(ye, ye) : ye();
          }
          this._invoke = xt;
        }
        function ot(mt, pt, Et) {
          var Mt = l;
          return function(xt, Yt) {
            if (Mt === s)
              throw new Error("Generator is already running");
            if (Mt === b) {
              if (xt === "throw")
                throw Yt;
              return xe();
            }
            for (Et.method = xt, Et.arg = Yt; ; ) {
              var ce = Et.delegate;
              if (ce) {
                var ye = at(ce, Et);
                if (ye) {
                  if (ye === h)
                    continue;
                  return ye;
                }
              }
              if (Et.method === "next")
                Et.sent = Et._sent = Et.arg;
              else if (Et.method === "throw") {
                if (Mt === l)
                  throw Mt = b, Et.arg;
                Et.dispatchException(Et.arg);
              } else
                Et.method === "return" && Et.abrupt("return", Et.arg);
              Mt = s;
              var fe = y(mt, pt, Et);
              if (fe.type === "normal") {
                if (Mt = Et.done ? b : c, fe.arg === h)
                  continue;
                return { value: fe.arg, done: Et.done };
              }
              fe.type === "throw" && (Mt = b, Et.method = "throw", Et.arg = fe.arg);
            }
          };
        }
        function at(mt, pt) {
          var Et = mt.iterator[pt.method];
          if (Et === $) {
            if (pt.delegate = null, pt.method === "throw") {
              if (mt.iterator.return && (pt.method = "return", pt.arg = $, at(mt, pt), pt.method === "throw"))
                return h;
              pt.method = "throw", pt.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return h;
          }
          var Mt = y(Et, mt.iterator, pt.arg);
          if (Mt.type === "throw")
            return pt.method = "throw", pt.arg = Mt.arg, pt.delegate = null, h;
          var xt = Mt.arg;
          return xt ? xt.done ? (pt[mt.resultName] = xt.value, pt.next = mt.nextLoc, pt.method !== "return" && (pt.method = "next", pt.arg = $), pt.delegate = null, h) : xt : (pt.method = "throw", pt.arg = new TypeError("iterator result is not an object"), pt.delegate = null, h);
        }
        function St(mt) {
          var pt = { tryLoc: mt[0] };
          1 in mt && (pt.catchLoc = mt[1]), 2 in mt && (pt.finallyLoc = mt[2], pt.afterLoc = mt[3]), this.tryEntries.push(pt);
        }
        function wt(mt) {
          var pt = mt.completion || {};
          pt.type = "normal", delete pt.arg, mt.completion = pt;
        }
        function Nt(mt) {
          this.tryEntries = [{ tryLoc: "root" }], mt.forEach(St, this), this.reset(!0);
        }
        function It(mt) {
          if (mt) {
            var pt = mt[S];
            if (pt)
              return pt.call(mt);
            if (typeof mt.next == "function")
              return mt;
            if (!isNaN(mt.length)) {
              var Et = -1, Mt = function xt() {
                for (; ++Et < mt.length; )
                  if (v.call(mt, Et))
                    return xt.value = mt[Et], xt.done = !1, xt;
                return xt.value = $, xt.done = !0, xt;
              };
              return Mt.next = Mt;
            }
          }
          return { next: xe };
        }
        function xe() {
          return { value: $, done: !0 };
        }
        return d.prototype = O, a(T, "constructor", O), a(O, "constructor", d), d.displayName = a(O, w, "GeneratorFunction"), z.isGeneratorFunction = function(mt) {
          var pt = typeof mt == "function" && mt.constructor;
          return !!pt && (pt === d || (pt.displayName || pt.name) === "GeneratorFunction");
        }, z.mark = function(mt) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(mt, O) : (mt.__proto__ = O, a(mt, w, "GeneratorFunction")), mt.prototype = Object.create(T), mt;
        }, z.awrap = function(mt) {
          return { __await: mt };
        }, N(Y.prototype), a(Y.prototype, g, function() {
          return this;
        }), z.AsyncIterator = Y, z.async = function(mt, pt, Et, Mt, xt) {
          xt === void 0 && (xt = Promise);
          var Yt = new Y(f(mt, pt, Et, Mt), xt);
          return z.isGeneratorFunction(pt) ? Yt : Yt.next().then(function(ce) {
            return ce.done ? ce.value : Yt.next();
          });
        }, N(T), a(T, w, "Generator"), a(T, S, function() {
          return this;
        }), a(T, "toString", function() {
          return "[object Generator]";
        }), z.keys = function(mt) {
          var pt = [];
          for (var Et in mt)
            pt.push(Et);
          return pt.reverse(), function Mt() {
            for (; pt.length; ) {
              var xt = pt.pop();
              if (xt in mt)
                return Mt.value = xt, Mt.done = !1, Mt;
            }
            return Mt.done = !0, Mt;
          };
        }, z.values = It, Nt.prototype = { constructor: Nt, reset: function(mt) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = $, this.done = !1, this.delegate = null, this.method = "next", this.arg = $, this.tryEntries.forEach(wt), !mt)
            for (var pt in this)
              pt.charAt(0) === "t" && v.call(this, pt) && !isNaN(+pt.slice(1)) && (this[pt] = $);
        }, stop: function() {
          this.done = !0;
          var mt = this.tryEntries[0], pt = mt.completion;
          if (pt.type === "throw")
            throw pt.arg;
          return this.rval;
        }, dispatchException: function(mt) {
          if (this.done)
            throw mt;
          var pt = this;
          function Et(fe, Oe) {
            return Yt.type = "throw", Yt.arg = mt, pt.next = fe, Oe && (pt.method = "next", pt.arg = $), !!Oe;
          }
          for (var Mt = this.tryEntries.length - 1; Mt >= 0; --Mt) {
            var xt = this.tryEntries[Mt], Yt = xt.completion;
            if (xt.tryLoc === "root")
              return Et("end");
            if (xt.tryLoc <= this.prev) {
              var ce = v.call(xt, "catchLoc"), ye = v.call(xt, "finallyLoc");
              if (ce && ye) {
                if (this.prev < xt.catchLoc)
                  return Et(xt.catchLoc, !0);
                if (this.prev < xt.finallyLoc)
                  return Et(xt.finallyLoc);
              } else if (ce) {
                if (this.prev < xt.catchLoc)
                  return Et(xt.catchLoc, !0);
              } else {
                if (!ye)
                  throw new Error("try statement without catch or finally");
                if (this.prev < xt.finallyLoc)
                  return Et(xt.finallyLoc);
              }
            }
          }
        }, abrupt: function(mt, pt) {
          for (var Et = this.tryEntries.length - 1; Et >= 0; --Et) {
            var Mt = this.tryEntries[Et];
            if (Mt.tryLoc <= this.prev && v.call(Mt, "finallyLoc") && this.prev < Mt.finallyLoc) {
              var xt = Mt;
              break;
            }
          }
          xt && (mt === "break" || mt === "continue") && xt.tryLoc <= pt && pt <= xt.finallyLoc && (xt = null);
          var Yt = xt ? xt.completion : {};
          return Yt.type = mt, Yt.arg = pt, xt ? (this.method = "next", this.next = xt.finallyLoc, h) : this.complete(Yt);
        }, complete: function(mt, pt) {
          if (mt.type === "throw")
            throw mt.arg;
          return mt.type === "break" || mt.type === "continue" ? this.next = mt.arg : mt.type === "return" ? (this.rval = this.arg = mt.arg, this.method = "return", this.next = "end") : mt.type === "normal" && pt && (this.next = pt), h;
        }, finish: function(mt) {
          for (var pt = this.tryEntries.length - 1; pt >= 0; --pt) {
            var Et = this.tryEntries[pt];
            if (Et.finallyLoc === mt)
              return this.complete(Et.completion, Et.afterLoc), wt(Et), h;
          }
        }, catch: function(mt) {
          for (var pt = this.tryEntries.length - 1; pt >= 0; --pt) {
            var Et = this.tryEntries[pt];
            if (Et.tryLoc === mt) {
              var Mt = Et.completion;
              if (Mt.type === "throw") {
                var xt = Mt.arg;
                wt(Et);
              }
              return xt;
            }
          }
          throw new Error("illegal catch attempt");
        }, delegateYield: function(mt, pt, Et) {
          return this.delegate = { iterator: It(mt), resultName: pt, nextLoc: Et }, this.method === "next" && (this.arg = $), h;
        } }, z;
      }(F.exports);
      try {
        regeneratorRuntime = j;
      } catch {
        typeof globalThis == "object" ? globalThis.regeneratorRuntime = j : Function("r", "regeneratorRuntime = r")(j);
      }
    }, 9911: function(F, G, o) {
      var j = o("23e7"), z = o("857a"), $ = o("af03");
      j({ target: "String", proto: !0, forced: $("link") }, { link: function(m) {
        return z(this, "a", "href", m);
      } });
    }, "99af": function(F, G, o) {
      var j = o("23e7"), z = o("da84"), $ = o("d039"), m = o("e8b5"), v = o("861d"), u = o("7b0b"), S = o("07fa"), g = o("8418"), w = o("65f0"), a = o("1dde"), f = o("b622"), y = o("2d00"), l = f("isConcatSpreadable"), c = 9007199254740991, s = "Maximum allowed index exceeded", b = z.TypeError, h = y >= 51 || !$(function() {
        var M = [];
        return M[l] = !1, M.concat()[0] !== M;
      }), k = a("concat"), d = function(M) {
        if (!v(M))
          return !1;
        var L = M[l];
        return L !== void 0 ? !!L : m(M);
      }, O = !h || !k;
      j({ target: "Array", proto: !0, forced: O }, { concat: function(M) {
        var L, x, T, N, Y, ot = u(this), at = w(ot, 0), St = 0;
        for (L = -1, T = arguments.length; L < T; L++)
          if (Y = L === -1 ? ot : arguments[L], d(Y)) {
            if (N = S(Y), St + N > c)
              throw b(s);
            for (x = 0; x < N; x++, St++)
              x in Y && g(at, St, Y[x]);
          } else {
            if (St >= c)
              throw b(s);
            g(at, St++, Y);
          }
        return at.length = St, at;
      } });
    }, "9a1f": function(F, G, o) {
      var j = o("da84"), z = o("c65b"), $ = o("59ed"), m = o("825a"), v = o("0d51"), u = o("35a1"), S = j.TypeError;
      F.exports = function(g, w) {
        var a = arguments.length < 2 ? u(g) : w;
        if ($(a))
          return m(z(a, g));
        throw S(v(g) + " is not iterable");
      };
    }, "9bdd": function(F, G, o) {
      var j = o("825a"), z = o("2a62");
      F.exports = function($, m, v, u) {
        try {
          return u ? m(j(v)[0], v[1]) : m(v);
        } catch (S) {
          z($, "throw", S);
        }
      };
    }, "9bf2": function(F, G, o) {
      var j = o("da84"), z = o("83ab"), $ = o("0cfb"), m = o("aed9"), v = o("825a"), u = o("a04b"), S = j.TypeError, g = Object.defineProperty, w = Object.getOwnPropertyDescriptor, a = "enumerable", f = "configurable", y = "writable";
      G.f = z ? m ? function(l, c, s) {
        if (v(l), c = u(c), v(s), typeof l == "function" && c === "prototype" && "value" in s && y in s && !s[y]) {
          var b = w(l, c);
          b && b[y] && (l[c] = s.value, s = { configurable: f in s ? s[f] : b[f], enumerable: a in s ? s[a] : b[a], writable: !1 });
        }
        return g(l, c, s);
      } : g : function(l, c, s) {
        if (v(l), c = u(c), v(s), $)
          try {
            return g(l, c, s);
          } catch {
          }
        if ("get" in s || "set" in s)
          throw S("Accessors not supported");
        return "value" in s && (l[c] = s.value), l;
      };
    }, "9ea5": function(F, G, o) {
      o("6ce8");
    }, "9ed3": function(F, G, o) {
      var j = o("ae93").IteratorPrototype, z = o("7c73"), $ = o("5c6c"), m = o("d44e"), v = o("3f8c"), u = function() {
        return this;
      };
      F.exports = function(S, g, w, a) {
        var f = g + " Iterator";
        return S.prototype = z(j, { next: $(+!a, w) }), m(S, f, !1, !0), v[f] = u, S;
      };
    }, "9f7f": function(F, G, o) {
      var j = o("d039"), z = o("da84"), $ = z.RegExp, m = j(function() {
        var S = $("a", "y");
        return S.lastIndex = 2, S.exec("abcd") != null;
      }), v = m || j(function() {
        return !$("a", "y").sticky;
      }), u = m || j(function() {
        var S = $("^r", "gy");
        return S.lastIndex = 2, S.exec("str") != null;
      });
      F.exports = { BROKEN_CARET: u, MISSED_STICKY: v, UNSUPPORTED_Y: m };
    }, a026: function(F, G, o) {
      o.r(G), function(j) {
        /*!
         * Vue.js v2.6.14
         * (c) 2014-2021 Evan You
         * Released under the MIT License.
         */
        var z = Object.freeze({});
        function $(t) {
          return t == null;
        }
        function m(t) {
          return t != null;
        }
        function v(t) {
          return t === !0;
        }
        function u(t) {
          return t === !1;
        }
        function S(t) {
          return typeof t == "string" || typeof t == "number" || typeof t == "symbol" || typeof t == "boolean";
        }
        function g(t) {
          return t !== null && typeof t == "object";
        }
        var w = Object.prototype.toString;
        function a(t) {
          return w.call(t) === "[object Object]";
        }
        function f(t) {
          return w.call(t) === "[object RegExp]";
        }
        function y(t) {
          var e = parseFloat(String(t));
          return e >= 0 && Math.floor(e) === e && isFinite(t);
        }
        function l(t) {
          return m(t) && typeof t.then == "function" && typeof t.catch == "function";
        }
        function c(t) {
          return t == null ? "" : Array.isArray(t) || a(t) && t.toString === w ? JSON.stringify(t, null, 2) : String(t);
        }
        function s(t) {
          var e = parseFloat(t);
          return isNaN(e) ? t : e;
        }
        function b(t, e) {
          for (var n = /* @__PURE__ */ Object.create(null), i = t.split(","), E = 0; E < i.length; E++)
            n[i[E]] = !0;
          return e ? function(R) {
            return n[R.toLowerCase()];
          } : function(R) {
            return n[R];
          };
        }
        var h = b("slot,component", !0), k = b("key,ref,slot,slot-scope,is");
        function d(t, e) {
          if (t.length) {
            var n = t.indexOf(e);
            if (n > -1)
              return t.splice(n, 1);
          }
        }
        var O = Object.prototype.hasOwnProperty;
        function M(t, e) {
          return O.call(t, e);
        }
        function L(t) {
          var e = /* @__PURE__ */ Object.create(null);
          return function(n) {
            var i = e[n];
            return i || (e[n] = t(n));
          };
        }
        var x = /-(\w)/g, T = L(function(t) {
          return t.replace(x, function(e, n) {
            return n ? n.toUpperCase() : "";
          });
        }), N = L(function(t) {
          return t.charAt(0).toUpperCase() + t.slice(1);
        }), Y = /\B([A-Z])/g, ot = L(function(t) {
          return t.replace(Y, "-$1").toLowerCase();
        });
        function at(t, e) {
          function n(i) {
            var E = arguments.length;
            return E ? E > 1 ? t.apply(e, arguments) : t.call(e, i) : t.call(e);
          }
          return n._length = t.length, n;
        }
        function St(t, e) {
          return t.bind(e);
        }
        var wt = Function.prototype.bind ? St : at;
        function Nt(t, e) {
          e = e || 0;
          for (var n = t.length - e, i = new Array(n); n--; )
            i[n] = t[n + e];
          return i;
        }
        function It(t, e) {
          for (var n in e)
            t[n] = e[n];
          return t;
        }
        function xe(t) {
          for (var e = {}, n = 0; n < t.length; n++)
            t[n] && It(e, t[n]);
          return e;
        }
        function mt(t, e, n) {
        }
        var pt = function(t, e, n) {
          return !1;
        }, Et = function(t) {
          return t;
        };
        function Mt(t) {
          return t.reduce(function(e, n) {
            return e.concat(n.staticKeys || []);
          }, []).join(",");
        }
        function xt(t, e) {
          if (t === e)
            return !0;
          var n = g(t), i = g(e);
          if (!n || !i)
            return !n && !i && String(t) === String(e);
          try {
            var E = Array.isArray(t), R = Array.isArray(e);
            if (E && R)
              return t.length === e.length && t.every(function(Z, vt) {
                return xt(Z, e[vt]);
              });
            if (t instanceof Date && e instanceof Date)
              return t.getTime() === e.getTime();
            if (E || R)
              return !1;
            var V = Object.keys(t), K = Object.keys(e);
            return V.length === K.length && V.every(function(Z) {
              return xt(t[Z], e[Z]);
            });
          } catch {
            return !1;
          }
        }
        function Yt(t, e) {
          for (var n = 0; n < t.length; n++)
            if (xt(t[n], e))
              return n;
          return -1;
        }
        function ce(t) {
          var e = !1;
          return function() {
            e || (e = !0, t.apply(this, arguments));
          };
        }
        var ye = "data-server-rendered", fe = ["component", "directive", "filter"], Oe = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch"], be = { optionMergeStrategies: /* @__PURE__ */ Object.create(null), silent: !1, productionTip: !1, devtools: !1, performance: !1, errorHandler: null, warnHandler: null, ignoredElements: [], keyCodes: /* @__PURE__ */ Object.create(null), isReservedTag: pt, isReservedAttr: pt, isUnknownElement: pt, getTagNamespace: mt, parsePlatformTagName: Et, mustUseProp: pt, async: !0, _lifecycleHooks: Oe }, ar = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
        function fr(t) {
          var e = (t + "").charCodeAt(0);
          return e === 36 || e === 95;
        }
        function Vr(t, e, n, i) {
          Object.defineProperty(t, e, { value: n, enumerable: !!i, writable: !0, configurable: !0 });
        }
        var en = new RegExp("[^" + ar.source + ".$_\\d]");
        function rn(t) {
          if (!en.test(t)) {
            var e = t.split(".");
            return function(n) {
              for (var i = 0; i < e.length; i++) {
                if (!n)
                  return;
                n = n[e[i]];
              }
              return n;
            };
          }
        }
        var sr, zr = "__proto__" in {}, We = typeof window < "u", fn = typeof WXEnvironment < "u" && !!WXEnvironment.platform, _n = fn && WXEnvironment.platform.toLowerCase(), P = We && window.navigator.userAgent.toLowerCase(), D = P && /msie|trident/.test(P), W = P && P.indexOf("msie 9.0") > 0, et = P && P.indexOf("edge/") > 0, ct = (P && P.indexOf("android"), P && /iphone|ipad|ipod|ios/.test(P) || _n === "ios"), yt = (P && /chrome\/\d+/.test(P), P && /phantomjs/.test(P), P && P.match(/firefox\/(\d+)/)), Wt = {}.watch, Se = !1;
        if (We)
          try {
            var Pe = {};
            Object.defineProperty(Pe, "passive", { get: function() {
              Se = !0;
            } }), window.addEventListener("test-passive", null, Pe);
          } catch {
          }
        var we = function() {
          return sr === void 0 && (sr = !We && !fn && typeof j < "u" && j.process && j.process.env.VUE_ENV === "server"), sr;
        }, ke = We && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
        function ur(t) {
          return typeof t == "function" && /native code/.test(t.toString());
        }
        var Ce, kr = typeof Symbol < "u" && ur(Symbol) && typeof Reflect < "u" && ur(Reflect.ownKeys);
        Ce = typeof Set < "u" && ur(Set) ? Set : function() {
          function t() {
            this.set = /* @__PURE__ */ Object.create(null);
          }
          return t.prototype.has = function(e) {
            return this.set[e] === !0;
          }, t.prototype.add = function(e) {
            this.set[e] = !0;
          }, t.prototype.clear = function() {
            this.set = /* @__PURE__ */ Object.create(null);
          }, t;
        }();
        var Ge = mt, Jr = 0, dr = function() {
          this.id = Jr++, this.subs = [];
        };
        dr.prototype.addSub = function(t) {
          this.subs.push(t);
        }, dr.prototype.removeSub = function(t) {
          d(this.subs, t);
        }, dr.prototype.depend = function() {
          dr.target && dr.target.addDep(this);
        }, dr.prototype.notify = function() {
          for (var t = this.subs.slice(), e = 0, n = t.length; e < n; e++)
            t[e].update();
        }, dr.target = null;
        var Pt = [];
        function Ut(t) {
          Pt.push(t), dr.target = t;
        }
        function te() {
          Pt.pop(), dr.target = Pt[Pt.length - 1];
        }
        var Jt = function(t, e, n, i, E, R, V, K) {
          this.tag = t, this.data = e, this.children = n, this.text = i, this.elm = E, this.ns = void 0, this.context = R, this.fnContext = void 0, this.fnOptions = void 0, this.fnScopeId = void 0, this.key = e && e.key, this.componentOptions = V, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = K, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
        }, He = { child: { configurable: !0 } };
        He.child.get = function() {
          return this.componentInstance;
        }, Object.defineProperties(Jt.prototype, He);
        var tr = function(t) {
          t === void 0 && (t = "");
          var e = new Jt();
          return e.text = t, e.isComment = !0, e;
        };
        function Dt(t) {
          return new Jt(void 0, void 0, void 0, String(t));
        }
        function Vt(t) {
          var e = new Jt(t.tag, t.data, t.children && t.children.slice(), t.text, t.elm, t.context, t.componentOptions, t.asyncFactory);
          return e.ns = t.ns, e.isStatic = t.isStatic, e.key = t.key, e.isComment = t.isComment, e.fnContext = t.fnContext, e.fnOptions = t.fnOptions, e.fnScopeId = t.fnScopeId, e.asyncMeta = t.asyncMeta, e.isCloned = !0, e;
        }
        var ue = Array.prototype, de = Object.create(ue), Ke = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];
        Ke.forEach(function(t) {
          var e = ue[t];
          Vr(de, t, function() {
            for (var n = [], i = arguments.length; i--; )
              n[i] = arguments[i];
            var E, R = e.apply(this, n), V = this.__ob__;
            switch (t) {
              case "push":
              case "unshift":
                E = n;
                break;
              case "splice":
                E = n.slice(2);
                break;
            }
            return E && V.observeArray(E), V.dep.notify(), R;
          });
        });
        var xn = Object.getOwnPropertyNames(de), Lt = !0;
        function je(t) {
          Lt = t;
        }
        var Ro = function(t) {
          this.value = t, this.dep = new dr(), this.vmCount = 0, Vr(t, "__ob__", this), Array.isArray(t) ? (zr ? ua(t, de) : la(t, de, xn), this.observeArray(t)) : this.walk(t);
        };
        function ua(t, e) {
          t.__proto__ = e;
        }
        function la(t, e, n) {
          for (var i = 0, E = n.length; i < E; i++) {
            var R = n[i];
            Vr(t, R, e[R]);
          }
        }
        function oo(t, e) {
          var n;
          if (g(t) && !(t instanceof Jt))
            return M(t, "__ob__") && t.__ob__ instanceof Ro ? n = t.__ob__ : Lt && !we() && (Array.isArray(t) || a(t)) && Object.isExtensible(t) && !t._isVue && (n = new Ro(t)), e && n && n.vmCount++, n;
        }
        function _o(t, e, n, i, E) {
          var R = new dr(), V = Object.getOwnPropertyDescriptor(t, e);
          if (!V || V.configurable !== !1) {
            var K = V && V.get, Z = V && V.set;
            K && !Z || arguments.length !== 2 || (n = t[e]);
            var vt = !E && oo(n);
            Object.defineProperty(t, e, { enumerable: !0, configurable: !0, get: function() {
              var _t = K ? K.call(t) : n;
              return dr.target && (R.depend(), vt && (vt.dep.depend(), Array.isArray(_t) && xi(_t))), _t;
            }, set: function(_t) {
              var At = K ? K.call(t) : n;
              _t === At || _t !== _t && At !== At || K && !Z || (Z ? Z.call(t, _t) : n = _t, vt = !E && oo(_t), R.notify());
            } });
          }
        }
        function _i(t, e, n) {
          if (Array.isArray(t) && y(e))
            return t.length = Math.max(t.length, e), t.splice(e, 1, n), n;
          if (e in t && !(e in Object.prototype))
            return t[e] = n, n;
          var i = t.__ob__;
          return t._isVue || i && i.vmCount ? n : i ? (_o(i.value, e, n), i.dep.notify(), n) : (t[e] = n, n);
        }
        function Io(t, e) {
          if (Array.isArray(t) && y(e))
            t.splice(e, 1);
          else {
            var n = t.__ob__;
            t._isVue || n && n.vmCount || M(t, e) && (delete t[e], n && n.dep.notify());
          }
        }
        function xi(t) {
          for (var e = void 0, n = 0, i = t.length; n < i; n++)
            e = t[n], e && e.__ob__ && e.__ob__.dep.depend(), Array.isArray(e) && xi(e);
        }
        Ro.prototype.walk = function(t) {
          for (var e = Object.keys(t), n = 0; n < e.length; n++)
            _o(t, e[n]);
        }, Ro.prototype.observeArray = function(t) {
          for (var e = 0, n = t.length; e < n; e++)
            oo(t[e]);
        };
        var vr = be.optionMergeStrategies;
        function Hr(t, e) {
          if (!e)
            return t;
          for (var n, i, E, R = kr ? Reflect.ownKeys(e) : Object.keys(e), V = 0; V < R.length; V++)
            n = R[V], n !== "__ob__" && (i = t[n], E = e[n], M(t, n) ? i !== E && a(i) && a(E) && Hr(i, E) : _i(t, n, E));
          return t;
        }
        function Jo(t, e, n) {
          return n ? function() {
            var i = typeof e == "function" ? e.call(n, n) : e, E = typeof t == "function" ? t.call(n, n) : t;
            return i ? Hr(i, E) : E;
          } : e ? t ? function() {
            return Hr(typeof e == "function" ? e.call(this, this) : e, typeof t == "function" ? t.call(this, this) : t);
          } : e : t;
        }
        function Sn(t, e) {
          var n = e ? t ? t.concat(e) : Array.isArray(e) ? e : [e] : t;
          return n && fa(n);
        }
        function fa(t) {
          for (var e = [], n = 0; n < t.length; n++)
            e.indexOf(t[n]) === -1 && e.push(t[n]);
          return e;
        }
        function $n(t, e, n, i) {
          var E = Object.create(t || null);
          return e ? It(E, e) : E;
        }
        vr.data = function(t, e, n) {
          return n ? Jo(t, e, n) : e && typeof e != "function" ? t : Jo(t, e);
        }, Oe.forEach(function(t) {
          vr[t] = Sn;
        }), fe.forEach(function(t) {
          vr[t + "s"] = $n;
        }), vr.watch = function(t, e, n, i) {
          if (t === Wt && (t = void 0), e === Wt && (e = void 0), !e)
            return Object.create(t || null);
          if (!t)
            return e;
          var E = {};
          for (var R in It(E, t), e) {
            var V = E[R], K = e[R];
            V && !Array.isArray(V) && (V = [V]), E[R] = V ? V.concat(K) : Array.isArray(K) ? K : [K];
          }
          return E;
        }, vr.props = vr.methods = vr.inject = vr.computed = function(t, e, n, i) {
          if (!t)
            return e;
          var E = /* @__PURE__ */ Object.create(null);
          return It(E, t), e && It(E, e), E;
        }, vr.provide = Jo;
        var Ia = function(t, e) {
          return e === void 0 ? t : e;
        };
        function Fi(t, e) {
          var n = t.props;
          if (n) {
            var i, E, R, V = {};
            if (Array.isArray(n))
              for (i = n.length; i--; )
                E = n[i], typeof E == "string" && (R = T(E), V[R] = { type: null });
            else if (a(n))
              for (var K in n)
                E = n[K], R = T(K), V[R] = a(E) ? E : { type: E };
            t.props = V;
          }
        }
        function Zo(t, e) {
          var n = t.inject;
          if (n) {
            var i = t.inject = {};
            if (Array.isArray(n))
              for (var E = 0; E < n.length; E++)
                i[n[E]] = { from: n[E] };
            else if (a(n))
              for (var R in n) {
                var V = n[R];
                i[R] = a(V) ? It({ from: R }, V) : { from: V };
              }
          }
        }
        function Bi(t) {
          var e = t.directives;
          if (e)
            for (var n in e) {
              var i = e[n];
              typeof i == "function" && (e[n] = { bind: i, update: i });
            }
        }
        function io(t, e, n) {
          if (typeof e == "function" && (e = e.options), Fi(e), Zo(e), Bi(e), !e._base && (e.extends && (t = io(t, e.extends, n)), e.mixins))
            for (var i = 0, E = e.mixins.length; i < E; i++)
              t = io(t, e.mixins[i], n);
          var R, V = {};
          for (R in t)
            K(R);
          for (R in e)
            M(t, R) || K(R);
          function K(Z) {
            var vt = vr[Z] || Ia;
            V[Z] = vt(t[Z], e[Z], n, Z);
          }
          return V;
        }
        function Xo(t, e, n, i) {
          if (typeof n == "string") {
            var E = t[e];
            if (M(E, n))
              return E[n];
            var R = T(n);
            if (M(E, R))
              return E[R];
            var V = N(R);
            if (M(E, V))
              return E[V];
            var K = E[n] || E[R] || E[V];
            return K;
          }
        }
        function Pn(t, e, n, i) {
          var E = e[t], R = !M(n, t), V = n[t], K = Ui(Boolean, E.type);
          if (K > -1) {
            if (R && !M(E, "default"))
              V = !1;
            else if (V === "" || V === ot(t)) {
              var Z = Ui(String, E.type);
              (Z < 0 || K < Z) && (V = !0);
            }
          }
          if (V === void 0) {
            V = Wn(i, E, t);
            var vt = Lt;
            je(!0), oo(V), je(vt);
          }
          return V;
        }
        function Wn(t, e, n) {
          if (M(e, "default")) {
            var i = e.default;
            return t && t.$options.propsData && t.$options.propsData[n] === void 0 && t._props[n] !== void 0 ? t._props[n] : typeof i == "function" && Si(e.type) !== "Function" ? i.call(t) : i;
          }
        }
        var kn = /^\s*function (\w+)/;
        function Si(t) {
          var e = t && t.toString().match(kn);
          return e ? e[1] : "";
        }
        function To(t, e) {
          return Si(t) === Si(e);
        }
        function Ui(t, e) {
          if (!Array.isArray(e))
            return To(e, t) ? 0 : -1;
          for (var n = 0, i = e.length; n < i; n++)
            if (To(e[n], t))
              return n;
          return -1;
        }
        function An(t, e, n) {
          Ut();
          try {
            if (e)
              for (var i = e; i = i.$parent; ) {
                var E = i.$options.errorCaptured;
                if (E)
                  for (var R = 0; R < E.length; R++)
                    try {
                      var V = E[R].call(i, t, e, n) === !1;
                      if (V)
                        return;
                    } catch (K) {
                      hn(K, i, "errorCaptured hook");
                    }
              }
            hn(t, e, n);
          } finally {
            te();
          }
        }
        function qn(t, e, n, i, E) {
          var R;
          try {
            R = n ? t.apply(e, n) : t.call(e), R && !R._isVue && l(R) && !R._handled && (R.catch(function(V) {
              return An(V, i, E + " (Promise/async)");
            }), R._handled = !0);
          } catch (V) {
            An(V, i, E);
          }
          return R;
        }
        function hn(t, e, n) {
          if (be.errorHandler)
            try {
              return be.errorHandler.call(null, t, e, n);
            } catch (i) {
              i !== t && ki(i);
            }
          ki(t);
        }
        function ki(t, e, n) {
          if (!We && !fn || typeof console > "u")
            throw t;
          console.error(t);
        }
        var Be, Yr = !1, Ai = [], Mo = !1;
        function xr() {
          Mo = !1;
          var t = Ai.slice(0);
          Ai.length = 0;
          for (var e = 0; e < t.length; e++)
            t[e]();
        }
        if (typeof Promise < "u" && ur(Promise)) {
          var Wi = Promise.resolve();
          Be = function() {
            Wi.then(xr), ct && setTimeout(mt);
          }, Yr = !0;
        } else if (D || typeof MutationObserver > "u" || !ur(MutationObserver) && MutationObserver.toString() !== "[object MutationObserverConstructor]")
          Be = typeof setImmediate < "u" && ur(setImmediate) ? function() {
            setImmediate(xr);
          } : function() {
            setTimeout(xr, 0);
          };
        else {
          var Qo = 1, ti = new MutationObserver(xr), Vn = document.createTextNode(String(Qo));
          ti.observe(Vn, { characterData: !0 }), Be = function() {
            Qo = (Qo + 1) % 2, Vn.data = String(Qo);
          }, Yr = !0;
        }
        function xo(t, e) {
          var n;
          if (Ai.push(function() {
            if (t)
              try {
                t.call(e);
              } catch (i) {
                An(i, e, "nextTick");
              }
            else
              n && n(e);
          }), Mo || (Mo = !0, Be()), !t && typeof Promise < "u")
            return new Promise(function(i) {
              n = i;
            });
        }
        var ao = new Ce();
        function Hn(t) {
          ei(t, ao), ao.clear();
        }
        function ei(t, e) {
          var n, i, E = Array.isArray(t);
          if (!(!E && !g(t) || Object.isFrozen(t) || t instanceof Jt)) {
            if (t.__ob__) {
              var R = t.__ob__.dep.id;
              if (e.has(R))
                return;
              e.add(R);
            }
            if (E)
              for (n = t.length; n--; )
                ei(t[n], e);
            else
              for (i = Object.keys(t), n = i.length; n--; )
                ei(t[i[n]], e);
          }
        }
        var so = L(function(t) {
          var e = t.charAt(0) === "&";
          t = e ? t.slice(1) : t;
          var n = t.charAt(0) === "~";
          t = n ? t.slice(1) : t;
          var i = t.charAt(0) === "!";
          return t = i ? t.slice(1) : t, { name: t, once: n, capture: i, passive: e };
        });
        function on(t, e) {
          function n() {
            var i = arguments, E = n.fns;
            if (!Array.isArray(E))
              return qn(E, null, arguments, e, "v-on handler");
            for (var R = E.slice(), V = 0; V < R.length; V++)
              qn(R[V], null, i, e, "v-on handler");
          }
          return n.fns = t, n;
        }
        function Yn(t, e, n, i, E, R) {
          var V, K, Z, vt;
          for (V in t)
            K = t[V], Z = e[V], vt = so(V), $(K) || ($(Z) ? ($(K.fns) && (K = t[V] = on(K, R)), v(vt.once) && (K = t[V] = E(vt.name, K, vt.capture)), n(vt.name, K, vt.capture, vt.passive, vt.params)) : K !== Z && (Z.fns = K, t[V] = Z));
          for (V in e)
            $(t[V]) && (vt = so(V), i(vt.name, e[V], vt.capture));
        }
        function co(t, e, n) {
          var i;
          t instanceof Jt && (t = t.data.hook || (t.data.hook = {}));
          var E = t[e];
          function R() {
            n.apply(this, arguments), d(i.fns, R);
          }
          $(E) ? i = on([R]) : m(E.fns) && v(E.merged) ? (i = E, i.fns.push(R)) : i = on([E, R]), i.merged = !0, t[e] = i;
        }
        function Ta(t, e, n) {
          var i = e.options.props;
          if (!$(i)) {
            var E = {}, R = t.attrs, V = t.props;
            if (m(R) || m(V))
              for (var K in i) {
                var Z = ot(K);
                da(E, V, K, Z, !0) || da(E, R, K, Z, !1);
              }
            return E;
          }
        }
        function da(t, e, n, i, E) {
          if (m(e)) {
            if (M(e, n))
              return t[n] = e[n], E || delete e[n], !0;
            if (M(e, i))
              return t[n] = e[i], E || delete e[i], !0;
          }
          return !1;
        }
        function zo(t) {
          for (var e = 0; e < t.length; e++)
            if (Array.isArray(t[e]))
              return Array.prototype.concat.apply([], t);
          return t;
        }
        function uo(t) {
          return S(t) ? [Dt(t)] : Array.isArray(t) ? ri(t) : void 0;
        }
        function lo(t) {
          return m(t) && m(t.text) && u(t.isComment);
        }
        function ri(t, e) {
          var n, i, E, R, V = [];
          for (n = 0; n < t.length; n++)
            i = t[n], $(i) || typeof i == "boolean" || (E = V.length - 1, R = V[E], Array.isArray(i) ? i.length > 0 && (i = ri(i, (e || "") + "_" + n), lo(i[0]) && lo(R) && (V[E] = Dt(R.text + i[0].text), i.shift()), V.push.apply(V, i)) : S(i) ? lo(R) ? V[E] = Dt(R.text + i) : i !== "" && V.push(Dt(i)) : lo(i) && lo(R) ? V[E] = Dt(R.text + i.text) : (v(t._isVList) && m(i.tag) && $(i.key) && m(e) && (i.key = "__vlist" + e + "_" + n + "__"), V.push(i)));
          return V;
        }
        function Do(t) {
          var e = t.$options.provide;
          e && (t._provided = typeof e == "function" ? e.call(t) : e);
        }
        function pa(t) {
          var e = Lo(t.$options.inject, t);
          e && (je(!1), Object.keys(e).forEach(function(n) {
            _o(t, n, e[n]);
          }), je(!0));
        }
        function Lo(t, e) {
          if (t) {
            for (var n = /* @__PURE__ */ Object.create(null), i = kr ? Reflect.ownKeys(t) : Object.keys(t), E = 0; E < i.length; E++) {
              var R = i[E];
              if (R !== "__ob__") {
                for (var V = t[R].from, K = e; K; ) {
                  if (K._provided && M(K._provided, V)) {
                    n[R] = K._provided[V];
                    break;
                  }
                  K = K.$parent;
                }
                if (!K && "default" in t[R]) {
                  var Z = t[R].default;
                  n[R] = typeof Z == "function" ? Z.call(e) : Z;
                }
              }
            }
            return n;
          }
        }
        function Ei(t, e) {
          if (!t || !t.length)
            return {};
          for (var n = {}, i = 0, E = t.length; i < E; i++) {
            var R = t[i], V = R.data;
            if (V && V.attrs && V.attrs.slot && delete V.attrs.slot, R.context !== e && R.fnContext !== e || !V || V.slot == null)
              (n.default || (n.default = [])).push(R);
            else {
              var K = V.slot, Z = n[K] || (n[K] = []);
              R.tag === "template" ? Z.push.apply(Z, R.children || []) : Z.push(R);
            }
          }
          for (var vt in n)
            n[vt].every(qi) && delete n[vt];
          return n;
        }
        function qi(t) {
          return t.isComment && !t.asyncFactory || t.text === " ";
        }
        function No(t) {
          return t.isComment && t.asyncFactory;
        }
        function Fo(t, e, n) {
          var i, E = Object.keys(e).length > 0, R = t ? !!t.$stable : !E, V = t && t.$key;
          if (t) {
            if (t._normalized)
              return t._normalized;
            if (R && n && n !== z && V === n.$key && !E && !n.$hasNormal)
              return n;
            for (var K in i = {}, t)
              t[K] && K[0] !== "$" && (i[K] = ni(e, K, t[K]));
          } else
            i = {};
          for (var Z in e)
            Z in i || (i[Z] = So(e, Z));
          return t && Object.isExtensible(t) && (t._normalized = i), Vr(i, "$stable", R), Vr(i, "$key", V), Vr(i, "$hasNormal", E), i;
        }
        function ni(t, e, n) {
          var i = function() {
            var E = arguments.length ? n.apply(null, arguments) : n({});
            E = E && typeof E == "object" && !Array.isArray(E) ? [E] : uo(E);
            var R = E && E[0];
            return E && (!R || E.length === 1 && R.isComment && !No(R)) ? void 0 : E;
          };
          return n.proxy && Object.defineProperty(t, e, { get: i, enumerable: !0, configurable: !0 }), i;
        }
        function So(t, e) {
          return function() {
            return t[e];
          };
        }
        function ko(t, e) {
          var n, i, E, R, V;
          if (Array.isArray(t) || typeof t == "string")
            for (n = new Array(t.length), i = 0, E = t.length; i < E; i++)
              n[i] = e(t[i], i);
          else if (typeof t == "number")
            for (n = new Array(t), i = 0; i < t; i++)
              n[i] = e(i + 1, i);
          else if (g(t))
            if (kr && t[Symbol.iterator]) {
              n = [];
              for (var K = t[Symbol.iterator](), Z = K.next(); !Z.done; )
                n.push(e(Z.value, n.length)), Z = K.next();
            } else
              for (R = Object.keys(t), n = new Array(R.length), i = 0, E = R.length; i < E; i++)
                V = R[i], n[i] = e(t[V], V, i);
          return m(n) || (n = []), n._isVList = !0, n;
        }
        function Bo(t, e, n, i) {
          var E, R = this.$scopedSlots[t];
          R ? (n = n || {}, i && (n = It(It({}, i), n)), E = R(n) || (typeof e == "function" ? e() : e)) : E = this.$slots[t] || (typeof e == "function" ? e() : e);
          var V = n && n.slot;
          return V ? this.$createElement("template", { slot: V }, E) : E;
        }
        function mn(t) {
          return Xo(this.$options, "filters", t) || Et;
        }
        function Oi(t, e) {
          return Array.isArray(t) ? t.indexOf(e) === -1 : t !== e;
        }
        function ha(t, e, n, i, E) {
          var R = be.keyCodes[e] || n;
          return E && i && !be.keyCodes[e] ? Oi(E, i) : R ? Oi(R, t) : i ? ot(i) !== e : t === void 0;
        }
        function Vi(t, e, n, i, E) {
          if (n && g(n)) {
            var R;
            Array.isArray(n) && (n = xe(n));
            var V = function(Z) {
              if (Z === "class" || Z === "style" || k(Z))
                R = t;
              else {
                var vt = t.attrs && t.attrs.type;
                R = i || be.mustUseProp(e, vt, Z) ? t.domProps || (t.domProps = {}) : t.attrs || (t.attrs = {});
              }
              var _t = T(Z), At = ot(Z);
              if (!(_t in R) && !(At in R) && (R[Z] = n[Z], E)) {
                var Ht = t.on || (t.on = {});
                Ht["update:" + Z] = function(le) {
                  n[Z] = le;
                };
              }
            };
            for (var K in n)
              V(K);
          }
          return t;
        }
        function ji(t, e) {
          var n = this._staticTrees || (this._staticTrees = []), i = n[t];
          return i && !e || (i = n[t] = this.$options.staticRenderFns[t].call(this._renderProxy, null, this), gr(i, "__static__" + t, !1)), i;
        }
        function Cn(t, e, n) {
          return gr(t, "__once__" + e + (n ? "_" + n : ""), !0), t;
        }
        function gr(t, e, n) {
          if (Array.isArray(t))
            for (var i = 0; i < t.length; i++)
              t[i] && typeof t[i] != "string" && oi(t[i], e + "_" + i, n);
          else
            oi(t, e, n);
        }
        function oi(t, e, n) {
          t.isStatic = !0, t.key = e, t.isOnce = n;
        }
        function ma(t, e) {
          if (e && a(e)) {
            var n = t.on = t.on ? It({}, t.on) : {};
            for (var i in e) {
              var E = n[i], R = e[i];
              n[i] = E ? [].concat(E, R) : R;
            }
          }
          return t;
        }
        function fo(t, e, n, i) {
          e = e || { $stable: !n };
          for (var E = 0; E < t.length; E++) {
            var R = t[E];
            Array.isArray(R) ? fo(R, e, n) : R && (R.proxy && (R.fn.proxy = !0), e[R.key] = R.fn);
          }
          return i && (e.$key = i), e;
        }
        function Gn(t, e) {
          for (var n = 0; n < e.length; n += 2) {
            var i = e[n];
            typeof i == "string" && i && (t[e[n]] = e[n + 1]);
          }
          return t;
        }
        function $i(t, e) {
          return typeof t == "string" ? e + t : t;
        }
        function Hi(t) {
          t._o = Cn, t._n = s, t._s = c, t._l = ko, t._t = Bo, t._q = xt, t._i = Yt, t._m = ji, t._f = mn, t._k = ha, t._b = Vi, t._v = Dt, t._e = tr, t._u = fo, t._g = ma, t._d = Gn, t._p = $i;
        }
        function Pi(t, e, n, i, E) {
          var R, V = this, K = E.options;
          M(i, "_uid") ? (R = Object.create(i), R._original = i) : (R = i, i = i._original);
          var Z = v(K._compiled), vt = !Z;
          this.data = t, this.props = e, this.children = n, this.parent = i, this.listeners = t.on || z, this.injections = Lo(K.inject, i), this.slots = function() {
            return V.$slots || Fo(t.scopedSlots, V.$slots = Ei(n, i)), V.$slots;
          }, Object.defineProperty(this, "scopedSlots", { enumerable: !0, get: function() {
            return Fo(t.scopedSlots, this.slots());
          } }), Z && (this.$options = K, this.$slots = this.slots(), this.$scopedSlots = Fo(t.scopedSlots, this.$slots)), K._scopeId ? this._c = function(_t, At, Ht, le) {
            var Ve = Ao(R, _t, At, Ht, le, vt);
            return Ve && !Array.isArray(Ve) && (Ve.fnScopeId = K._scopeId, Ve.fnContext = i), Ve;
          } : this._c = function(_t, At, Ht, le) {
            return Ao(R, _t, At, Ht, le, vt);
          };
        }
        function Yi(t, e, n, i, E) {
          var R = t.options, V = {}, K = R.props;
          if (m(K))
            for (var Z in K)
              V[Z] = Pn(Z, K, e || z);
          else
            m(n.attrs) && Rn(V, n.attrs), m(n.props) && Rn(V, n.props);
          var vt = new Pi(n, V, E, i, t), _t = R.render.call(null, vt._c, vt);
          if (_t instanceof Jt)
            return Ci(_t, n, vt.parent, R);
          if (Array.isArray(_t)) {
            for (var At = uo(_t) || [], Ht = new Array(At.length), le = 0; le < At.length; le++)
              Ht[le] = Ci(At[le], n, vt.parent, R);
            return Ht;
          }
        }
        function Ci(t, e, n, i, E) {
          var R = Vt(t);
          return R.fnContext = n, R.fnOptions = i, e.slot && ((R.data || (R.data = {})).slot = e.slot), R;
        }
        function Rn(t, e) {
          for (var n in e)
            t[T(n)] = e[n];
        }
        Hi(Pi.prototype);
        var vn = { init: function(t, e) {
          if (t.componentInstance && !t.componentInstance._isDestroyed && t.data.keepAlive) {
            var n = t;
            vn.prepatch(n, n);
          } else {
            var i = t.componentInstance = va(t, yn);
            i.$mount(e ? t.elm : void 0, e);
          }
        }, prepatch: function(t, e) {
          var n = e.componentOptions, i = e.componentInstance = t.componentInstance;
          Qi(i, n.propsData, n.listeners, e, n.children);
        }, insert: function(t) {
          var e = t.context, n = t.componentInstance;
          n._isMounted || (n._isMounted = !0, C(n, "mounted")), t.data.keepAlive && (e._isMounted ? Ct(n) : ta(n, !0));
        }, destroy: function(t) {
          var e = t.componentInstance;
          e._isDestroyed || (t.data.keepAlive ? p(e, !0) : e.$destroy());
        } }, gn = Object.keys(vn);
        function Gi(t, e, n, i, E) {
          if (!$(t)) {
            var R = n.$options._base;
            if (g(t) && (t = R.extend(t)), typeof t == "function") {
              var V;
              if ($(t.cid) && (V = t, t = Eo(V, R), t === void 0))
                return ba(V, e, n, i, E);
              e = e || {}, Tn(t), m(e.model) && Uo(t.options, e);
              var K = Ta(e, t);
              if (v(t.options.functional))
                return Yi(t, K, e, n, i);
              var Z = e.on;
              if (e.on = e.nativeOn, v(t.options.abstract)) {
                var vt = e.slot;
                e = {}, vt && (e.slot = vt);
              }
              Ri(e);
              var _t = t.options.name || E, At = new Jt("vue-component-" + t.cid + (_t ? "-" + _t : ""), e, void 0, void 0, void 0, n, { Ctor: t, propsData: K, listeners: Z, tag: E, children: i }, V);
              return At;
            }
          }
        }
        function va(t, e) {
          var n = { _isComponent: !0, _parentVnode: t, parent: e }, i = t.data.inlineTemplate;
          return m(i) && (n.render = i.render, n.staticRenderFns = i.staticRenderFns), new t.componentOptions.Ctor(n);
        }
        function Ri(t) {
          for (var e = t.hook || (t.hook = {}), n = 0; n < gn.length; n++) {
            var i = gn[n], E = e[i], R = vn[i];
            E === R || E && E._merged || (e[i] = E ? ii(R, E) : R);
          }
        }
        function ii(t, e) {
          var n = function(i, E) {
            t(i, E), e(i, E);
          };
          return n._merged = !0, n;
        }
        function Uo(t, e) {
          var n = t.model && t.model.prop || "value", i = t.model && t.model.event || "input";
          (e.attrs || (e.attrs = {}))[n] = e.model.value;
          var E = e.on || (e.on = {}), R = E[i], V = e.model.callback;
          m(R) ? (Array.isArray(R) ? R.indexOf(V) === -1 : R !== V) && (E[i] = [V].concat(R)) : E[i] = V;
        }
        var Ii = 1, ga = 2;
        function Ao(t, e, n, i, E, R) {
          return (Array.isArray(n) || S(n)) && (E = i, i = n, n = void 0), v(R) && (E = ga), Ir(t, e, n, i, E);
        }
        function Ir(t, e, n, i, E) {
          if (m(n) && m(n.__ob__) || (m(n) && m(n.is) && (e = n.is), !e))
            return tr();
          var R, V, K;
          return Array.isArray(i) && typeof i[0] == "function" && (n = n || {}, n.scopedSlots = { default: i[0] }, i.length = 0), E === ga ? i = uo(i) : E === Ii && (i = zo(i)), typeof e == "string" ? (V = t.$vnode && t.$vnode.ns || be.getTagNamespace(e), R = be.isReservedTag(e) ? new Jt(be.parsePlatformTagName(e), n, i, void 0, void 0, t) : n && n.pre || !m(K = Xo(t.$options, "components", e)) ? new Jt(e, n, i, void 0, void 0, t) : Gi(K, n, t, i, e)) : R = Gi(e, n, t, i), Array.isArray(R) ? R : m(R) ? (m(V) && yr(R, V), m(n) && ya(n), R) : tr();
        }
        function yr(t, e, n) {
          if (t.ns = e, t.tag === "foreignObject" && (e = void 0, n = !0), m(t.children))
            for (var i = 0, E = t.children.length; i < E; i++) {
              var R = t.children[i];
              m(R.tag) && ($(R.ns) || v(n) && R.tag !== "svg") && yr(R, e, n);
            }
        }
        function ya(t) {
          g(t.style) && Hn(t.style), g(t.class) && Hn(t.class);
        }
        function ai(t) {
          t._vnode = null, t._staticTrees = null;
          var e = t.$options, n = t.$vnode = e._parentVnode, i = n && n.context;
          t.$slots = Ei(e._renderChildren, i), t.$scopedSlots = z, t._c = function(R, V, K, Z) {
            return Ao(t, R, V, K, Z, !1);
          }, t.$createElement = function(R, V, K, Z) {
            return Ao(t, R, V, K, Z, !0);
          };
          var E = n && n.data;
          _o(t, "$attrs", E && E.attrs || z, null, !0), _o(t, "$listeners", e._parentListeners || z, null, !0);
        }
        var Wo, Ki = null;
        function Ji(t) {
          Hi(t.prototype), t.prototype.$nextTick = function(e) {
            return xo(e, this);
          }, t.prototype._render = function() {
            var e, n = this, i = n.$options, E = i.render, R = i._parentVnode;
            R && (n.$scopedSlots = Fo(R.data.scopedSlots, n.$slots, n.$scopedSlots)), n.$vnode = R;
            try {
              Ki = n, e = E.call(n._renderProxy, n.$createElement);
            } catch (V) {
              An(V, n, "render"), e = n._vnode;
            } finally {
              Ki = null;
            }
            return Array.isArray(e) && e.length === 1 && (e = e[0]), e instanceof Jt || (e = tr()), e.parent = R, e;
          };
        }
        function Zi(t, e) {
          return (t.__esModule || kr && t[Symbol.toStringTag] === "Module") && (t = t.default), g(t) ? e.extend(t) : t;
        }
        function ba(t, e, n, i, E) {
          var R = tr();
          return R.asyncFactory = t, R.asyncMeta = { data: e, context: n, children: i, tag: E }, R;
        }
        function Eo(t, e) {
          if (v(t.error) && m(t.errorComp))
            return t.errorComp;
          if (m(t.resolved))
            return t.resolved;
          var n = Ki;
          if (n && m(t.owners) && t.owners.indexOf(n) === -1 && t.owners.push(n), v(t.loading) && m(t.loadingComp))
            return t.loadingComp;
          if (n && !m(t.owners)) {
            var i = t.owners = [n], E = !0, R = null, V = null;
            n.$on("hook:destroyed", function() {
              return d(i, n);
            });
            var K = function(At) {
              for (var Ht = 0, le = i.length; Ht < le; Ht++)
                i[Ht].$forceUpdate();
              At && (i.length = 0, R !== null && (clearTimeout(R), R = null), V !== null && (clearTimeout(V), V = null));
            }, Z = ce(function(At) {
              t.resolved = Zi(At, e), E ? i.length = 0 : K(!0);
            }), vt = ce(function(At) {
              m(t.errorComp) && (t.error = !0, K(!0));
            }), _t = t(Z, vt);
            return g(_t) && (l(_t) ? $(t.resolved) && _t.then(Z, vt) : l(_t.component) && (_t.component.then(Z, vt), m(_t.error) && (t.errorComp = Zi(_t.error, e)), m(_t.loading) && (t.loadingComp = Zi(_t.loading, e), _t.delay === 0 ? t.loading = !0 : R = setTimeout(function() {
              R = null, $(t.resolved) && $(t.error) && (t.loading = !0, K(!1));
            }, _t.delay || 200)), m(_t.timeout) && (V = setTimeout(function() {
              V = null, $(t.resolved) && vt(null);
            }, _t.timeout)))), E = !1, t.loading ? t.loadingComp : t.resolved;
          }
        }
        function Ie(t) {
          if (Array.isArray(t))
            for (var e = 0; e < t.length; e++) {
              var n = t[e];
              if (m(n) && (m(n.componentOptions) || No(n)))
                return n;
            }
        }
        function Ma(t) {
          t._events = /* @__PURE__ */ Object.create(null), t._hasHookEvent = !1;
          var e = t.$options._parentListeners;
          e && Ti(t, e);
        }
        function za(t, e) {
          Wo.$on(t, e);
        }
        function po(t, e) {
          Wo.$off(t, e);
        }
        function Da(t, e) {
          var n = Wo;
          return function i() {
            var E = e.apply(null, arguments);
            E !== null && n.$off(t, i);
          };
        }
        function Ti(t, e, n) {
          Wo = t, Yn(e, n || {}, za, po, Da, t), Wo = void 0;
        }
        function Kn(t) {
          var e = /^hook:/;
          t.prototype.$on = function(n, i) {
            var E = this;
            if (Array.isArray(n))
              for (var R = 0, V = n.length; R < V; R++)
                E.$on(n[R], i);
            else
              (E._events[n] || (E._events[n] = [])).push(i), e.test(n) && (E._hasHookEvent = !0);
            return E;
          }, t.prototype.$once = function(n, i) {
            var E = this;
            function R() {
              E.$off(n, R), i.apply(E, arguments);
            }
            return R.fn = i, E.$on(n, R), E;
          }, t.prototype.$off = function(n, i) {
            var E = this;
            if (!arguments.length)
              return E._events = /* @__PURE__ */ Object.create(null), E;
            if (Array.isArray(n)) {
              for (var R = 0, V = n.length; R < V; R++)
                E.$off(n[R], i);
              return E;
            }
            var K, Z = E._events[n];
            if (!Z)
              return E;
            if (!i)
              return E._events[n] = null, E;
            for (var vt = Z.length; vt--; )
              if (K = Z[vt], K === i || K.fn === i) {
                Z.splice(vt, 1);
                break;
              }
            return E;
          }, t.prototype.$emit = function(n) {
            var i = this, E = i._events[n];
            if (E) {
              E = E.length > 1 ? Nt(E) : E;
              for (var R = Nt(arguments, 1), V = 'event handler for "' + n + '"', K = 0, Z = E.length; K < Z; K++)
                qn(E[K], i, R, i, V);
            }
            return i;
          };
        }
        var yn = null;
        function qo(t) {
          var e = yn;
          return yn = t, function() {
            yn = e;
          };
        }
        function Xi(t) {
          var e = t.$options, n = e.parent;
          if (n && !e.abstract) {
            for (; n.$options.abstract && n.$parent; )
              n = n.$parent;
            n.$children.push(t);
          }
          t.$parent = n, t.$root = n ? n.$root : t, t.$children = [], t.$refs = {}, t._watcher = null, t._inactive = null, t._directInactive = !1, t._isMounted = !1, t._isDestroyed = !1, t._isBeingDestroyed = !1;
        }
        function wa(t) {
          t.prototype._update = function(e, n) {
            var i = this, E = i.$el, R = i._vnode, V = qo(i);
            i._vnode = e, i.$el = R ? i.__patch__(R, e) : i.__patch__(i.$el, e, n, !1), V(), E && (E.__vue__ = null), i.$el && (i.$el.__vue__ = i), i.$vnode && i.$parent && i.$vnode === i.$parent._vnode && (i.$parent.$el = i.$el);
          }, t.prototype.$forceUpdate = function() {
            var e = this;
            e._watcher && e._watcher.update();
          }, t.prototype.$destroy = function() {
            var e = this;
            if (!e._isBeingDestroyed) {
              C(e, "beforeDestroy"), e._isBeingDestroyed = !0;
              var n = e.$parent;
              !n || n._isBeingDestroyed || e.$options.abstract || d(n.$children, e), e._watcher && e._watcher.teardown();
              for (var i = e._watchers.length; i--; )
                e._watchers[i].teardown();
              e._data.__ob__ && e._data.__ob__.vmCount--, e._isDestroyed = !0, e.__patch__(e._vnode, null), C(e, "destroyed"), e.$off(), e.$el && (e.$el.__vue__ = null), e.$vnode && (e.$vnode.parent = null);
            }
          };
        }
        function La(t, e, n) {
          var i;
          return t.$el = e, t.$options.render || (t.$options.render = tr), C(t, "beforeMount"), i = function() {
            t._update(t._render(), n);
          }, new pe(t, i, mt, { before: function() {
            t._isMounted && !t._isDestroyed && C(t, "beforeUpdate");
          } }, !0), n = !1, t.$vnode == null && (t._isMounted = !0, C(t, "mounted")), t;
        }
        function Qi(t, e, n, i, E) {
          var R = i.data.scopedSlots, V = t.$scopedSlots, K = !!(R && !R.$stable || V !== z && !V.$stable || R && t.$scopedSlots.$key !== R.$key || !R && t.$scopedSlots.$key), Z = !!(E || t.$options._renderChildren || K);
          if (t.$options._parentVnode = i, t.$vnode = i, t._vnode && (t._vnode.parent = i), t.$options._renderChildren = E, t.$attrs = i.data.attrs || z, t.$listeners = n || z, e && t.$options.props) {
            je(!1);
            for (var vt = t._props, _t = t.$options._propKeys || [], At = 0; At < _t.length; At++) {
              var Ht = _t[At], le = t.$options.props;
              vt[Ht] = Pn(Ht, le, e, t);
            }
            je(!0), t.$options.propsData = e;
          }
          n = n || z;
          var Ve = t.$options._parentListeners;
          t.$options._parentListeners = n, Ti(t, n, Ve), Z && (t.$slots = Ei(E, i.context), t.$forceUpdate());
        }
        function _a(t) {
          for (; t && (t = t.$parent); )
            if (t._inactive)
              return !0;
          return !1;
        }
        function ta(t, e) {
          if (e) {
            if (t._directInactive = !1, _a(t))
              return;
          } else if (t._directInactive)
            return;
          if (t._inactive || t._inactive === null) {
            t._inactive = !1;
            for (var n = 0; n < t.$children.length; n++)
              ta(t.$children[n]);
            C(t, "activated");
          }
        }
        function p(t, e) {
          if ((!e || (t._directInactive = !0, !_a(t))) && !t._inactive) {
            t._inactive = !0;
            for (var n = 0; n < t.$children.length; n++)
              p(t.$children[n]);
            C(t, "deactivated");
          }
        }
        function C(t, e) {
          Ut();
          var n = t.$options[e], i = e + " hook";
          if (n)
            for (var E = 0, R = n.length; E < R; E++)
              qn(n[E], t, null, t, i);
          t._hasHookEvent && t.$emit("hook:" + e), te();
        }
        var I = [], B = [], q = {}, X = !1, J = !1, rt = 0;
        function ut() {
          rt = I.length = B.length = 0, q = {}, X = J = !1;
        }
        var st = 0, ft = Date.now;
        if (We && !D) {
          var ht = window.performance;
          ht && typeof ht.now == "function" && ft() > document.createEvent("Event").timeStamp && (ft = function() {
            return ht.now();
          });
        }
        function gt() {
          var t, e;
          for (st = ft(), J = !0, I.sort(function(E, R) {
            return E.id - R.id;
          }), rt = 0; rt < I.length; rt++)
            t = I[rt], t.before && t.before(), e = t.id, q[e] = null, t.run();
          var n = B.slice(), i = I.slice();
          ut(), Bt(n), bt(i), ke && be.devtools && ke.emit("flush");
        }
        function bt(t) {
          for (var e = t.length; e--; ) {
            var n = t[e], i = n.vm;
            i._watcher === n && i._isMounted && !i._isDestroyed && C(i, "updated");
          }
        }
        function Ct(t) {
          t._inactive = !1, B.push(t);
        }
        function Bt(t) {
          for (var e = 0; e < t.length; e++)
            t[e]._inactive = !0, ta(t[e], !0);
        }
        function re(t) {
          var e = t.id;
          if (q[e] == null) {
            if (q[e] = !0, J) {
              for (var n = I.length - 1; n > rt && I[n].id > t.id; )
                n--;
              I.splice(n + 1, 0, t);
            } else
              I.push(t);
            X || (X = !0, xo(gt));
          }
        }
        var Xt = 0, pe = function(t, e, n, i, E) {
          this.vm = t, E && (t._watcher = this), t._watchers.push(this), i ? (this.deep = !!i.deep, this.user = !!i.user, this.lazy = !!i.lazy, this.sync = !!i.sync, this.before = i.before) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++Xt, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new Ce(), this.newDepIds = new Ce(), this.expression = "", typeof e == "function" ? this.getter = e : (this.getter = rn(e), this.getter || (this.getter = mt)), this.value = this.lazy ? void 0 : this.get();
        };
        pe.prototype.get = function() {
          var t;
          Ut(this);
          var e = this.vm;
          try {
            t = this.getter.call(e, e);
          } catch (n) {
            if (!this.user)
              throw n;
            An(n, e, 'getter for watcher "' + this.expression + '"');
          } finally {
            this.deep && Hn(t), te(), this.cleanupDeps();
          }
          return t;
        }, pe.prototype.addDep = function(t) {
          var e = t.id;
          this.newDepIds.has(e) || (this.newDepIds.add(e), this.newDeps.push(t), this.depIds.has(e) || t.addSub(this));
        }, pe.prototype.cleanupDeps = function() {
          for (var t = this.deps.length; t--; ) {
            var e = this.deps[t];
            this.newDepIds.has(e.id) || e.removeSub(this);
          }
          var n = this.depIds;
          this.depIds = this.newDepIds, this.newDepIds = n, this.newDepIds.clear(), n = this.deps, this.deps = this.newDeps, this.newDeps = n, this.newDeps.length = 0;
        }, pe.prototype.update = function() {
          this.lazy ? this.dirty = !0 : this.sync ? this.run() : re(this);
        }, pe.prototype.run = function() {
          if (this.active) {
            var t = this.get();
            if (t !== this.value || g(t) || this.deep) {
              var e = this.value;
              if (this.value = t, this.user) {
                var n = 'callback for watcher "' + this.expression + '"';
                qn(this.cb, this.vm, [t, e], this.vm, n);
              } else
                this.cb.call(this.vm, t, e);
            }
          }
        }, pe.prototype.evaluate = function() {
          this.value = this.get(), this.dirty = !1;
        }, pe.prototype.depend = function() {
          for (var t = this.deps.length; t--; )
            this.deps[t].depend();
        }, pe.prototype.teardown = function() {
          if (this.active) {
            this.vm._isBeingDestroyed || d(this.vm._watchers, this);
            for (var t = this.deps.length; t--; )
              this.deps[t].removeSub(this);
            this.active = !1;
          }
        };
        var ge = { enumerable: !0, configurable: !0, get: mt, set: mt };
        function Ft(t, e, n) {
          ge.get = function() {
            return this[e][n];
          }, ge.set = function(i) {
            this[e][n] = i;
          }, Object.defineProperty(t, n, ge);
        }
        function Ue(t) {
          t._watchers = [];
          var e = t.$options;
          e.props && me(t, e.props), e.methods && mo(t, e.methods), e.data ? ve(t) : oo(t._data = {}, !0), e.computed && Dr(t, e.computed), e.watch && e.watch !== Wt && Zn(t, e.watch);
        }
        function me(t, e) {
          var n = t.$options.propsData || {}, i = t._props = {}, E = t.$options._propKeys = [], R = !t.$parent;
          R || je(!1);
          var V = function(Z) {
            E.push(Z);
            var vt = Pn(Z, e, n, t);
            _o(i, Z, vt), Z in t || Ft(t, "_props", Z);
          };
          for (var K in e)
            V(K);
          je(!0);
        }
        function ve(t) {
          var e = t.$options.data;
          e = t._data = typeof e == "function" ? Re(e, t) : e || {}, a(e) || (e = {});
          for (var n = Object.keys(e), i = t.$options.props, E = (t.$options.methods, n.length); E--; ) {
            var R = n[E];
            i && M(i, R) || fr(R) || Ft(t, "_data", R);
          }
          oo(e, !0);
        }
        function Re(t, e) {
          Ut();
          try {
            return t.call(e, e);
          } catch (n) {
            return An(n, e, "data()"), {};
          } finally {
            te();
          }
        }
        var pr = { lazy: !0 };
        function Dr(t, e) {
          var n = t._computedWatchers = /* @__PURE__ */ Object.create(null), i = we();
          for (var E in e) {
            var R = e[E], V = typeof R == "function" ? R : R.get;
            i || (n[E] = new pe(t, V || mt, mt, pr)), E in t || Je(t, E, R);
          }
        }
        function Je(t, e, n) {
          var i = !we();
          typeof n == "function" ? (ge.get = i ? Jn(e) : ho(n), ge.set = mt) : (ge.get = n.get ? i && n.cache !== !1 ? Jn(e) : ho(n.get) : mt, ge.set = n.set || mt), Object.defineProperty(t, e, ge);
        }
        function Jn(t) {
          return function() {
            var e = this._computedWatchers && this._computedWatchers[t];
            if (e)
              return e.dirty && e.evaluate(), dr.target && e.depend(), e.value;
          };
        }
        function ho(t) {
          return function() {
            return t.call(this, this);
          };
        }
        function mo(t, e) {
          t.$options.props;
          for (var n in e)
            t[n] = typeof e[n] != "function" ? mt : wt(e[n], t);
        }
        function Zn(t, e) {
          for (var n in e) {
            var i = e[n];
            if (Array.isArray(i))
              for (var E = 0; E < i.length; E++)
                In(t, n, i[E]);
            else
              In(t, n, i);
          }
        }
        function In(t, e, n, i) {
          return a(n) && (i = n, n = n.handler), typeof n == "string" && (n = t[n]), t.$watch(e, n, i);
        }
        function Oo(t) {
          var e = { get: function() {
            return this._data;
          } }, n = { get: function() {
            return this._props;
          } };
          Object.defineProperty(t.prototype, "$data", e), Object.defineProperty(t.prototype, "$props", n), t.prototype.$set = _i, t.prototype.$delete = Io, t.prototype.$watch = function(i, E, R) {
            var V = this;
            if (a(E))
              return In(V, i, E, R);
            R = R || {}, R.user = !0;
            var K = new pe(V, i, E, R);
            if (R.immediate) {
              var Z = 'callback for immediate watcher "' + K.expression + '"';
              Ut(), qn(E, V, [K.value], V, Z), te();
            }
            return function() {
              K.teardown();
            };
          };
        }
        var vo = 0;
        function Xn(t) {
          t.prototype._init = function(e) {
            var n = this;
            n._uid = vo++, n._isVue = !0, e && e._isComponent ? go(n, e) : n.$options = io(Tn(n.constructor), e || {}, n), n._renderProxy = n, n._self = n, Xi(n), Ma(n), ai(n), C(n, "beforeCreate"), pa(n), Ue(n), Do(n), C(n, "created"), n.$options.el && n.$mount(n.$options.el);
          };
        }
        function go(t, e) {
          var n = t.$options = Object.create(t.constructor.options), i = e._parentVnode;
          n.parent = e.parent, n._parentVnode = i;
          var E = i.componentOptions;
          n.propsData = E.propsData, n._parentListeners = E.listeners, n._renderChildren = E.children, n._componentTag = E.tag, e.render && (n.render = e.render, n.staticRenderFns = e.staticRenderFns);
        }
        function Tn(t) {
          var e = t.options;
          if (t.super) {
            var n = Tn(t.super), i = t.superOptions;
            if (n !== i) {
              t.superOptions = n;
              var E = Me(t);
              E && It(t.extendOptions, E), e = t.options = io(n, t.extendOptions), e.name && (e.components[e.name] = t);
            }
          }
          return e;
        }
        function Me(t) {
          var e, n = t.options, i = t.sealedOptions;
          for (var E in n)
            n[E] !== i[E] && (e || (e = {}), e[E] = n[E]);
          return e;
        }
        function Ae(t) {
          this._init(t);
        }
        function Ar(t) {
          t.use = function(e) {
            var n = this._installedPlugins || (this._installedPlugins = []);
            if (n.indexOf(e) > -1)
              return this;
            var i = Nt(arguments, 1);
            return i.unshift(this), typeof e.install == "function" ? e.install.apply(e, i) : typeof e == "function" && e.apply(null, i), n.push(e), this;
          };
        }
        function Lr(t) {
          t.mixin = function(e) {
            return this.options = io(this.options, e), this;
          };
        }
        function Er(t) {
          t.cid = 0;
          var e = 1;
          t.extend = function(n) {
            n = n || {};
            var i = this, E = i.cid, R = n._Ctor || (n._Ctor = {});
            if (R[E])
              return R[E];
            var V = n.name || i.options.name, K = function(Z) {
              this._init(Z);
            };
            return K.prototype = Object.create(i.prototype), K.prototype.constructor = K, K.cid = e++, K.options = io(i.options, n), K.super = i, K.options.props && Nr(K), K.options.computed && Ee(K), K.extend = i.extend, K.mixin = i.mixin, K.use = i.use, fe.forEach(function(Z) {
              K[Z] = i[Z];
            }), V && (K.options.components[V] = K), K.superOptions = i.options, K.extendOptions = n, K.sealedOptions = It({}, K.options), R[E] = K, K;
          };
        }
        function Nr(t) {
          var e = t.options.props;
          for (var n in e)
            Ft(t.prototype, "_props", n);
        }
        function Ee(t) {
          var e = t.options.computed;
          for (var n in e)
            Je(t.prototype, n, e[n]);
        }
        function Sr(t) {
          fe.forEach(function(e) {
            t[e] = function(n, i) {
              return i ? (e === "component" && a(i) && (i.name = i.name || n, i = this.options._base.extend(i)), e === "directive" && typeof i == "function" && (i = { bind: i, update: i }), this.options[e + "s"][n] = i, i) : this.options[e + "s"][n];
            };
          });
        }
        function En(t) {
          return t && (t.Ctor.options.name || t.tag);
        }
        function Gr(t, e) {
          return Array.isArray(t) ? t.indexOf(e) > -1 : typeof t == "string" ? t.split(",").indexOf(e) > -1 : !!f(t) && t.test(e);
        }
        function bn(t, e) {
          var n = t.cache, i = t.keys, E = t._vnode;
          for (var R in n) {
            var V = n[R];
            if (V) {
              var K = V.name;
              K && !e(K) && an(n, R, i, E);
            }
          }
        }
        function an(t, e, n, i) {
          var E = t[e];
          !E || i && E.tag === i.tag || E.componentInstance.$destroy(), t[e] = null, d(n, e);
        }
        Xn(Ae), Oo(Ae), Kn(Ae), wa(Ae), Ji(Ae);
        var dn = [String, RegExp, Array], yo = { name: "keep-alive", abstract: !0, props: { include: dn, exclude: dn, max: [String, Number] }, methods: { cacheVNode: function() {
          var t = this, e = t.cache, n = t.keys, i = t.vnodeToCache, E = t.keyToCache;
          if (i) {
            var R = i.tag, V = i.componentInstance, K = i.componentOptions;
            e[E] = { name: En(K), tag: R, componentInstance: V }, n.push(E), this.max && n.length > parseInt(this.max) && an(e, n[0], n, this._vnode), this.vnodeToCache = null;
          }
        } }, created: function() {
          this.cache = /* @__PURE__ */ Object.create(null), this.keys = [];
        }, destroyed: function() {
          for (var t in this.cache)
            an(this.cache, t, this.keys);
        }, mounted: function() {
          var t = this;
          this.cacheVNode(), this.$watch("include", function(e) {
            bn(t, function(n) {
              return Gr(e, n);
            });
          }), this.$watch("exclude", function(e) {
            bn(t, function(n) {
              return !Gr(e, n);
            });
          });
        }, updated: function() {
          this.cacheVNode();
        }, render: function() {
          var t = this.$slots.default, e = Ie(t), n = e && e.componentOptions;
          if (n) {
            var i = En(n), E = this, R = E.include, V = E.exclude;
            if (R && (!i || !Gr(R, i)) || V && i && Gr(V, i))
              return e;
            var K = this, Z = K.cache, vt = K.keys, _t = e.key == null ? n.Ctor.cid + (n.tag ? "::" + n.tag : "") : e.key;
            Z[_t] ? (e.componentInstance = Z[_t].componentInstance, d(vt, _t), vt.push(_t)) : (this.vnodeToCache = e, this.keyToCache = _t), e.data.keepAlive = !0;
          }
          return e || t && t[0];
        } }, jo = { KeepAlive: yo };
        function Qn(t) {
          var e = { get: function() {
            return be;
          } };
          Object.defineProperty(t, "config", e), t.util = { warn: Ge, extend: It, mergeOptions: io, defineReactive: _o }, t.set = _i, t.delete = Io, t.nextTick = xo, t.observable = function(n) {
            return oo(n), n;
          }, t.options = /* @__PURE__ */ Object.create(null), fe.forEach(function(n) {
            t.options[n + "s"] = /* @__PURE__ */ Object.create(null);
          }), t.options._base = t, It(t.options.components, jo), Ar(t), Lr(t), Er(t), Sr(t);
        }
        Qn(Ae), Object.defineProperty(Ae.prototype, "$isServer", { get: we }), Object.defineProperty(Ae.prototype, "$ssrContext", { get: function() {
          return this.$vnode && this.$vnode.ssrContext;
        } }), Object.defineProperty(Ae, "FunctionalRenderContext", { value: Pi }), Ae.version = "2.6.14";
        var si = b("style,class"), Vo = b("input,textarea,option,select,progress"), Ho = function(t, e, n) {
          return n === "value" && Vo(t) && e !== "button" || n === "selected" && t === "option" || n === "checked" && t === "input" || n === "muted" && t === "video";
        }, Yo = b("contenteditable,draggable,spellcheck"), xa = b("events,caret,typing,plaintext-only"), ea = function(t, e) {
          return ui(e) || e === "false" ? "false" : t === "contenteditable" && xa(e) ? e : "true";
        }, ci = b("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"), Mn = "http://www.w3.org/1999/xlink", Mi = function(t) {
          return t.charAt(5) === ":" && t.slice(0, 5) === "xlink";
        }, ra = function(t) {
          return Mi(t) ? t.slice(6, t.length) : "";
        }, ui = function(t) {
          return t == null || t === !1;
        };
        function li(t) {
          for (var e = t.data, n = t, i = t; m(i.componentInstance); )
            i = i.componentInstance._vnode, i && i.data && (e = na(i.data, e));
          for (; m(n = n.parent); )
            n && n.data && (e = na(e, n.data));
          return Sa(e.staticClass, e.class);
        }
        function na(t, e) {
          return { staticClass: zi(t.staticClass, e.staticClass), class: m(t.class) ? [t.class, e.class] : e.class };
        }
        function Sa(t, e) {
          return m(t) || m(e) ? zi(t, Di(e)) : "";
        }
        function zi(t, e) {
          return t ? e ? t + " " + e : t : e || "";
        }
        function Di(t) {
          return Array.isArray(t) ? ka(t) : g(t) ? Na(t) : typeof t == "string" ? t : "";
        }
        function ka(t) {
          for (var e, n = "", i = 0, E = t.length; i < E; i++)
            m(e = Di(t[i])) && e !== "" && (n && (n += " "), n += e);
          return n;
        }
        function Na(t) {
          var e = "";
          for (var n in t)
            t[n] && (e && (e += " "), e += n);
          return e;
        }
        var Tt = { svg: "http://www.w3.org/2000/svg", math: "http://www.w3.org/1998/Math/MathML" }, qt = b("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"), Gt = b("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0), ee = function(t) {
          return t === "pre";
        }, ae = function(t) {
          return qt(t) || Gt(t);
        };
        function ze(t) {
          return Gt(t) ? "svg" : t === "math" ? "math" : void 0;
        }
        var Ze = /* @__PURE__ */ Object.create(null);
        function rr(t) {
          if (!We)
            return !0;
          if (ae(t))
            return !1;
          if (t = t.toLowerCase(), Ze[t] != null)
            return Ze[t];
          var e = document.createElement(t);
          return t.indexOf("-") > -1 ? Ze[t] = e.constructor === window.HTMLUnknownElement || e.constructor === window.HTMLElement : Ze[t] = /HTMLUnknownElement/.test(e.toString());
        }
        var hr = b("text,number,password,search,email,tel,url");
        function $e(t) {
          if (typeof t == "string") {
            var e = document.querySelector(t);
            return e || document.createElement("div");
          }
          return t;
        }
        function Zr(t, e) {
          var n = document.createElement(t);
          return t !== "select" || e.data && e.data.attrs && e.data.attrs.multiple !== void 0 && n.setAttribute("multiple", "multiple"), n;
        }
        function Or(t, e) {
          return document.createElementNS(Tt[t], e);
        }
        function Fr(t) {
          return document.createTextNode(t);
        }
        function Br(t) {
          return document.createComment(t);
        }
        function lr(t, e, n) {
          t.insertBefore(e, n);
        }
        function jr(t, e) {
          t.removeChild(e);
        }
        function sn(t, e) {
          t.appendChild(e);
        }
        function nr(t) {
          return t.parentNode;
        }
        function cn(t) {
          return t.nextSibling;
        }
        function Xr(t) {
          return t.tagName;
        }
        function br(t, e) {
          t.textContent = e;
        }
        function Ur(t, e) {
          t.setAttribute(e, "");
        }
        var pn = Object.freeze({ createElement: Zr, createElementNS: Or, createTextNode: Fr, createComment: Br, insertBefore: lr, removeChild: jr, appendChild: sn, parentNode: nr, nextSibling: cn, tagName: Xr, setTextContent: br, setStyleScope: Ur }), fi = { create: function(t, e) {
          zn(e);
        }, update: function(t, e) {
          t.data.ref !== e.data.ref && (zn(t, !0), zn(e));
        }, destroy: function(t) {
          zn(t, !0);
        } };
        function zn(t, e) {
          var n = t.data.ref;
          if (m(n)) {
            var i = t.context, E = t.componentInstance || t.elm, R = i.$refs;
            e ? Array.isArray(R[n]) ? d(R[n], E) : R[n] === E && (R[n] = void 0) : t.data.refInFor ? Array.isArray(R[n]) ? R[n].indexOf(E) < 0 && R[n].push(E) : R[n] = [E] : R[n] = E;
          }
        }
        var Dn = new Jt("", {}, []), to = ["create", "activate", "update", "remove", "destroy"];
        function On(t, e) {
          return t.key === e.key && t.asyncFactory === e.asyncFactory && (t.tag === e.tag && t.isComment === e.isComment && m(t.data) === m(e.data) && he(t, e) || v(t.isAsyncPlaceholder) && $(e.asyncFactory.error));
        }
        function he(t, e) {
          if (t.tag !== "input")
            return !0;
          var n, i = m(n = t.data) && m(n = n.attrs) && n.type, E = m(n = e.data) && m(n = n.attrs) && n.type;
          return i === E || hr(i) && hr(E);
        }
        function er(t, e, n) {
          var i, E, R = {};
          for (i = e; i <= n; ++i)
            E = t[i].key, m(E) && (R[E] = i);
          return R;
        }
        function Xe(t) {
          var e, n, i = {}, E = t.modules, R = t.nodeOps;
          for (e = 0; e < to.length; ++e)
            for (i[to[e]] = [], n = 0; n < E.length; ++n)
              m(E[n][to[e]]) && i[to[e]].push(E[n][to[e]]);
          function V(nt) {
            return new Jt(R.tagName(nt).toLowerCase(), {}, [], void 0, nt);
          }
          function K(nt, dt) {
            function jt() {
              --jt.listeners === 0 && Z(nt);
            }
            return jt.listeners = dt, jt;
          }
          function Z(nt) {
            var dt = R.parentNode(nt);
            m(dt) && R.removeChild(dt, nt);
          }
          function vt(nt, dt, jt, Kt, ie, Le, Ne) {
            if (m(nt.elm) && m(Le) && (nt = Le[Ne] = Vt(nt)), nt.isRootInsert = !ie, !_t(nt, dt, jt, Kt)) {
              var Fe = nt.data, Cr = nt.children, Ye = nt.tag;
              m(Ye) ? (nt.elm = nt.ns ? R.createElementNS(nt.ns, Ye) : R.createElement(Ye, nt), Qe(nt), Ve(nt, Cr, dt), m(Fe) && Pr(nt, dt), le(jt, nt.elm, Kt)) : v(nt.isComment) ? (nt.elm = R.createComment(nt.text), le(jt, nt.elm, Kt)) : (nt.elm = R.createTextNode(nt.text), le(jt, nt.elm, Kt));
            }
          }
          function _t(nt, dt, jt, Kt) {
            var ie = nt.data;
            if (m(ie)) {
              var Le = m(nt.componentInstance) && ie.keepAlive;
              if (m(ie = ie.hook) && m(ie = ie.init) && ie(nt, !1), m(nt.componentInstance))
                return At(nt, dt), le(jt, nt.elm, Kt), v(Le) && Ht(nt, dt, jt, Kt), !0;
            }
          }
          function At(nt, dt) {
            m(nt.data.pendingInsert) && (dt.push.apply(dt, nt.data.pendingInsert), nt.data.pendingInsert = null), nt.elm = nt.componentInstance.$el, $r(nt) ? (Pr(nt, dt), Qe(nt)) : (zn(nt), dt.push(nt));
          }
          function Ht(nt, dt, jt, Kt) {
            for (var ie, Le = nt; Le.componentInstance; )
              if (Le = Le.componentInstance._vnode, m(ie = Le.data) && m(ie = ie.transition)) {
                for (ie = 0; ie < i.activate.length; ++ie)
                  i.activate[ie](Dn, Le);
                dt.push(Le);
                break;
              }
            le(jt, nt.elm, Kt);
          }
          function le(nt, dt, jt) {
            m(nt) && (m(jt) ? R.parentNode(jt) === nt && R.insertBefore(nt, dt, jt) : R.appendChild(nt, dt));
          }
          function Ve(nt, dt, jt) {
            if (Array.isArray(dt))
              for (var Kt = 0; Kt < dt.length; ++Kt)
                vt(dt[Kt], jt, nt.elm, null, !0, dt, Kt);
            else
              S(nt.text) && R.appendChild(nt.elm, R.createTextNode(String(nt.text)));
          }
          function $r(nt) {
            for (; nt.componentInstance; )
              nt = nt.componentInstance._vnode;
            return m(nt.tag);
          }
          function Pr(nt, dt) {
            for (var jt = 0; jt < i.create.length; ++jt)
              i.create[jt](Dn, nt);
            e = nt.data.hook, m(e) && (m(e.create) && e.create(Dn, nt), m(e.insert) && dt.push(nt));
          }
          function Qe(nt) {
            var dt;
            if (m(dt = nt.fnScopeId))
              R.setStyleScope(nt.elm, dt);
            else
              for (var jt = nt; jt; )
                m(dt = jt.context) && m(dt = dt.$options._scopeId) && R.setStyleScope(nt.elm, dt), jt = jt.parent;
            m(dt = yn) && dt !== nt.context && dt !== nt.fnContext && m(dt = dt.$options._scopeId) && R.setStyleScope(nt.elm, dt);
          }
          function ln(nt, dt, jt, Kt, ie, Le) {
            for (; Kt <= ie; ++Kt)
              vt(jt[Kt], Le, nt, dt, !1, jt, Kt);
          }
          function ro(nt) {
            var dt, jt, Kt = nt.data;
            if (m(Kt))
              for (m(dt = Kt.hook) && m(dt = dt.destroy) && dt(nt), dt = 0; dt < i.destroy.length; ++dt)
                i.destroy[dt](nt);
            if (m(dt = nt.children))
              for (jt = 0; jt < nt.children.length; ++jt)
                ro(nt.children[jt]);
          }
          function jn(nt, dt, jt) {
            for (; dt <= jt; ++dt) {
              var Kt = nt[dt];
              m(Kt) && (m(Kt.tag) ? (no(Kt), ro(Kt)) : Z(Kt.elm));
            }
          }
          function no(nt, dt) {
            if (m(dt) || m(nt.data)) {
              var jt, Kt = i.remove.length + 1;
              for (m(dt) ? dt.listeners += Kt : dt = K(nt.elm, Kt), m(jt = nt.componentInstance) && m(jt = jt._vnode) && m(jt.data) && no(jt, dt), jt = 0; jt < i.remove.length; ++jt)
                i.remove[jt](nt, dt);
              m(jt = nt.data.hook) && m(jt = jt.remove) ? jt(nt, dt) : dt();
            } else
              Z(nt.elm);
          }
          function Co(nt, dt, jt, Kt, ie) {
            for (var Le, Ne, Fe, Cr, Ye = 0, Rr = 0, wn = dt.length - 1, nn = dt[0], Fn = dt[wn], Bn = jt.length - 1, Un = jt[0], Ra = jt[Bn], Vs = !ie; Ye <= wn && Rr <= Bn; )
              $(nn) ? nn = dt[++Ye] : $(Fn) ? Fn = dt[--wn] : On(nn, Un) ? (bo(nn, Un, Kt, jt, Rr), nn = dt[++Ye], Un = jt[++Rr]) : On(Fn, Ra) ? (bo(Fn, Ra, Kt, jt, Bn), Fn = dt[--wn], Ra = jt[--Bn]) : On(nn, Ra) ? (bo(nn, Ra, Kt, jt, Bn), Vs && R.insertBefore(nt, nn.elm, R.nextSibling(Fn.elm)), nn = dt[++Ye], Ra = jt[--Bn]) : On(Fn, Un) ? (bo(Fn, Un, Kt, jt, Rr), Vs && R.insertBefore(nt, Fn.elm, nn.elm), Fn = dt[--wn], Un = jt[++Rr]) : ($(Le) && (Le = er(dt, Ye, wn)), Ne = m(Un.key) ? Le[Un.key] : tn(Un, dt, Ye, wn), $(Ne) ? vt(Un, Kt, nt, nn.elm, !1, jt, Rr) : (Fe = dt[Ne], On(Fe, Un) ? (bo(Fe, Un, Kt, jt, Rr), dt[Ne] = void 0, Vs && R.insertBefore(nt, Fe.elm, nn.elm)) : vt(Un, Kt, nt, nn.elm, !1, jt, Rr)), Un = jt[++Rr]);
            Ye > wn ? (Cr = $(jt[Bn + 1]) ? null : jt[Bn + 1].elm, ln(nt, Cr, jt, Rr, Bn, Kt)) : Rr > Bn && jn(dt, Ye, wn);
          }
          function tn(nt, dt, jt, Kt) {
            for (var ie = jt; ie < Kt; ie++) {
              var Le = dt[ie];
              if (m(Le) && On(nt, Le))
                return ie;
            }
          }
          function bo(nt, dt, jt, Kt, ie, Le) {
            if (nt !== dt) {
              m(dt.elm) && m(Kt) && (dt = Kt[ie] = Vt(dt));
              var Ne = dt.elm = nt.elm;
              if (v(nt.isAsyncPlaceholder))
                m(dt.asyncFactory.resolved) ? cr(nt.elm, dt, jt) : dt.isAsyncPlaceholder = !0;
              else if (v(dt.isStatic) && v(nt.isStatic) && dt.key === nt.key && (v(dt.isCloned) || v(dt.isOnce)))
                dt.componentInstance = nt.componentInstance;
              else {
                var Fe, Cr = dt.data;
                m(Cr) && m(Fe = Cr.hook) && m(Fe = Fe.prepatch) && Fe(nt, dt);
                var Ye = nt.children, Rr = dt.children;
                if (m(Cr) && $r(dt)) {
                  for (Fe = 0; Fe < i.update.length; ++Fe)
                    i.update[Fe](nt, dt);
                  m(Fe = Cr.hook) && m(Fe = Fe.update) && Fe(nt, dt);
                }
                $(dt.text) ? m(Ye) && m(Rr) ? Ye !== Rr && Co(Ne, Ye, Rr, jt, Le) : m(Rr) ? (m(nt.text) && R.setTextContent(Ne, ""), ln(Ne, null, Rr, 0, Rr.length - 1, jt)) : m(Ye) ? jn(Ye, 0, Ye.length - 1) : m(nt.text) && R.setTextContent(Ne, "") : nt.text !== dt.text && R.setTextContent(Ne, dt.text), m(Cr) && m(Fe = Cr.hook) && m(Fe = Fe.postpatch) && Fe(nt, dt);
              }
            }
          }
          function ca(nt, dt, jt) {
            if (v(jt) && m(nt.parent))
              nt.parent.data.pendingInsert = dt;
            else
              for (var Kt = 0; Kt < dt.length; ++Kt)
                dt[Kt].data.hook.insert(dt[Kt]);
          }
          var Ko = b("attrs,class,staticClass,staticStyle,key");
          function cr(nt, dt, jt, Kt) {
            var ie, Le = dt.tag, Ne = dt.data, Fe = dt.children;
            if (Kt = Kt || Ne && Ne.pre, dt.elm = nt, v(dt.isComment) && m(dt.asyncFactory))
              return dt.isAsyncPlaceholder = !0, !0;
            if (m(Ne) && (m(ie = Ne.hook) && m(ie = ie.init) && ie(dt, !0), m(ie = dt.componentInstance)))
              return At(dt, jt), !0;
            if (m(Le)) {
              if (m(Fe))
                if (nt.hasChildNodes())
                  if (m(ie = Ne) && m(ie = ie.domProps) && m(ie = ie.innerHTML)) {
                    if (ie !== nt.innerHTML)
                      return !1;
                  } else {
                    for (var Cr = !0, Ye = nt.firstChild, Rr = 0; Rr < Fe.length; Rr++) {
                      if (!Ye || !cr(Ye, Fe[Rr], jt, Kt)) {
                        Cr = !1;
                        break;
                      }
                      Ye = Ye.nextSibling;
                    }
                    if (!Cr || Ye)
                      return !1;
                  }
                else
                  Ve(dt, Fe, jt);
              if (m(Ne)) {
                var wn = !1;
                for (var nn in Ne)
                  if (!Ko(nn)) {
                    wn = !0, Pr(dt, jt);
                    break;
                  }
                !wn && Ne.class && Hn(Ne.class);
              }
            } else
              nt.data !== dt.text && (nt.data = dt.text);
            return !0;
          }
          return function(nt, dt, jt, Kt) {
            if (!$(dt)) {
              var ie = !1, Le = [];
              if ($(nt))
                ie = !0, vt(dt, Le);
              else {
                var Ne = m(nt.nodeType);
                if (!Ne && On(nt, dt))
                  bo(nt, dt, Le, null, null, Kt);
                else {
                  if (Ne) {
                    if (nt.nodeType === 1 && nt.hasAttribute(ye) && (nt.removeAttribute(ye), jt = !0), v(jt) && cr(nt, dt, Le))
                      return ca(dt, Le, !0), nt;
                    nt = V(nt);
                  }
                  var Fe = nt.elm, Cr = R.parentNode(Fe);
                  if (vt(dt, Le, Fe._leaveCb ? null : Cr, R.nextSibling(Fe)), m(dt.parent))
                    for (var Ye = dt.parent, Rr = $r(dt); Ye; ) {
                      for (var wn = 0; wn < i.destroy.length; ++wn)
                        i.destroy[wn](Ye);
                      if (Ye.elm = dt.elm, Rr) {
                        for (var nn = 0; nn < i.create.length; ++nn)
                          i.create[nn](Dn, Ye);
                        var Fn = Ye.data.hook.insert;
                        if (Fn.merged)
                          for (var Bn = 1; Bn < Fn.fns.length; Bn++)
                            Fn.fns[Bn]();
                      } else
                        zn(Ye);
                      Ye = Ye.parent;
                    }
                  m(Cr) ? jn([nt], 0, 0) : m(nt.tag) && ro(nt);
                }
              }
              return ca(dt, Le, ie), dt.elm;
            }
            m(nt) && ro(nt);
          };
        }
        var qe = { create: wr, update: wr, destroy: function(t) {
          wr(t, Dn);
        } };
        function wr(t, e) {
          (t.data.directives || e.data.directives) && or(t, e);
        }
        function or(t, e) {
          var n, i, E, R = t === Dn, V = e === Dn, K = mr(t.data.directives, t.context), Z = mr(e.data.directives, e.context), vt = [], _t = [];
          for (n in Z)
            i = K[n], E = Z[n], i ? (E.oldValue = i.value, E.oldArg = i.arg, se(E, "update", e, t), E.def && E.def.componentUpdated && _t.push(E)) : (se(E, "bind", e, t), E.def && E.def.inserted && vt.push(E));
          if (vt.length) {
            var At = function() {
              for (var Ht = 0; Ht < vt.length; Ht++)
                se(vt[Ht], "inserted", e, t);
            };
            R ? co(e, "insert", At) : At();
          }
          if (_t.length && co(e, "postpatch", function() {
            for (var Ht = 0; Ht < _t.length; Ht++)
              se(_t[Ht], "componentUpdated", e, t);
          }), !R)
            for (n in K)
              Z[n] || se(K[n], "unbind", t, t, V);
        }
        var Qr = /* @__PURE__ */ Object.create(null);
        function mr(t, e) {
          var n, i, E = /* @__PURE__ */ Object.create(null);
          if (!t)
            return E;
          for (n = 0; n < t.length; n++)
            i = t[n], i.modifiers || (i.modifiers = Qr), E[Qt(i)] = i, i.def = Xo(e.$options, "directives", i.name);
          return E;
        }
        function Qt(t) {
          return t.rawName || t.name + "." + Object.keys(t.modifiers || {}).join(".");
        }
        function se(t, e, n, i, E) {
          var R = t.def && t.def[e];
          if (R)
            try {
              R(n.elm, t, n, i, E);
            } catch (V) {
              An(V, n.context, "directive " + t.name + " " + e + " hook");
            }
        }
        var zt = [fi, qe];
        function _e(t, e) {
          var n = e.componentOptions;
          if ((!m(n) || n.Ctor.options.inheritAttrs !== !1) && (!$(t.data.attrs) || !$(e.data.attrs))) {
            var i, E, R, V = e.elm, K = t.data.attrs || {}, Z = e.data.attrs || {};
            for (i in m(Z.__ob__) && (Z = e.data.attrs = It({}, Z)), Z)
              E = Z[i], R = K[i], R !== E && $o(V, i, E, e.data.pre);
            for (i in (D || et) && Z.value !== K.value && $o(V, "value", Z.value), K)
              $(Z[i]) && (Mi(i) ? V.removeAttributeNS(Mn, ra(i)) : Yo(i) || V.removeAttribute(i));
          }
        }
        function $o(t, e, n, i) {
          i || t.tagName.indexOf("-") > -1 ? di(t, e, n) : ci(e) ? ui(n) ? t.removeAttribute(e) : (n = e === "allowfullscreen" && t.tagName === "EMBED" ? "true" : e, t.setAttribute(e, n)) : Yo(e) ? t.setAttribute(e, ea(e, n)) : Mi(e) ? ui(n) ? t.removeAttributeNS(Mn, ra(e)) : t.setAttributeNS(Mn, e, n) : di(t, e, n);
        }
        function di(t, e, n) {
          if (ui(n))
            t.removeAttribute(e);
          else {
            if (D && !W && t.tagName === "TEXTAREA" && e === "placeholder" && n !== "" && !t.__ieph) {
              var i = function(E) {
                E.stopImmediatePropagation(), t.removeEventListener("input", i);
              };
              t.addEventListener("input", i), t.__ieph = !0;
            }
            t.setAttribute(e, n);
          }
        }
        var pi = { create: _e, update: _e };
        function Wr(t, e) {
          var n = e.elm, i = e.data, E = t.data;
          if (!($(i.staticClass) && $(i.class) && ($(E) || $(E.staticClass) && $(E.class)))) {
            var R = li(e), V = n._transitionClasses;
            m(V) && (R = zi(R, Di(V))), R !== n._prevClass && (n.setAttribute("class", R), n._prevClass = R);
          }
        }
        var _r, un, Tr, eo, Aa, Fa, ys = { create: Wr, update: Wr }, bs = /[\w).+\-_$\]]/;
        function Ba(t) {
          var e, n, i, E, R, V = !1, K = !1, Z = !1, vt = !1, _t = 0, At = 0, Ht = 0, le = 0;
          for (i = 0; i < t.length; i++)
            if (n = e, e = t.charCodeAt(i), V)
              e === 39 && n !== 92 && (V = !1);
            else if (K)
              e === 34 && n !== 92 && (K = !1);
            else if (Z)
              e === 96 && n !== 92 && (Z = !1);
            else if (vt)
              e === 47 && n !== 92 && (vt = !1);
            else if (e !== 124 || t.charCodeAt(i + 1) === 124 || t.charCodeAt(i - 1) === 124 || _t || At || Ht) {
              switch (e) {
                case 34:
                  K = !0;
                  break;
                case 39:
                  V = !0;
                  break;
                case 96:
                  Z = !0;
                  break;
                case 40:
                  Ht++;
                  break;
                case 41:
                  Ht--;
                  break;
                case 91:
                  At++;
                  break;
                case 93:
                  At--;
                  break;
                case 123:
                  _t++;
                  break;
                case 125:
                  _t--;
                  break;
              }
              if (e === 47) {
                for (var Ve = i - 1, $r = void 0; Ve >= 0 && ($r = t.charAt(Ve), $r === " "); Ve--)
                  ;
                $r && bs.test($r) || (vt = !0);
              }
            } else
              E === void 0 ? (le = i + 1, E = t.slice(0, i).trim()) : Pr();
          function Pr() {
            (R || (R = [])).push(t.slice(le, i).trim()), le = i + 1;
          }
          if (E === void 0 ? E = t.slice(0, i).trim() : le !== 0 && Pr(), R)
            for (i = 0; i < R.length; i++)
              E = Ua(E, R[i]);
          return E;
        }
        function Ua(t, e) {
          var n = e.indexOf("(");
          if (n < 0)
            return '_f("' + e + '")(' + t + ")";
          var i = e.slice(0, n), E = e.slice(n + 1);
          return '_f("' + i + '")(' + t + (E !== ")" ? "," + E : E);
        }
        function Ja(t, e) {
          console.error("[Vue compiler]: " + t);
        }
        function oa(t, e) {
          return t ? t.map(function(n) {
            return n[e];
          }).filter(function(n) {
            return n;
          }) : [];
        }
        function hi(t, e, n, i, E) {
          (t.props || (t.props = [])).push(ia({ name: e, value: n, dynamic: E }, i)), t.plain = !1;
        }
        function Wa(t, e, n, i, E) {
          var R = E ? t.dynamicAttrs || (t.dynamicAttrs = []) : t.attrs || (t.attrs = []);
          R.push(ia({ name: e, value: n, dynamic: E }, i)), t.plain = !1;
        }
        function mi(t, e, n, i) {
          t.attrsMap[e] = n, t.attrsList.push(ia({ name: e, value: n }, i));
        }
        function ws(t, e, n, i, E, R, V, K) {
          (t.directives || (t.directives = [])).push(ia({ name: e, rawName: n, value: i, arg: E, isDynamicArg: R, modifiers: V }, K)), t.plain = !1;
        }
        function Zt(t, e, n) {
          return n ? "_p(" + e + ',"' + t + '")' : t + e;
        }
        function Po(t, e, n, i, E, R, V, K) {
          var Z;
          i = i || z, i.right ? K ? e = "(" + e + ")==='click'?'contextmenu':(" + e + ")" : e === "click" && (e = "contextmenu", delete i.right) : i.middle && (K ? e = "(" + e + ")==='click'?'mouseup':(" + e + ")" : e === "click" && (e = "mouseup")), i.capture && (delete i.capture, e = Zt("!", e, K)), i.once && (delete i.once, e = Zt("~", e, K)), i.passive && (delete i.passive, e = Zt("&", e, K)), i.native ? (delete i.native, Z = t.nativeEvents || (t.nativeEvents = {})) : Z = t.events || (t.events = {});
          var vt = ia({ value: n.trim(), dynamic: K }, V);
          i !== z && (vt.modifiers = i);
          var _t = Z[e];
          Array.isArray(_t) ? E ? _t.unshift(vt) : _t.push(vt) : Z[e] = _t ? E ? [vt, _t] : [_t, vt] : vt, t.plain = !1;
        }
        function _s(t, e) {
          return t.rawAttrsMap[":" + e] || t.rawAttrsMap["v-bind:" + e] || t.rawAttrsMap[e];
        }
        function Ln(t, e, n) {
          var i = Mr(t, ":" + e) || Mr(t, "v-bind:" + e);
          if (i != null)
            return Ba(i);
          if (n !== !1) {
            var E = Mr(t, e);
            if (E != null)
              return JSON.stringify(E);
          }
        }
        function Mr(t, e, n) {
          var i;
          if ((i = t.attrsMap[e]) != null) {
            for (var E = t.attrsList, R = 0, V = E.length; R < V; R++)
              if (E[R].name === e) {
                E.splice(R, 1);
                break;
              }
          }
          return n && delete t.attrsMap[e], i;
        }
        function Za(t, e) {
          for (var n = t.attrsList, i = 0, E = n.length; i < E; i++) {
            var R = n[i];
            if (e.test(R.name))
              return n.splice(i, 1), R;
          }
        }
        function ia(t, e) {
          return e && (e.start != null && (t.start = e.start), e.end != null && (t.end = e.end)), t;
        }
        function Xa(t, e, n) {
          var i = n || {}, E = i.number, R = i.trim, V = "$$v", K = V;
          R && (K = "(typeof " + V + " === 'string'? " + V + ".trim(): " + V + ")"), E && (K = "_n(" + K + ")");
          var Z = Go(e, K);
          t.model = { value: "(" + e + ")", expression: JSON.stringify(e), callback: "function (" + V + ") {" + Z + "}" };
        }
        function Go(t, e) {
          var n = Kr(t);
          return n.key === null ? t + "=" + e : "$set(" + n.exp + ", " + n.key + ", " + e + ")";
        }
        function Kr(t) {
          if (t = t.trim(), _r = t.length, t.indexOf("[") < 0 || t.lastIndexOf("]") < _r - 1)
            return eo = t.lastIndexOf("."), eo > -1 ? { exp: t.slice(0, eo), key: '"' + t.slice(eo + 1) + '"' } : { exp: t, key: null };
          for (un = t, eo = Aa = Fa = 0; !qa(); )
            Tr = Ea(), Qa(Tr) ? ts(Tr) : Tr === 91 && xs(Tr);
          return { exp: t.slice(0, Aa), key: t.slice(Aa + 1, Fa) };
        }
        function Ea() {
          return un.charCodeAt(++eo);
        }
        function qa() {
          return eo >= _r;
        }
        function Qa(t) {
          return t === 34 || t === 39;
        }
        function xs(t) {
          var e = 1;
          for (Aa = eo; !qa(); )
            if (t = Ea(), Qa(t))
              ts(t);
            else if (t === 91 && e++, t === 93 && e--, e === 0) {
              Fa = eo;
              break;
            }
        }
        function ts(t) {
          for (var e = t; !qa() && (t = Ea(), t !== e); )
            ;
        }
        var aa, Oa = "__r", Va = "__c";
        function Ha(t, e, n) {
          var i = e.value, E = e.modifiers, R = t.tag, V = t.attrsMap.type;
          if (t.component)
            return Xa(t, i, E), !1;
          if (R === "select")
            Ya(t, i, E);
          else if (R === "input" && V === "checkbox")
            es(t, i, E);
          else if (R === "input" && V === "radio")
            rs(t, i, E);
          else if (R === "input" || R === "textarea")
            Ga(t, i, E);
          else if (!be.isReservedTag(R))
            return Xa(t, i, E), !1;
          return !0;
        }
        function es(t, e, n) {
          var i = n && n.number, E = Ln(t, "value") || "null", R = Ln(t, "true-value") || "true", V = Ln(t, "false-value") || "false";
          hi(t, "checked", "Array.isArray(" + e + ")?_i(" + e + "," + E + ")>-1" + (R === "true" ? ":(" + e + ")" : ":_q(" + e + "," + R + ")")), Po(t, "change", "var $$a=" + e + ",$$el=$event.target,$$c=$$el.checked?(" + R + "):(" + V + ");if(Array.isArray($$a)){var $$v=" + (i ? "_n(" + E + ")" : E) + ",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(" + Go(e, "$$a.concat([$$v])") + ")}else{$$i>-1&&(" + Go(e, "$$a.slice(0,$$i).concat($$a.slice($$i+1))") + ")}}else{" + Go(e, "$$c") + "}", null, !0);
        }
        function rs(t, e, n) {
          var i = n && n.number, E = Ln(t, "value") || "null";
          E = i ? "_n(" + E + ")" : E, hi(t, "checked", "_q(" + e + "," + E + ")"), Po(t, "change", Go(e, E), null, !0);
        }
        function Ya(t, e, n) {
          var i = n && n.number, E = 'Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' + (i ? "_n(val)" : "val") + "})", R = "$event.target.multiple ? $$selectedVal : $$selectedVal[0]", V = "var $$selectedVal = " + E + ";";
          V = V + " " + Go(e, R), Po(t, "change", V, null, !0);
        }
        function Ga(t, e, n) {
          var i = t.attrsMap.type, E = n || {}, R = E.lazy, V = E.number, K = E.trim, Z = !R && i !== "range", vt = R ? "change" : i === "range" ? Oa : "input", _t = "$event.target.value";
          K && (_t = "$event.target.value.trim()"), V && (_t = "_n(" + _t + ")");
          var At = Go(e, _t);
          Z && (At = "if($event.target.composing)return;" + At), hi(t, "value", "(" + e + ")"), Po(t, vt, At, null, !0), (K || V) && Po(t, "blur", "$forceUpdate()");
        }
        function ns(t) {
          if (m(t[Oa])) {
            var e = D ? "change" : "input";
            t[e] = [].concat(t[Oa], t[e] || []), delete t[Oa];
          }
          m(t[Va]) && (t.change = [].concat(t[Va], t.change || []), delete t[Va]);
        }
        function Ss(t, e, n) {
          var i = aa;
          return function E() {
            var R = e.apply(null, arguments);
            R !== null && A(t, E, n, i);
          };
        }
        var r = Yr && !(yt && Number(yt[1]) <= 53);
        function _(t, e, n, i) {
          if (r) {
            var E = st, R = e;
            e = R._wrapper = function(V) {
              if (V.target === V.currentTarget || V.timeStamp >= E || V.timeStamp <= 0 || V.target.ownerDocument !== document)
                return R.apply(this, arguments);
            };
          }
          aa.addEventListener(t, e, Se ? { capture: n, passive: i } : n);
        }
        function A(t, e, n, i) {
          (i || aa).removeEventListener(t, e._wrapper || e, n);
        }
        function U(t, e) {
          if (!$(t.data.on) || !$(e.data.on)) {
            var n = e.data.on || {}, i = t.data.on || {};
            aa = e.elm, ns(n), Yn(n, i, _, A, Ss, e.context), aa = void 0;
          }
        }
        var H, tt = { create: U, update: U };
        function Q(t, e) {
          if (!$(t.data.domProps) || !$(e.data.domProps)) {
            var n, i, E = e.elm, R = t.data.domProps || {}, V = e.data.domProps || {};
            for (n in m(V.__ob__) && (V = e.data.domProps = It({}, V)), R)
              n in V || (E[n] = "");
            for (n in V) {
              if (i = V[n], n === "textContent" || n === "innerHTML") {
                if (e.children && (e.children.length = 0), i === R[n])
                  continue;
                E.childNodes.length === 1 && E.removeChild(E.childNodes[0]);
              }
              if (n === "value" && E.tagName !== "PROGRESS") {
                E._value = i;
                var K = $(i) ? "" : String(i);
                it(E, K) && (E.value = K);
              } else if (n === "innerHTML" && Gt(E.tagName) && $(E.innerHTML)) {
                H = H || document.createElement("div"), H.innerHTML = "<svg>" + i + "</svg>";
                for (var Z = H.firstChild; E.firstChild; )
                  E.removeChild(E.firstChild);
                for (; Z.firstChild; )
                  E.appendChild(Z.firstChild);
              } else if (i !== R[n])
                try {
                  E[n] = i;
                } catch {
                }
            }
          }
        }
        function it(t, e) {
          return !t.composing && (t.tagName === "OPTION" || lt(t, e) || kt(t, e));
        }
        function lt(t, e) {
          var n = !0;
          try {
            n = document.activeElement !== t;
          } catch {
          }
          return n && t.value !== e;
        }
        function kt(t, e) {
          var n = t.value, i = t._vModifiers;
          if (m(i)) {
            if (i.number)
              return s(n) !== s(e);
            if (i.trim)
              return n.trim() !== e.trim();
          }
          return n !== e;
        }
        var Rt = { create: Q, update: Q }, Ot = L(function(t) {
          var e = {}, n = /;(?![^(]*\))/g, i = /:(.+)/;
          return t.split(n).forEach(function(E) {
            if (E) {
              var R = E.split(i);
              R.length > 1 && (e[R[0].trim()] = R[1].trim());
            }
          }), e;
        });
        function $t(t) {
          var e = ne(t.style);
          return t.staticStyle ? It(t.staticStyle, e) : e;
        }
        function ne(t) {
          return Array.isArray(t) ? xe(t) : typeof t == "string" ? Ot(t) : t;
        }
        function De(t, e) {
          var n, i = {};
          if (e)
            for (var E = t; E.componentInstance; )
              E = E.componentInstance._vnode, E && E.data && (n = $t(E.data)) && It(i, n);
          (n = $t(t.data)) && It(i, n);
          for (var R = t; R = R.parent; )
            R.data && (n = $t(R.data)) && It(i, n);
          return i;
        }
        var oe, Te = /^--/, ir = /\s*!important$/, Li = function(t, e, n) {
          if (Te.test(e))
            t.style.setProperty(e, n);
          else if (ir.test(n))
            t.style.setProperty(ot(e), n.replace(ir, ""), "important");
          else {
            var i = Ka(e);
            if (Array.isArray(n))
              for (var E = 0, R = n.length; E < R; E++)
                t.style[i] = n[E];
            else
              t.style[i] = n;
          }
        }, vi = ["Webkit", "Moz", "ms"], Ka = L(function(t) {
          if (oe = oe || document.createElement("div").style, t = T(t), t !== "filter" && t in oe)
            return t;
          for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < vi.length; n++) {
            var i = vi[n] + e;
            if (i in oe)
              return i;
          }
        });
        function os(t, e) {
          var n = e.data, i = t.data;
          if (!($(n.staticStyle) && $(n.style) && $(i.staticStyle) && $(i.style))) {
            var E, R, V = e.elm, K = i.staticStyle, Z = i.normalizedStyle || i.style || {}, vt = K || Z, _t = ne(e.data.style) || {};
            e.data.normalizedStyle = m(_t.__ob__) ? It({}, _t) : _t;
            var At = De(e, !0);
            for (R in vt)
              $(At[R]) && Li(V, R, "");
            for (R in At)
              E = At[R], E !== vt[R] && Li(V, R, E == null ? "" : E);
          }
        }
        var is = { create: os, update: os }, as = /\s+/;
        function Ni(t, e) {
          if (e && (e = e.trim()))
            if (t.classList)
              e.indexOf(" ") > -1 ? e.split(as).forEach(function(i) {
                return t.classList.add(i);
              }) : t.classList.add(e);
            else {
              var n = " " + (t.getAttribute("class") || "") + " ";
              n.indexOf(" " + e + " ") < 0 && t.setAttribute("class", (n + e).trim());
            }
        }
        function qr(t, e) {
          if (e && (e = e.trim()))
            if (t.classList)
              e.indexOf(" ") > -1 ? e.split(as).forEach(function(E) {
                return t.classList.remove(E);
              }) : t.classList.remove(e), t.classList.length || t.removeAttribute("class");
            else {
              for (var n = " " + (t.getAttribute("class") || "") + " ", i = " " + e + " "; n.indexOf(i) >= 0; )
                n = n.replace(i, " ");
              n = n.trim(), n ? t.setAttribute("class", n) : t.removeAttribute("class");
            }
        }
        function Nn(t) {
          if (t) {
            if (typeof t == "object") {
              var e = {};
              return t.css !== !1 && It(e, gi(t.name || "v")), It(e, t), e;
            }
            return typeof t == "string" ? gi(t) : void 0;
          }
        }
        var gi = L(function(t) {
          return { enterClass: t + "-enter", enterToClass: t + "-enter-to", enterActiveClass: t + "-enter-active", leaveClass: t + "-leave", leaveToClass: t + "-leave-to", leaveActiveClass: t + "-leave-active" };
        }), ss = We && !W, ja = "transition", ks = "animation", cs = "transition", us = "transitionend", As = "animation", Ys = "animationend";
        ss && (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0 && (cs = "WebkitTransition", us = "webkitTransitionEnd"), window.onanimationend === void 0 && window.onwebkitanimationend !== void 0 && (As = "WebkitAnimation", Ys = "webkitAnimationEnd"));
        var Gs = We ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(t) {
          return t();
        };
        function Ks(t) {
          Gs(function() {
            Gs(t);
          });
        }
        function sa(t, e) {
          var n = t._transitionClasses || (t._transitionClasses = []);
          n.indexOf(e) < 0 && (n.push(e), Ni(t, e));
        }
        function yi(t, e) {
          t._transitionClasses && d(t._transitionClasses, e), qr(t, e);
        }
        function Js(t, e, n) {
          var i = Zs(t, e), E = i.type, R = i.timeout, V = i.propCount;
          if (!E)
            return n();
          var K = E === ja ? us : Ys, Z = 0, vt = function() {
            t.removeEventListener(K, _t), n();
          }, _t = function(At) {
            At.target === t && ++Z >= V && vt();
          };
          setTimeout(function() {
            Z < V && vt();
          }, R + 1), t.addEventListener(K, _t);
        }
        var Kc = /\b(transform|all)(,|$)/;
        function Zs(t, e) {
          var n, i = window.getComputedStyle(t), E = (i[cs + "Delay"] || "").split(", "), R = (i[cs + "Duration"] || "").split(", "), V = Xs(E, R), K = (i[As + "Delay"] || "").split(", "), Z = (i[As + "Duration"] || "").split(", "), vt = Xs(K, Z), _t = 0, At = 0;
          e === ja ? V > 0 && (n = ja, _t = V, At = R.length) : e === ks ? vt > 0 && (n = ks, _t = vt, At = Z.length) : (_t = Math.max(V, vt), n = _t > 0 ? V > vt ? ja : ks : null, At = n ? n === ja ? R.length : Z.length : 0);
          var Ht = n === ja && Kc.test(i[cs + "Property"]);
          return { type: n, timeout: _t, propCount: At, hasTransform: Ht };
        }
        function Xs(t, e) {
          for (; t.length < e.length; )
            t = t.concat(t);
          return Math.max.apply(null, e.map(function(n, i) {
            return Qs(n) + Qs(t[i]);
          }));
        }
        function Qs(t) {
          return 1e3 * Number(t.slice(0, -1).replace(",", "."));
        }
        function Es(t, e) {
          var n = t.elm;
          m(n._leaveCb) && (n._leaveCb.cancelled = !0, n._leaveCb());
          var i = Nn(t.data.transition);
          if (!$(i) && !m(n._enterCb) && n.nodeType === 1) {
            for (var E = i.css, R = i.type, V = i.enterClass, K = i.enterToClass, Z = i.enterActiveClass, vt = i.appearClass, _t = i.appearToClass, At = i.appearActiveClass, Ht = i.beforeEnter, le = i.enter, Ve = i.afterEnter, $r = i.enterCancelled, Pr = i.beforeAppear, Qe = i.appear, ln = i.afterAppear, ro = i.appearCancelled, jn = i.duration, no = yn, Co = yn.$vnode; Co && Co.parent; )
              no = Co.context, Co = Co.parent;
            var tn = !no._isMounted || !t.isRootInsert;
            if (!tn || Qe || Qe === "") {
              var bo = tn && vt ? vt : V, ca = tn && At ? At : Z, Ko = tn && _t ? _t : K, cr = tn && Pr || Ht, nt = tn && typeof Qe == "function" ? Qe : le, dt = tn && ln || Ve, jt = tn && ro || $r, Kt = s(g(jn) ? jn.enter : jn), ie = E !== !1 && !W, Le = Os(nt), Ne = n._enterCb = ce(function() {
                ie && (yi(n, Ko), yi(n, ca)), Ne.cancelled ? (ie && yi(n, bo), jt && jt(n)) : dt && dt(n), n._enterCb = null;
              });
              t.data.show || co(t, "insert", function() {
                var Fe = n.parentNode, Cr = Fe && Fe._pending && Fe._pending[t.key];
                Cr && Cr.tag === t.tag && Cr.elm._leaveCb && Cr.elm._leaveCb(), nt && nt(n, Ne);
              }), cr && cr(n), ie && (sa(n, bo), sa(n, ca), Ks(function() {
                yi(n, bo), Ne.cancelled || (sa(n, Ko), Le || (ec(Kt) ? setTimeout(Ne, Kt) : Js(n, R, Ne)));
              })), t.data.show && (e && e(), nt && nt(n, Ne)), ie || Le || Ne();
            }
          }
        }
        function tc(t, e) {
          var n = t.elm;
          m(n._enterCb) && (n._enterCb.cancelled = !0, n._enterCb());
          var i = Nn(t.data.transition);
          if ($(i) || n.nodeType !== 1)
            return e();
          if (!m(n._leaveCb)) {
            var E = i.css, R = i.type, V = i.leaveClass, K = i.leaveToClass, Z = i.leaveActiveClass, vt = i.beforeLeave, _t = i.leave, At = i.afterLeave, Ht = i.leaveCancelled, le = i.delayLeave, Ve = i.duration, $r = E !== !1 && !W, Pr = Os(_t), Qe = s(g(Ve) ? Ve.leave : Ve), ln = n._leaveCb = ce(function() {
              n.parentNode && n.parentNode._pending && (n.parentNode._pending[t.key] = null), $r && (yi(n, K), yi(n, Z)), ln.cancelled ? ($r && yi(n, V), Ht && Ht(n)) : (e(), At && At(n)), n._leaveCb = null;
            });
            le ? le(ro) : ro();
          }
          function ro() {
            ln.cancelled || (!t.data.show && n.parentNode && ((n.parentNode._pending || (n.parentNode._pending = {}))[t.key] = t), vt && vt(n), $r && (sa(n, V), sa(n, Z), Ks(function() {
              yi(n, V), ln.cancelled || (sa(n, K), Pr || (ec(Qe) ? setTimeout(ln, Qe) : Js(n, R, ln)));
            })), _t && _t(n, ln), $r || Pr || ln());
          }
        }
        function ec(t) {
          return typeof t == "number" && !isNaN(t);
        }
        function Os(t) {
          if ($(t))
            return !1;
          var e = t.fns;
          return m(e) ? Os(Array.isArray(e) ? e[0] : e) : (t._length || t.length) > 1;
        }
        function rc(t, e) {
          e.data.show !== !0 && Es(e);
        }
        var Jc = We ? { create: rc, activate: rc, remove: function(t, e) {
          t.data.show !== !0 ? tc(t, e) : e();
        } } : {}, Zc = [pi, ys, tt, Rt, is, Jc], Xc = Zc.concat(zt), Qc = Xe({ nodeOps: pn, modules: Xc });
        W && document.addEventListener("selectionchange", function() {
          var t = document.activeElement;
          t && t.vmodel && js(t, "input");
        });
        var nc = { inserted: function(t, e, n, i) {
          n.tag === "select" ? (i.elm && !i.elm._vOptions ? co(n, "postpatch", function() {
            nc.componentUpdated(t, e, n);
          }) : oc(t, e, n.context), t._vOptions = [].map.call(t.options, ls)) : (n.tag === "textarea" || hr(t.type)) && (t._vModifiers = e.modifiers, e.modifiers.lazy || (t.addEventListener("compositionstart", tu), t.addEventListener("compositionend", sc), t.addEventListener("change", sc), W && (t.vmodel = !0)));
        }, componentUpdated: function(t, e, n) {
          if (n.tag === "select") {
            oc(t, e, n.context);
            var i = t._vOptions, E = t._vOptions = [].map.call(t.options, ls);
            if (E.some(function(V, K) {
              return !xt(V, i[K]);
            })) {
              var R = t.multiple ? e.value.some(function(V) {
                return ac(V, E);
              }) : e.value !== e.oldValue && ac(e.value, E);
              R && js(t, "change");
            }
          }
        } };
        function oc(t, e, n) {
          ic(t, e), (D || et) && setTimeout(function() {
            ic(t, e);
          }, 0);
        }
        function ic(t, e, n) {
          var i = e.value, E = t.multiple;
          if (!E || Array.isArray(i)) {
            for (var R, V, K = 0, Z = t.options.length; K < Z; K++)
              if (V = t.options[K], E)
                R = Yt(i, ls(V)) > -1, V.selected !== R && (V.selected = R);
              else if (xt(ls(V), i))
                return void (t.selectedIndex !== K && (t.selectedIndex = K));
            E || (t.selectedIndex = -1);
          }
        }
        function ac(t, e) {
          return e.every(function(n) {
            return !xt(n, t);
          });
        }
        function ls(t) {
          return "_value" in t ? t._value : t.value;
        }
        function tu(t) {
          t.target.composing = !0;
        }
        function sc(t) {
          t.target.composing && (t.target.composing = !1, js(t.target, "input"));
        }
        function js(t, e) {
          var n = document.createEvent("HTMLEvents");
          n.initEvent(e, !0, !0), t.dispatchEvent(n);
        }
        function $s(t) {
          return !t.componentInstance || t.data && t.data.transition ? t : $s(t.componentInstance._vnode);
        }
        var eu = { bind: function(t, e, n) {
          var i = e.value;
          n = $s(n);
          var E = n.data && n.data.transition, R = t.__vOriginalDisplay = t.style.display === "none" ? "" : t.style.display;
          i && E ? (n.data.show = !0, Es(n, function() {
            t.style.display = R;
          })) : t.style.display = i ? R : "none";
        }, update: function(t, e, n) {
          var i = e.value, E = e.oldValue;
          if (!i != !E) {
            n = $s(n);
            var R = n.data && n.data.transition;
            R ? (n.data.show = !0, i ? Es(n, function() {
              t.style.display = t.__vOriginalDisplay;
            }) : tc(n, function() {
              t.style.display = "none";
            })) : t.style.display = i ? t.__vOriginalDisplay : "none";
          }
        }, unbind: function(t, e, n, i, E) {
          E || (t.style.display = t.__vOriginalDisplay);
        } }, ru = { model: nc, show: eu }, cc = { name: String, appear: Boolean, css: Boolean, mode: String, type: String, enterClass: String, leaveClass: String, enterToClass: String, leaveToClass: String, enterActiveClass: String, leaveActiveClass: String, appearClass: String, appearActiveClass: String, appearToClass: String, duration: [Number, String, Object] };
        function Ps(t) {
          var e = t && t.componentOptions;
          return e && e.Ctor.options.abstract ? Ps(Ie(e.children)) : t;
        }
        function uc(t) {
          var e = {}, n = t.$options;
          for (var i in n.propsData)
            e[i] = t[i];
          var E = n._parentListeners;
          for (var R in E)
            e[T(R)] = E[R];
          return e;
        }
        function lc(t, e) {
          if (/\d-keep-alive$/.test(e.tag))
            return t("keep-alive", { props: e.componentOptions.propsData });
        }
        function nu(t) {
          for (; t = t.parent; )
            if (t.data.transition)
              return !0;
        }
        function ou(t, e) {
          return e.key === t.key && e.tag === t.tag;
        }
        var iu = function(t) {
          return t.tag || No(t);
        }, au = function(t) {
          return t.name === "show";
        }, su = { name: "transition", props: cc, abstract: !0, render: function(t) {
          var e = this, n = this.$slots.default;
          if (n && (n = n.filter(iu), n.length)) {
            var i = this.mode, E = n[0];
            if (nu(this.$vnode))
              return E;
            var R = Ps(E);
            if (!R)
              return E;
            if (this._leaving)
              return lc(t, E);
            var V = "__transition-" + this._uid + "-";
            R.key = R.key == null ? R.isComment ? V + "comment" : V + R.tag : S(R.key) ? String(R.key).indexOf(V) === 0 ? R.key : V + R.key : R.key;
            var K = (R.data || (R.data = {})).transition = uc(this), Z = this._vnode, vt = Ps(Z);
            if (R.data.directives && R.data.directives.some(au) && (R.data.show = !0), vt && vt.data && !ou(R, vt) && !No(vt) && (!vt.componentInstance || !vt.componentInstance._vnode.isComment)) {
              var _t = vt.data.transition = It({}, K);
              if (i === "out-in")
                return this._leaving = !0, co(_t, "afterLeave", function() {
                  e._leaving = !1, e.$forceUpdate();
                }), lc(t, E);
              if (i === "in-out") {
                if (No(R))
                  return Z;
                var At, Ht = function() {
                  At();
                };
                co(K, "afterEnter", Ht), co(K, "enterCancelled", Ht), co(_t, "delayLeave", function(le) {
                  At = le;
                });
              }
            }
            return E;
          }
        } }, fc = It({ tag: String, moveClass: String }, cc);
        delete fc.mode;
        var cu = { props: fc, beforeMount: function() {
          var t = this, e = this._update;
          this._update = function(n, i) {
            var E = qo(t);
            t.__patch__(t._vnode, t.kept, !1, !0), t._vnode = t.kept, E(), e.call(t, n, i);
          };
        }, render: function(t) {
          for (var e = this.tag || this.$vnode.data.tag || "span", n = /* @__PURE__ */ Object.create(null), i = this.prevChildren = this.children, E = this.$slots.default || [], R = this.children = [], V = uc(this), K = 0; K < E.length; K++) {
            var Z = E[K];
            Z.tag && Z.key != null && String(Z.key).indexOf("__vlist") !== 0 && (R.push(Z), n[Z.key] = Z, (Z.data || (Z.data = {})).transition = V);
          }
          if (i) {
            for (var vt = [], _t = [], At = 0; At < i.length; At++) {
              var Ht = i[At];
              Ht.data.transition = V, Ht.data.pos = Ht.elm.getBoundingClientRect(), n[Ht.key] ? vt.push(Ht) : _t.push(Ht);
            }
            this.kept = t(e, null, vt), this.removed = _t;
          }
          return t(e, null, R);
        }, updated: function() {
          var t = this.prevChildren, e = this.moveClass || (this.name || "v") + "-move";
          t.length && this.hasMove(t[0].elm, e) && (t.forEach(uu), t.forEach(lu), t.forEach(fu), this._reflow = document.body.offsetHeight, t.forEach(function(n) {
            if (n.data.moved) {
              var i = n.elm, E = i.style;
              sa(i, e), E.transform = E.WebkitTransform = E.transitionDuration = "", i.addEventListener(us, i._moveCb = function R(V) {
                V && V.target !== i || V && !/transform$/.test(V.propertyName) || (i.removeEventListener(us, R), i._moveCb = null, yi(i, e));
              });
            }
          }));
        }, methods: { hasMove: function(t, e) {
          if (!ss)
            return !1;
          if (this._hasMove)
            return this._hasMove;
          var n = t.cloneNode();
          t._transitionClasses && t._transitionClasses.forEach(function(E) {
            qr(n, E);
          }), Ni(n, e), n.style.display = "none", this.$el.appendChild(n);
          var i = Zs(n);
          return this.$el.removeChild(n), this._hasMove = i.hasTransform;
        } } };
        function uu(t) {
          t.elm._moveCb && t.elm._moveCb(), t.elm._enterCb && t.elm._enterCb();
        }
        function lu(t) {
          t.data.newPos = t.elm.getBoundingClientRect();
        }
        function fu(t) {
          var e = t.data.pos, n = t.data.newPos, i = e.left - n.left, E = e.top - n.top;
          if (i || E) {
            t.data.moved = !0;
            var R = t.elm.style;
            R.transform = R.WebkitTransform = "translate(" + i + "px," + E + "px)", R.transitionDuration = "0s";
          }
        }
        var du = { Transition: su, TransitionGroup: cu };
        Ae.config.mustUseProp = Ho, Ae.config.isReservedTag = ae, Ae.config.isReservedAttr = si, Ae.config.getTagNamespace = ze, Ae.config.isUnknownElement = rr, It(Ae.options.directives, ru), It(Ae.options.components, du), Ae.prototype.__patch__ = We ? Qc : mt, Ae.prototype.$mount = function(t, e) {
          return t = t && We ? $e(t) : void 0, La(this, t, e);
        }, We && setTimeout(function() {
          be.devtools && ke && ke.emit("init", Ae);
        }, 0);
        var pu = /\{\{((?:.|\r?\n)+?)\}\}/g, dc = /[-.*+?^${}()|[\]\/\\]/g, hu = L(function(t) {
          var e = t[0].replace(dc, "\\$&"), n = t[1].replace(dc, "\\$&");
          return new RegExp(e + "((?:.|\\n)+?)" + n, "g");
        });
        function mu(t, e) {
          var n = e ? hu(e) : pu;
          if (n.test(t)) {
            for (var i, E, R, V = [], K = [], Z = n.lastIndex = 0; i = n.exec(t); ) {
              E = i.index, E > Z && (K.push(R = t.slice(Z, E)), V.push(JSON.stringify(R)));
              var vt = Ba(i[1].trim());
              V.push("_s(" + vt + ")"), K.push({ "@binding": vt }), Z = E + i[0].length;
            }
            return Z < t.length && (K.push(R = t.slice(Z)), V.push(JSON.stringify(R))), { expression: V.join("+"), tokens: K };
          }
        }
        function vu(t, e) {
          e.warn;
          var n = Mr(t, "class");
          n && (t.staticClass = JSON.stringify(n));
          var i = Ln(t, "class", !1);
          i && (t.classBinding = i);
        }
        function gu(t) {
          var e = "";
          return t.staticClass && (e += "staticClass:" + t.staticClass + ","), t.classBinding && (e += "class:" + t.classBinding + ","), e;
        }
        var yu = { staticKeys: ["staticClass"], transformNode: vu, genData: gu };
        function bu(t, e) {
          e.warn;
          var n = Mr(t, "style");
          n && (t.staticStyle = JSON.stringify(Ot(n)));
          var i = Ln(t, "style", !1);
          i && (t.styleBinding = i);
        }
        function wu(t) {
          var e = "";
          return t.staticStyle && (e += "staticStyle:" + t.staticStyle + ","), t.styleBinding && (e += "style:(" + t.styleBinding + "),"), e;
        }
        var fs, _u = { staticKeys: ["staticStyle"], transformNode: bu, genData: wu }, xu = { decode: function(t) {
          return fs = fs || document.createElement("div"), fs.innerHTML = t, fs.textContent;
        } }, Su = b("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"), ku = b("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"), Au = b("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"), Eu = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/, Ou = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/, pc = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + ar.source + "]*", hc = "((?:" + pc + "\\:)?" + pc + ")", mc = new RegExp("^<" + hc), ju = /^\s*(\/?)>/, vc = new RegExp("^<\\/" + hc + "[^>]*>"), $u = /^<!DOCTYPE [^>]+>/i, gc = /^<!\--/, yc = /^<!\[/, bc = b("script,style,textarea", !0), wc = {}, Pu = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&amp;": "&", "&#10;": `
`, "&#9;": "	", "&#39;": "'" }, Cu = /&(?:lt|gt|quot|amp|#39);/g, Ru = /&(?:lt|gt|quot|amp|#39|#10|#9);/g, Iu = b("pre,textarea", !0), _c = function(t, e) {
          return t && Iu(t) && e[0] === `
`;
        };
        function Tu(t, e) {
          var n = e ? Ru : Cu;
          return t.replace(n, function(i) {
            return Pu[i];
          });
        }
        function Mu(t, e) {
          for (var n, i, E = [], R = e.expectHTML, V = e.isUnaryTag || pt, K = e.canBeLeftOpenTag || pt, Z = 0; t; ) {
            if (n = t, i && bc(i)) {
              var vt = 0, _t = i.toLowerCase(), At = wc[_t] || (wc[_t] = new RegExp("([\\s\\S]*?)(</" + _t + "[^>]*>)", "i")), Ht = t.replace(At, function(cr, nt, dt) {
                return vt = dt.length, bc(_t) || _t === "noscript" || (nt = nt.replace(/<!\--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), _c(_t, nt) && (nt = nt.slice(1)), e.chars && e.chars(nt), "";
              });
              Z += t.length - Ht.length, t = Ht, Ko(_t, Z - vt, Z);
            } else {
              var le = t.indexOf("<");
              if (le === 0) {
                if (gc.test(t)) {
                  var Ve = t.indexOf("-->");
                  if (Ve >= 0) {
                    e.shouldKeepComment && e.comment(t.substring(4, Ve), Z, Z + Ve + 3), tn(Ve + 3);
                    continue;
                  }
                }
                if (yc.test(t)) {
                  var $r = t.indexOf("]>");
                  if ($r >= 0) {
                    tn($r + 2);
                    continue;
                  }
                }
                var Pr = t.match($u);
                if (Pr) {
                  tn(Pr[0].length);
                  continue;
                }
                var Qe = t.match(vc);
                if (Qe) {
                  var ln = Z;
                  tn(Qe[0].length), Ko(Qe[1], ln, Z);
                  continue;
                }
                var ro = bo();
                if (ro) {
                  ca(ro), _c(ro.tagName, t) && tn(1);
                  continue;
                }
              }
              var jn = void 0, no = void 0, Co = void 0;
              if (le >= 0) {
                for (no = t.slice(le); !vc.test(no) && !mc.test(no) && !gc.test(no) && !yc.test(no) && (Co = no.indexOf("<", 1), !(Co < 0)); )
                  le += Co, no = t.slice(le);
                jn = t.substring(0, le);
              }
              le < 0 && (jn = t), jn && tn(jn.length), e.chars && jn && e.chars(jn, Z - jn.length, Z);
            }
            if (t === n) {
              e.chars && e.chars(t);
              break;
            }
          }
          function tn(cr) {
            Z += cr, t = t.substring(cr);
          }
          function bo() {
            var cr = t.match(mc);
            if (cr) {
              var nt, dt, jt = { tagName: cr[1], attrs: [], start: Z };
              for (tn(cr[0].length); !(nt = t.match(ju)) && (dt = t.match(Ou) || t.match(Eu)); )
                dt.start = Z, tn(dt[0].length), dt.end = Z, jt.attrs.push(dt);
              if (nt)
                return jt.unarySlash = nt[1], tn(nt[0].length), jt.end = Z, jt;
            }
          }
          function ca(cr) {
            var nt = cr.tagName, dt = cr.unarySlash;
            R && (i === "p" && Au(nt) && Ko(i), K(nt) && i === nt && Ko(nt));
            for (var jt = V(nt) || !!dt, Kt = cr.attrs.length, ie = new Array(Kt), Le = 0; Le < Kt; Le++) {
              var Ne = cr.attrs[Le], Fe = Ne[3] || Ne[4] || Ne[5] || "", Cr = nt === "a" && Ne[1] === "href" ? e.shouldDecodeNewlinesForHref : e.shouldDecodeNewlines;
              ie[Le] = { name: Ne[1], value: Tu(Fe, Cr) };
            }
            jt || (E.push({ tag: nt, lowerCasedTag: nt.toLowerCase(), attrs: ie, start: cr.start, end: cr.end }), i = nt), e.start && e.start(nt, ie, jt, cr.start, cr.end);
          }
          function Ko(cr, nt, dt) {
            var jt, Kt;
            if (nt == null && (nt = Z), dt == null && (dt = Z), cr)
              for (Kt = cr.toLowerCase(), jt = E.length - 1; jt >= 0 && E[jt].lowerCasedTag !== Kt; jt--)
                ;
            else
              jt = 0;
            if (jt >= 0) {
              for (var ie = E.length - 1; ie >= jt; ie--)
                e.end && e.end(E[ie].tag, nt, dt);
              E.length = jt, i = jt && E[jt - 1].tag;
            } else
              Kt === "br" ? e.start && e.start(cr, [], !0, nt, dt) : Kt === "p" && (e.start && e.start(cr, [], !1, nt, dt), e.end && e.end(cr, nt, dt));
          }
          Ko();
        }
        var $a, xc, Cs, Rs, Is, Ts, Ms, Sc, kc = /^@|^v-on:/, zs = /^v-|^@|^:|^#/, zu = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Ac = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, Du = /^\(|\)$/g, ds = /^\[.*\]$/, Lu = /:(.*)$/, Ec = /^:|^\.|^v-bind:/, Oc = /\.[^.\]]+(?=[^\]]*$)/g, Ds = /^v-slot(:|$)|^#/, Nu = /[\r\n]/, Fu = /[ \f\t\r\n]+/g, Bu = L(xu.decode), ps = "_empty_";
        function Ls(t, e, n) {
          return { type: 1, tag: t, attrsList: e, attrsMap: ol(e), rawAttrsMap: {}, parent: n, children: [] };
        }
        function Uu(t, e) {
          $a = e.warn || Ja, Ts = e.isPreTag || pt, Ms = e.mustUseProp || pt, Sc = e.getTagNamespace || pt, e.isReservedTag, Cs = oa(e.modules, "transformNode"), Rs = oa(e.modules, "preTransformNode"), Is = oa(e.modules, "postTransformNode"), xc = e.delimiters;
          var n, i, E = [], R = e.preserveWhitespace !== !1, V = e.whitespace, K = !1, Z = !1;
          function vt(At) {
            if (_t(At), K || At.processed || (At = hs(At, e)), E.length || At === n || n.if && (At.elseif || At.else) && Pa(n, { exp: At.elseif, block: At }), i && !At.forbidden)
              if (At.elseif || At.else)
                Ku(At, i);
              else {
                if (At.slotScope) {
                  var Ht = At.slotTarget || '"default"';
                  (i.scopedSlots || (i.scopedSlots = {}))[Ht] = At;
                }
                i.children.push(At), At.parent = i;
              }
            At.children = At.children.filter(function(Ve) {
              return !Ve.slotScope;
            }), _t(At), At.pre && (K = !1), Ts(At.tag) && (Z = !1);
            for (var le = 0; le < Is.length; le++)
              Is[le](At, e);
          }
          function _t(At) {
            var Ht;
            if (!Z)
              for (; (Ht = At.children[At.children.length - 1]) && Ht.type === 3 && Ht.text === " "; )
                At.children.pop();
          }
          return Mu(t, { warn: $a, expectHTML: e.expectHTML, isUnaryTag: e.isUnaryTag, canBeLeftOpenTag: e.canBeLeftOpenTag, shouldDecodeNewlines: e.shouldDecodeNewlines, shouldDecodeNewlinesForHref: e.shouldDecodeNewlinesForHref, shouldKeepComment: e.comments, outputSourceRange: e.outputSourceRange, start: function(At, Ht, le, Ve, $r) {
            var Pr = i && i.ns || Sc(At);
            D && Pr === "svg" && (Ht = ul(Ht));
            var Qe = Ls(At, Ht, i);
            Pr && (Qe.ns = Pr), al(Qe) && !we() && (Qe.forbidden = !0);
            for (var ln = 0; ln < Rs.length; ln++)
              Qe = Rs[ln](Qe, e) || Qe;
            K || (Wu(Qe), Qe.pre && (K = !0)), Ts(Qe.tag) && (Z = !0), K ? qu(Qe) : Qe.processed || (jc(Qe), Gu(Qe), Zu(Qe)), n || (n = Qe), le ? vt(Qe) : (i = Qe, E.push(Qe));
          }, end: function(At, Ht, le) {
            var Ve = E[E.length - 1];
            E.length -= 1, i = E[E.length - 1], vt(Ve);
          }, chars: function(At, Ht, le) {
            if (i && (!D || i.tag !== "textarea" || i.attrsMap.placeholder !== At)) {
              var Ve, $r, Pr = i.children;
              At = Z || At.trim() ? il(i) ? At : Bu(At) : Pr.length ? V ? V === "condense" && Nu.test(At) ? "" : " " : R ? " " : "" : "", At && (Z || V !== "condense" || (At = At.replace(Fu, " ")), !K && At !== " " && (Ve = mu(At, xc)) ? $r = { type: 2, expression: Ve.expression, tokens: Ve.tokens, text: At } : At === " " && Pr.length && Pr[Pr.length - 1].text === " " || ($r = { type: 3, text: At }), $r && Pr.push($r));
            }
          }, comment: function(At, Ht, le) {
            if (i) {
              var Ve = { type: 3, text: At, isComment: !0 };
              i.children.push(Ve);
            }
          } }), n;
        }
        function Wu(t) {
          Mr(t, "v-pre") != null && (t.pre = !0);
        }
        function qu(t) {
          var e = t.attrsList, n = e.length;
          if (n)
            for (var i = t.attrs = new Array(n), E = 0; E < n; E++)
              i[E] = { name: e[E].name, value: JSON.stringify(e[E].value) }, e[E].start != null && (i[E].start = e[E].start, i[E].end = e[E].end);
          else
            t.pre || (t.plain = !0);
        }
        function hs(t, e) {
          Vu(t), t.plain = !t.key && !t.scopedSlots && !t.attrsList.length, Hu(t), Xu(t), Qu(t), tl(t);
          for (var n = 0; n < Cs.length; n++)
            t = Cs[n](t, e) || t;
          return el(t), t;
        }
        function Vu(t) {
          var e = Ln(t, "key");
          e && (t.key = e);
        }
        function Hu(t) {
          var e = Ln(t, "ref");
          e && (t.ref = e, t.refInFor = rl(t));
        }
        function jc(t) {
          var e;
          if (e = Mr(t, "v-for")) {
            var n = Yu(e);
            n && It(t, n);
          }
        }
        function Yu(t) {
          var e = t.match(zu);
          if (e) {
            var n = {};
            n.for = e[2].trim();
            var i = e[1].trim().replace(Du, ""), E = i.match(Ac);
            return E ? (n.alias = i.replace(Ac, "").trim(), n.iterator1 = E[1].trim(), E[2] && (n.iterator2 = E[2].trim())) : n.alias = i, n;
          }
        }
        function Gu(t) {
          var e = Mr(t, "v-if");
          if (e)
            t.if = e, Pa(t, { exp: e, block: t });
          else {
            Mr(t, "v-else") != null && (t.else = !0);
            var n = Mr(t, "v-else-if");
            n && (t.elseif = n);
          }
        }
        function Ku(t, e) {
          var n = Ju(e.children);
          n && n.if && Pa(n, { exp: t.elseif, block: t });
        }
        function Ju(t) {
          for (var e = t.length; e--; ) {
            if (t[e].type === 1)
              return t[e];
            t.pop();
          }
        }
        function Pa(t, e) {
          t.ifConditions || (t.ifConditions = []), t.ifConditions.push(e);
        }
        function Zu(t) {
          var e = Mr(t, "v-once");
          e != null && (t.once = !0);
        }
        function Xu(t) {
          var e;
          t.tag === "template" ? (e = Mr(t, "scope"), t.slotScope = e || Mr(t, "slot-scope")) : (e = Mr(t, "slot-scope")) && (t.slotScope = e);
          var n = Ln(t, "slot");
          if (n && (t.slotTarget = n === '""' ? '"default"' : n, t.slotTargetDynamic = !(!t.attrsMap[":slot"] && !t.attrsMap["v-bind:slot"]), t.tag === "template" || t.slotScope || Wa(t, "slot", n, _s(t, "slot"))), t.tag === "template") {
            var i = Za(t, Ds);
            if (i) {
              var E = $c(i), R = E.name, V = E.dynamic;
              t.slotTarget = R, t.slotTargetDynamic = V, t.slotScope = i.value || ps;
            }
          } else {
            var K = Za(t, Ds);
            if (K) {
              var Z = t.scopedSlots || (t.scopedSlots = {}), vt = $c(K), _t = vt.name, At = vt.dynamic, Ht = Z[_t] = Ls("template", [], t);
              Ht.slotTarget = _t, Ht.slotTargetDynamic = At, Ht.children = t.children.filter(function(le) {
                if (!le.slotScope)
                  return le.parent = Ht, !0;
              }), Ht.slotScope = K.value || ps, t.children = [], t.plain = !1;
            }
          }
        }
        function $c(t) {
          var e = t.name.replace(Ds, "");
          return e || t.name[0] !== "#" && (e = "default"), ds.test(e) ? { name: e.slice(1, -1), dynamic: !0 } : { name: '"' + e + '"', dynamic: !1 };
        }
        function Qu(t) {
          t.tag === "slot" && (t.slotName = Ln(t, "name"));
        }
        function tl(t) {
          var e;
          (e = Ln(t, "is")) && (t.component = e), Mr(t, "inline-template") != null && (t.inlineTemplate = !0);
        }
        function el(t) {
          var e, n, i, E, R, V, K, Z, vt = t.attrsList;
          for (e = 0, n = vt.length; e < n; e++)
            if (i = E = vt[e].name, R = vt[e].value, zs.test(i))
              if (t.hasBindings = !0, V = nl(i.replace(zs, "")), V && (i = i.replace(Oc, "")), Ec.test(i))
                i = i.replace(Ec, ""), R = Ba(R), Z = ds.test(i), Z && (i = i.slice(1, -1)), V && (V.prop && !Z && (i = T(i), i === "innerHtml" && (i = "innerHTML")), V.camel && !Z && (i = T(i)), V.sync && (K = Go(R, "$event"), Z ? Po(t, '"update:"+(' + i + ")", K, null, !1, $a, vt[e], !0) : (Po(t, "update:" + T(i), K, null, !1, $a, vt[e]), ot(i) !== T(i) && Po(t, "update:" + ot(i), K, null, !1, $a, vt[e])))), V && V.prop || !t.component && Ms(t.tag, t.attrsMap.type, i) ? hi(t, i, R, vt[e], Z) : Wa(t, i, R, vt[e], Z);
              else if (kc.test(i))
                i = i.replace(kc, ""), Z = ds.test(i), Z && (i = i.slice(1, -1)), Po(t, i, R, V, !1, $a, vt[e], Z);
              else {
                i = i.replace(zs, "");
                var _t = i.match(Lu), At = _t && _t[1];
                Z = !1, At && (i = i.slice(0, -(At.length + 1)), ds.test(At) && (At = At.slice(1, -1), Z = !0)), ws(t, i, E, R, At, Z, V, vt[e]);
              }
            else
              Wa(t, i, JSON.stringify(R), vt[e]), !t.component && i === "muted" && Ms(t.tag, t.attrsMap.type, i) && hi(t, i, "true", vt[e]);
        }
        function rl(t) {
          for (var e = t; e; ) {
            if (e.for !== void 0)
              return !0;
            e = e.parent;
          }
          return !1;
        }
        function nl(t) {
          var e = t.match(Oc);
          if (e) {
            var n = {};
            return e.forEach(function(i) {
              n[i.slice(1)] = !0;
            }), n;
          }
        }
        function ol(t) {
          for (var e = {}, n = 0, i = t.length; n < i; n++)
            e[t[n].name] = t[n].value;
          return e;
        }
        function il(t) {
          return t.tag === "script" || t.tag === "style";
        }
        function al(t) {
          return t.tag === "style" || t.tag === "script" && (!t.attrsMap.type || t.attrsMap.type === "text/javascript");
        }
        var sl = /^xmlns:NS\d+/, cl = /^NS\d+:/;
        function ul(t) {
          for (var e = [], n = 0; n < t.length; n++) {
            var i = t[n];
            sl.test(i.name) || (i.name = i.name.replace(cl, ""), e.push(i));
          }
          return e;
        }
        function ll(t, e) {
          if (t.tag === "input") {
            var n, i = t.attrsMap;
            if (!i["v-model"])
              return;
            if ((i[":type"] || i["v-bind:type"]) && (n = Ln(t, "type")), i.type || n || !i["v-bind"] || (n = "(" + i["v-bind"] + ").type"), n) {
              var E = Mr(t, "v-if", !0), R = E ? "&&(" + E + ")" : "", V = Mr(t, "v-else", !0) != null, K = Mr(t, "v-else-if", !0), Z = Ns(t);
              jc(Z), mi(Z, "type", "checkbox"), hs(Z, e), Z.processed = !0, Z.if = "(" + n + ")==='checkbox'" + R, Pa(Z, { exp: Z.if, block: Z });
              var vt = Ns(t);
              Mr(vt, "v-for", !0), mi(vt, "type", "radio"), hs(vt, e), Pa(Z, { exp: "(" + n + ")==='radio'" + R, block: vt });
              var _t = Ns(t);
              return Mr(_t, "v-for", !0), mi(_t, ":type", n), hs(_t, e), Pa(Z, { exp: E, block: _t }), V ? Z.else = !0 : K && (Z.elseif = K), Z;
            }
          }
        }
        function Ns(t) {
          return Ls(t.tag, t.attrsList.slice(), t.parent);
        }
        var fl = { preTransformNode: ll }, Pc = [yu, _u, fl];
        function dl(t, e) {
          e.value && hi(t, "textContent", "_s(" + e.value + ")", e);
        }
        function pl(t, e) {
          e.value && hi(t, "innerHTML", "_s(" + e.value + ")", e);
        }
        var Cc, Fs, hl = { model: Ha, text: dl, html: pl }, ml = { expectHTML: !0, modules: Pc, directives: hl, isPreTag: ee, isUnaryTag: Su, mustUseProp: Ho, canBeLeftOpenTag: ku, isReservedTag: ae, getTagNamespace: ze, staticKeys: Mt(Pc) }, vl = L(yl);
        function gl(t, e) {
          t && (Cc = vl(e.staticKeys || ""), Fs = e.isReservedTag || pt, Bs(t), Us(t, !1));
        }
        function yl(t) {
          return b("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" + (t ? "," + t : ""));
        }
        function Bs(t) {
          if (t.static = bl(t), t.type === 1) {
            if (!Fs(t.tag) && t.tag !== "slot" && t.attrsMap["inline-template"] == null)
              return;
            for (var e = 0, n = t.children.length; e < n; e++) {
              var i = t.children[e];
              Bs(i), i.static || (t.static = !1);
            }
            if (t.ifConditions)
              for (var E = 1, R = t.ifConditions.length; E < R; E++) {
                var V = t.ifConditions[E].block;
                Bs(V), V.static || (t.static = !1);
              }
          }
        }
        function Us(t, e) {
          if (t.type === 1) {
            if ((t.static || t.once) && (t.staticInFor = e), t.static && t.children.length && (t.children.length !== 1 || t.children[0].type !== 3))
              return void (t.staticRoot = !0);
            if (t.staticRoot = !1, t.children)
              for (var n = 0, i = t.children.length; n < i; n++)
                Us(t.children[n], e || !!t.for);
            if (t.ifConditions)
              for (var E = 1, R = t.ifConditions.length; E < R; E++)
                Us(t.ifConditions[E].block, e);
          }
        }
        function bl(t) {
          return t.type !== 2 && (t.type === 3 || !(!t.pre && (t.hasBindings || t.if || t.for || h(t.tag) || !Fs(t.tag) || wl(t) || !Object.keys(t).every(Cc))));
        }
        function wl(t) {
          for (; t.parent; ) {
            if (t = t.parent, t.tag !== "template")
              return !1;
            if (t.for)
              return !0;
          }
          return !1;
        }
        var _l = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/, xl = /\([^)]*?\);*$/, Rc = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, Ic = { esc: 27, tab: 9, enter: 13, space: 32, up: 38, left: 37, right: 39, down: 40, delete: [8, 46] }, Sl = { esc: ["Esc", "Escape"], tab: "Tab", enter: "Enter", space: [" ", "Spacebar"], up: ["Up", "ArrowUp"], left: ["Left", "ArrowLeft"], right: ["Right", "ArrowRight"], down: ["Down", "ArrowDown"], delete: ["Backspace", "Delete", "Del"] }, bi = function(t) {
          return "if(" + t + ")return null;";
        }, Tc = { stop: "$event.stopPropagation();", prevent: "$event.preventDefault();", self: bi("$event.target !== $event.currentTarget"), ctrl: bi("!$event.ctrlKey"), shift: bi("!$event.shiftKey"), alt: bi("!$event.altKey"), meta: bi("!$event.metaKey"), left: bi("'button' in $event && $event.button !== 0"), middle: bi("'button' in $event && $event.button !== 1"), right: bi("'button' in $event && $event.button !== 2") };
        function Mc(t, e) {
          var n = e ? "nativeOn:" : "on:", i = "", E = "";
          for (var R in t) {
            var V = zc(t[R]);
            t[R] && t[R].dynamic ? E += R + "," + V + "," : i += '"' + R + '":' + V + ",";
          }
          return i = "{" + i.slice(0, -1) + "}", E ? n + "_d(" + i + ",[" + E.slice(0, -1) + "])" : n + i;
        }
        function zc(t) {
          if (!t)
            return "function(){}";
          if (Array.isArray(t))
            return "[" + t.map(function(_t) {
              return zc(_t);
            }).join(",") + "]";
          var e = Rc.test(t.value), n = _l.test(t.value), i = Rc.test(t.value.replace(xl, ""));
          if (t.modifiers) {
            var E = "", R = "", V = [];
            for (var K in t.modifiers)
              if (Tc[K])
                R += Tc[K], Ic[K] && V.push(K);
              else if (K === "exact") {
                var Z = t.modifiers;
                R += bi(["ctrl", "shift", "alt", "meta"].filter(function(_t) {
                  return !Z[_t];
                }).map(function(_t) {
                  return "$event." + _t + "Key";
                }).join("||"));
              } else
                V.push(K);
            V.length && (E += kl(V)), R && (E += R);
            var vt = e ? "return " + t.value + ".apply(null, arguments)" : n ? "return (" + t.value + ").apply(null, arguments)" : i ? "return " + t.value : t.value;
            return "function($event){" + E + vt + "}";
          }
          return e || n ? t.value : "function($event){" + (i ? "return " + t.value : t.value) + "}";
        }
        function kl(t) {
          return "if(!$event.type.indexOf('key')&&" + t.map(Al).join("&&") + ")return null;";
        }
        function Al(t) {
          var e = parseInt(t, 10);
          if (e)
            return "$event.keyCode!==" + e;
          var n = Ic[t], i = Sl[t];
          return "_k($event.keyCode," + JSON.stringify(t) + "," + JSON.stringify(n) + ",$event.key," + JSON.stringify(i) + ")";
        }
        function El(t, e) {
          t.wrapListeners = function(n) {
            return "_g(" + n + "," + e.value + ")";
          };
        }
        function Ol(t, e) {
          t.wrapData = function(n) {
            return "_b(" + n + ",'" + t.tag + "'," + e.value + "," + (e.modifiers && e.modifiers.prop ? "true" : "false") + (e.modifiers && e.modifiers.sync ? ",true" : "") + ")";
          };
        }
        var jl = { on: El, bind: Ol, cloak: mt }, $l = function(t) {
          this.options = t, this.warn = t.warn || Ja, this.transforms = oa(t.modules, "transformCode"), this.dataGenFns = oa(t.modules, "genData"), this.directives = It(It({}, jl), t.directives);
          var e = t.isReservedTag || pt;
          this.maybeComponent = function(n) {
            return !!n.component || !e(n.tag);
          }, this.onceId = 0, this.staticRenderFns = [], this.pre = !1;
        };
        function Dc(t, e) {
          var n = new $l(e), i = t ? t.tag === "script" ? "null" : wi(t, n) : '_c("div")';
          return { render: "with(this){return " + i + "}", staticRenderFns: n.staticRenderFns };
        }
        function wi(t, e) {
          if (t.parent && (t.pre = t.pre || t.parent.pre), t.staticRoot && !t.staticProcessed)
            return Lc(t, e);
          if (t.once && !t.onceProcessed)
            return Nc(t, e);
          if (t.for && !t.forProcessed)
            return Bc(t, e);
          if (t.if && !t.ifProcessed)
            return Ws(t, e);
          if (t.tag !== "template" || t.slotTarget || e.pre) {
            if (t.tag === "slot")
              return Ll(t, e);
            var n;
            if (t.component)
              n = Nl(t.component, t, e);
            else {
              var i;
              (!t.plain || t.pre && e.maybeComponent(t)) && (i = Uc(t, e));
              var E = t.inlineTemplate ? null : Ca(t, e, !0);
              n = "_c('" + t.tag + "'" + (i ? "," + i : "") + (E ? "," + E : "") + ")";
            }
            for (var R = 0; R < e.transforms.length; R++)
              n = e.transforms[R](t, n);
            return n;
          }
          return Ca(t, e) || "void 0";
        }
        function Lc(t, e) {
          t.staticProcessed = !0;
          var n = e.pre;
          return t.pre && (e.pre = t.pre), e.staticRenderFns.push("with(this){return " + wi(t, e) + "}"), e.pre = n, "_m(" + (e.staticRenderFns.length - 1) + (t.staticInFor ? ",true" : "") + ")";
        }
        function Nc(t, e) {
          if (t.onceProcessed = !0, t.if && !t.ifProcessed)
            return Ws(t, e);
          if (t.staticInFor) {
            for (var n = "", i = t.parent; i; ) {
              if (i.for) {
                n = i.key;
                break;
              }
              i = i.parent;
            }
            return n ? "_o(" + wi(t, e) + "," + e.onceId++ + "," + n + ")" : wi(t, e);
          }
          return Lc(t, e);
        }
        function Ws(t, e, n, i) {
          return t.ifProcessed = !0, Fc(t.ifConditions.slice(), e, n, i);
        }
        function Fc(t, e, n, i) {
          if (!t.length)
            return i || "_e()";
          var E = t.shift();
          return E.exp ? "(" + E.exp + ")?" + R(E.block) + ":" + Fc(t, e, n, i) : "" + R(E.block);
          function R(V) {
            return n ? n(V, e) : V.once ? Nc(V, e) : wi(V, e);
          }
        }
        function Bc(t, e, n, i) {
          var E = t.for, R = t.alias, V = t.iterator1 ? "," + t.iterator1 : "", K = t.iterator2 ? "," + t.iterator2 : "";
          return t.forProcessed = !0, (i || "_l") + "((" + E + "),function(" + R + V + K + "){return " + (n || wi)(t, e) + "})";
        }
        function Uc(t, e) {
          var n = "{", i = Pl(t, e);
          i && (n += i + ","), t.key && (n += "key:" + t.key + ","), t.ref && (n += "ref:" + t.ref + ","), t.refInFor && (n += "refInFor:true,"), t.pre && (n += "pre:true,"), t.component && (n += 'tag:"' + t.tag + '",');
          for (var E = 0; E < e.dataGenFns.length; E++)
            n += e.dataGenFns[E](t);
          if (t.attrs && (n += "attrs:" + ms(t.attrs) + ","), t.props && (n += "domProps:" + ms(t.props) + ","), t.events && (n += Mc(t.events, !1) + ","), t.nativeEvents && (n += Mc(t.nativeEvents, !0) + ","), t.slotTarget && !t.slotScope && (n += "slot:" + t.slotTarget + ","), t.scopedSlots && (n += Rl(t, t.scopedSlots, e) + ","), t.model && (n += "model:{value:" + t.model.value + ",callback:" + t.model.callback + ",expression:" + t.model.expression + "},"), t.inlineTemplate) {
            var R = Cl(t, e);
            R && (n += R + ",");
          }
          return n = n.replace(/,$/, "") + "}", t.dynamicAttrs && (n = "_b(" + n + ',"' + t.tag + '",' + ms(t.dynamicAttrs) + ")"), t.wrapData && (n = t.wrapData(n)), t.wrapListeners && (n = t.wrapListeners(n)), n;
        }
        function Pl(t, e) {
          var n = t.directives;
          if (n) {
            var i, E, R, V, K = "directives:[", Z = !1;
            for (i = 0, E = n.length; i < E; i++) {
              R = n[i], V = !0;
              var vt = e.directives[R.name];
              vt && (V = !!vt(t, R, e.warn)), V && (Z = !0, K += '{name:"' + R.name + '",rawName:"' + R.rawName + '"' + (R.value ? ",value:(" + R.value + "),expression:" + JSON.stringify(R.value) : "") + (R.arg ? ",arg:" + (R.isDynamicArg ? R.arg : '"' + R.arg + '"') : "") + (R.modifiers ? ",modifiers:" + JSON.stringify(R.modifiers) : "") + "},");
            }
            return Z ? K.slice(0, -1) + "]" : void 0;
          }
        }
        function Cl(t, e) {
          var n = t.children[0];
          if (n && n.type === 1) {
            var i = Dc(n, e.options);
            return "inlineTemplate:{render:function(){" + i.render + "},staticRenderFns:[" + i.staticRenderFns.map(function(E) {
              return "function(){" + E + "}";
            }).join(",") + "]}";
          }
        }
        function Rl(t, e, n) {
          var i = t.for || Object.keys(e).some(function(K) {
            var Z = e[K];
            return Z.slotTargetDynamic || Z.if || Z.for || Wc(Z);
          }), E = !!t.if;
          if (!i)
            for (var R = t.parent; R; ) {
              if (R.slotScope && R.slotScope !== ps || R.for) {
                i = !0;
                break;
              }
              R.if && (E = !0), R = R.parent;
            }
          var V = Object.keys(e).map(function(K) {
            return qs(e[K], n);
          }).join(",");
          return "scopedSlots:_u([" + V + "]" + (i ? ",null,true" : "") + (!i && E ? ",null,false," + Il(V) : "") + ")";
        }
        function Il(t) {
          for (var e = 5381, n = t.length; n; )
            e = 33 * e ^ t.charCodeAt(--n);
          return e >>> 0;
        }
        function Wc(t) {
          return t.type === 1 && (t.tag === "slot" || t.children.some(Wc));
        }
        function qs(t, e) {
          var n = t.attrsMap["slot-scope"];
          if (t.if && !t.ifProcessed && !n)
            return Ws(t, e, qs, "null");
          if (t.for && !t.forProcessed)
            return Bc(t, e, qs);
          var i = t.slotScope === ps ? "" : String(t.slotScope), E = "function(" + i + "){return " + (t.tag === "template" ? t.if && n ? "(" + t.if + ")?" + (Ca(t, e) || "undefined") + ":undefined" : Ca(t, e) || "undefined" : wi(t, e)) + "}", R = i ? "" : ",proxy:true";
          return "{key:" + (t.slotTarget || '"default"') + ",fn:" + E + R + "}";
        }
        function Ca(t, e, n, i, E) {
          var R = t.children;
          if (R.length) {
            var V = R[0];
            if (R.length === 1 && V.for && V.tag !== "template" && V.tag !== "slot") {
              var K = n ? e.maybeComponent(V) ? ",1" : ",0" : "";
              return "" + (i || wi)(V, e) + K;
            }
            var Z = n ? Tl(R, e.maybeComponent) : 0, vt = E || Ml;
            return "[" + R.map(function(_t) {
              return vt(_t, e);
            }).join(",") + "]" + (Z ? "," + Z : "");
          }
        }
        function Tl(t, e) {
          for (var n = 0, i = 0; i < t.length; i++) {
            var E = t[i];
            if (E.type === 1) {
              if (qc(E) || E.ifConditions && E.ifConditions.some(function(R) {
                return qc(R.block);
              })) {
                n = 2;
                break;
              }
              (e(E) || E.ifConditions && E.ifConditions.some(function(R) {
                return e(R.block);
              })) && (n = 1);
            }
          }
          return n;
        }
        function qc(t) {
          return t.for !== void 0 || t.tag === "template" || t.tag === "slot";
        }
        function Ml(t, e) {
          return t.type === 1 ? wi(t, e) : t.type === 3 && t.isComment ? Dl(t) : zl(t);
        }
        function zl(t) {
          return "_v(" + (t.type === 2 ? t.expression : Vc(JSON.stringify(t.text))) + ")";
        }
        function Dl(t) {
          return "_e(" + JSON.stringify(t.text) + ")";
        }
        function Ll(t, e) {
          var n = t.slotName || '"default"', i = Ca(t, e), E = "_t(" + n + (i ? ",function(){return " + i + "}" : ""), R = t.attrs || t.dynamicAttrs ? ms((t.attrs || []).concat(t.dynamicAttrs || []).map(function(K) {
            return { name: T(K.name), value: K.value, dynamic: K.dynamic };
          })) : null, V = t.attrsMap["v-bind"];
          return !R && !V || i || (E += ",null"), R && (E += "," + R), V && (E += (R ? "" : ",null") + "," + V), E + ")";
        }
        function Nl(t, e, n) {
          var i = e.inlineTemplate ? null : Ca(e, n, !0);
          return "_c(" + t + "," + Uc(e, n) + (i ? "," + i : "") + ")";
        }
        function ms(t) {
          for (var e = "", n = "", i = 0; i < t.length; i++) {
            var E = t[i], R = Vc(E.value);
            E.dynamic ? n += E.name + "," + R + "," : e += '"' + E.name + '":' + R + ",";
          }
          return e = "{" + e.slice(0, -1) + "}", n ? "_d(" + e + ",[" + n.slice(0, -1) + "])" : e;
        }
        function Vc(t) {
          return t.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
        }
        new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b"), new RegExp("\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)");
        function Hc(t, e) {
          try {
            return new Function(t);
          } catch (n) {
            return e.push({ err: n, code: t }), mt;
          }
        }
        function Fl(t) {
          var e = /* @__PURE__ */ Object.create(null);
          return function(n, i, E) {
            i = It({}, i), i.warn, delete i.warn;
            var R = i.delimiters ? String(i.delimiters) + n : n;
            if (e[R])
              return e[R];
            var V = t(n, i), K = {}, Z = [];
            return K.render = Hc(V.render, Z), K.staticRenderFns = V.staticRenderFns.map(function(vt) {
              return Hc(vt, Z);
            }), e[R] = K;
          };
        }
        function Bl(t) {
          return function(e) {
            function n(i, E) {
              var R = Object.create(e), V = [], K = [], Z = function(At, Ht, le) {
                (le ? K : V).push(At);
              };
              if (E)
                for (var vt in E.modules && (R.modules = (e.modules || []).concat(E.modules)), E.directives && (R.directives = It(Object.create(e.directives || null), E.directives)), E)
                  vt !== "modules" && vt !== "directives" && (R[vt] = E[vt]);
              R.warn = Z;
              var _t = t(i.trim(), R);
              return _t.errors = V, _t.tips = K, _t;
            }
            return { compile: n, compileToFunctions: Fl(n) };
          };
        }
        var vs, Ul = Bl(function(t, e) {
          var n = Uu(t.trim(), e);
          e.optimize !== !1 && gl(n, e);
          var i = Dc(n, e);
          return { ast: n, render: i.render, staticRenderFns: i.staticRenderFns };
        }), Wl = Ul(ml), Yc = Wl.compileToFunctions;
        function Gc(t) {
          return vs = vs || document.createElement("div"), vs.innerHTML = t ? `<a href="
"/>` : `<div a="
"/>`, vs.innerHTML.indexOf("&#10;") > 0;
        }
        var ql = !!We && Gc(!1), Vl = !!We && Gc(!0), Hl = L(function(t) {
          var e = $e(t);
          return e && e.innerHTML;
        }), Yl = Ae.prototype.$mount;
        function Gl(t) {
          if (t.outerHTML)
            return t.outerHTML;
          var e = document.createElement("div");
          return e.appendChild(t.cloneNode(!0)), e.innerHTML;
        }
        Ae.prototype.$mount = function(t, e) {
          if (t = t && $e(t), t === document.body || t === document.documentElement)
            return this;
          var n = this.$options;
          if (!n.render) {
            var i = n.template;
            if (i)
              if (typeof i == "string")
                i.charAt(0) === "#" && (i = Hl(i));
              else {
                if (!i.nodeType)
                  return this;
                i = i.innerHTML;
              }
            else
              t && (i = Gl(t));
            if (i) {
              var E = Yc(i, { outputSourceRange: !1, shouldDecodeNewlines: ql, shouldDecodeNewlinesForHref: Vl, delimiters: n.delimiters, comments: n.comments }, this), R = E.render, V = E.staticRenderFns;
              n.render = R, n.staticRenderFns = V;
            }
          }
          return Yl.call(this, t, e);
        }, Ae.compile = Yc, G.default = Ae;
      }.call(this, o("c8ba"));
    }, a04b: function(F, G, o) {
      var j = o("c04e"), z = o("d9b5");
      F.exports = function($) {
        var m = j($, "string");
        return z(m) ? m : m + "";
      };
    }, a2f0: function(F, G, o) {
      var j = o("da0c");
      j.__esModule && (j = j.default), typeof j == "string" && (j = [[F.i, j, ""]]), j.locals && (F.exports = j.locals);
      var z = o("499e").default;
      z("e9322f2c", j, !0, { sourceMap: !1, shadowMode: !1 });
    }, a306: function(F) {
      F.exports = JSON.parse('{"psaccounts":{"accountManager":{"errorInstallEnable":"Ha ocurrido un error. Int\xE9ntalo de nuevo."},"alert":{"ps_accounts":{"enable":{"title":"Activa el m\xF3dulo PrestaShop Account","message":"El m\xF3dulo PrestaShop Account es necesario para continuar con la configuraci\xF3n de este m\xF3dulo.","action":"Activar","loading":"Activaci\xF3n del m\xF3dulo PrestaShop Account en curso..."},"install":{"title":"Instala el m\xF3dulo PrestaShop Account","message":"El m\xF3dulo PrestaShop Account es necesario para continuar con la configuraci\xF3n de este m\xF3dulo.","action":"Instalar","loading":"Instalaci\xF3n del m\xF3dulo PrestaShop Account en curso..."},"update":{"title":"Actualizar el m\xF3dulo PrestaShop Account","message":"Hay una nueva versi\xF3n de PrestaShop Account disponible, actualiza el m\xF3dulo para continuar usando los servicios","action":"Actualizar","loading":"El m\xF3dulo PrestaShop Account se est\xE1 actualizando..."}},"ps_eventbus":{"enable":{"title":"Activar el m\xF3dulo PrestaShop Event Bus","message":"Necesitas el m\xF3dulo PrestaShop Event Bus para seguir configurando este m\xF3dulo.","action":"Activar","loading":"El m\xF3dulo PrestaShop Event Bus est\xE1 siendo activado..."},"install":{"title":"Instala el m\xF3dulo Prestashop Event Bus","message":"El m\xF3dulo Prestashop Event Bus es necesario para continuar con la configuraci\xF3n de este m\xF3dulo.","action":"Instalar","loading":"Instalaci\xF3n del m\xF3dulo Prestashop Event Bus en curso..."}}},"alertShopDomainShouldExists":{"title":"URL de la tienda sin rellenar","message":"Solo la tienda con una URL asignada se puede asociar a una cuenta PrestaShop.<br />Las siguientes tiendas no tienen una URL asignada: "},"account":{"title":"Asociar tu tienda a una cuenta PrestaShop | Asociar tus tiendas a una cuenta PrestaShop","authorize":"Solo puedes vincular tu tienda a una cuenta. \xA1El\xEDgela bien!","authorized":"Tu tienda est\xE1 asociada a la cuenta PrestaShop: | Tu tienda est\xE1 asociada a la cuenta PrestaShop:","authorizedPartially":"Tus tiendas est\xE1n parcialmente asociadas a una cuenta PrestaShop","authorizedSeveral":"Tus tiendas est\xE1n asociadas a varias cuentas PrestaShop","connectButton":"Vincular","reonboardButton":"Vincular de nuevo","disconnectButton":"Usar otra cuenta","moduleUpdateInformation":"<strong>Nueva actualizaci\xF3n:</strong> puedes gestionar tus tiendas asociadas.<br />Vuelve a asociarte utilizando <strong>la misma direcci\xF3n de correo electr\xF3nico </strong>para beneficiarte de esta actualizaci\xF3n.<br /> Otras actualizaciones del m\xF3dulo pueden estar disponibles en la pesta\xF1a Actualizaciones del gestor de m\xF3dulos.","emailNotVerified":{"title":"Se ha enviado un correo electr\xF3nico de confirmaci\xF3n.","description":"Comprueba tu bandeja de entrada y haz clic en el enlace para activar tu cuenta."},"sendEmail":"Enviar de nuevo","needToBeAdmin":"Para continuar, debes ser administrador de la tienda","pleaseContact":"Ponte en contacto con","manageAccountButton":"Ver mis tiendas vinculadas","unlinkButton":"Desvincular esta tienda"}}}');
    }, a4b4: function(F, G, o) {
      var j = o("342f");
      F.exports = /web0s(?!.*chrome)/i.test(j);
    }, a4d3: function(F, G, o) {
      var j = o("23e7"), z = o("da84"), $ = o("d066"), m = o("2ba4"), v = o("c65b"), u = o("e330"), S = o("c430"), g = o("83ab"), w = o("4930"), a = o("d039"), f = o("1a2d"), y = o("e8b5"), l = o("1626"), c = o("861d"), s = o("3a9b"), b = o("d9b5"), h = o("825a"), k = o("7b0b"), d = o("fc6a"), O = o("a04b"), M = o("577e"), L = o("5c6c"), x = o("7c73"), T = o("df75"), N = o("241c"), Y = o("057f"), ot = o("7418"), at = o("06cf"), St = o("9bf2"), wt = o("37e8"), Nt = o("d1e7"), It = o("f36a"), xe = o("6eeb"), mt = o("5692"), pt = o("f772"), Et = o("d012"), Mt = o("90e3"), xt = o("b622"), Yt = o("e538"), ce = o("746f"), ye = o("d44e"), fe = o("69f3"), Oe = o("b727").forEach, be = pt("hidden"), ar = "Symbol", fr = "prototype", Vr = xt("toPrimitive"), en = fe.set, rn = fe.getterFor(ar), sr = Object[fr], zr = z.Symbol, We = zr && zr[fr], fn = z.TypeError, _n = z.QObject, P = $("JSON", "stringify"), D = at.f, W = St.f, et = Y.f, ct = Nt.f, yt = u([].push), Wt = mt("symbols"), Se = mt("op-symbols"), Pe = mt("string-to-symbol-registry"), we = mt("symbol-to-string-registry"), ke = mt("wks"), ur = !_n || !_n[fr] || !_n[fr].findChild, Ce = g && a(function() {
        return x(W({}, "a", { get: function() {
          return W(this, "a", { value: 7 }).a;
        } })).a != 7;
      }) ? function(Dt, Vt, ue) {
        var de = D(sr, Vt);
        de && delete sr[Vt], W(Dt, Vt, ue), de && Dt !== sr && W(sr, Vt, de);
      } : W, kr = function(Dt, Vt) {
        var ue = Wt[Dt] = x(We);
        return en(ue, { type: ar, tag: Dt, description: Vt }), g || (ue.description = Vt), ue;
      }, Ge = function(Dt, Vt, ue) {
        Dt === sr && Ge(Se, Vt, ue), h(Dt);
        var de = O(Vt);
        return h(ue), f(Wt, de) ? (ue.enumerable ? (f(Dt, be) && Dt[be][de] && (Dt[be][de] = !1), ue = x(ue, { enumerable: L(0, !1) })) : (f(Dt, be) || W(Dt, be, L(1, {})), Dt[be][de] = !0), Ce(Dt, de, ue)) : W(Dt, de, ue);
      }, Jr = function(Dt, Vt) {
        h(Dt);
        var ue = d(Vt), de = T(ue).concat(Jt(ue));
        return Oe(de, function(Ke) {
          g && !v(Pt, ue, Ke) || Ge(Dt, Ke, ue[Ke]);
        }), Dt;
      }, dr = function(Dt, Vt) {
        return Vt === void 0 ? x(Dt) : Jr(x(Dt), Vt);
      }, Pt = function(Dt) {
        var Vt = O(Dt), ue = v(ct, this, Vt);
        return !(this === sr && f(Wt, Vt) && !f(Se, Vt)) && (!(ue || !f(this, Vt) || !f(Wt, Vt) || f(this, be) && this[be][Vt]) || ue);
      }, Ut = function(Dt, Vt) {
        var ue = d(Dt), de = O(Vt);
        if (ue !== sr || !f(Wt, de) || f(Se, de)) {
          var Ke = D(ue, de);
          return !Ke || !f(Wt, de) || f(ue, be) && ue[be][de] || (Ke.enumerable = !0), Ke;
        }
      }, te = function(Dt) {
        var Vt = et(d(Dt)), ue = [];
        return Oe(Vt, function(de) {
          f(Wt, de) || f(Et, de) || yt(ue, de);
        }), ue;
      }, Jt = function(Dt) {
        var Vt = Dt === sr, ue = et(Vt ? Se : d(Dt)), de = [];
        return Oe(ue, function(Ke) {
          !f(Wt, Ke) || Vt && !f(sr, Ke) || yt(de, Wt[Ke]);
        }), de;
      };
      if (w || (zr = function() {
        if (s(We, this))
          throw fn("Symbol is not a constructor");
        var Dt = arguments.length && arguments[0] !== void 0 ? M(arguments[0]) : void 0, Vt = Mt(Dt), ue = function(de) {
          this === sr && v(ue, Se, de), f(this, be) && f(this[be], Vt) && (this[be][Vt] = !1), Ce(this, Vt, L(1, de));
        };
        return g && ur && Ce(sr, Vt, { configurable: !0, set: ue }), kr(Vt, Dt);
      }, We = zr[fr], xe(We, "toString", function() {
        return rn(this).tag;
      }), xe(zr, "withoutSetter", function(Dt) {
        return kr(Mt(Dt), Dt);
      }), Nt.f = Pt, St.f = Ge, wt.f = Jr, at.f = Ut, N.f = Y.f = te, ot.f = Jt, Yt.f = function(Dt) {
        return kr(xt(Dt), Dt);
      }, g && (W(We, "description", { configurable: !0, get: function() {
        return rn(this).description;
      } }), S || xe(sr, "propertyIsEnumerable", Pt, { unsafe: !0 }))), j({ global: !0, wrap: !0, forced: !w, sham: !w }, { Symbol: zr }), Oe(T(ke), function(Dt) {
        ce(Dt);
      }), j({ target: ar, stat: !0, forced: !w }, { for: function(Dt) {
        var Vt = M(Dt);
        if (f(Pe, Vt))
          return Pe[Vt];
        var ue = zr(Vt);
        return Pe[Vt] = ue, we[ue] = Vt, ue;
      }, keyFor: function(Dt) {
        if (!b(Dt))
          throw fn(Dt + " is not a symbol");
        if (f(we, Dt))
          return we[Dt];
      }, useSetter: function() {
        ur = !0;
      }, useSimple: function() {
        ur = !1;
      } }), j({ target: "Object", stat: !0, forced: !w, sham: !g }, { create: dr, defineProperty: Ge, defineProperties: Jr, getOwnPropertyDescriptor: Ut }), j({ target: "Object", stat: !0, forced: !w }, { getOwnPropertyNames: te, getOwnPropertySymbols: Jt }), j({ target: "Object", stat: !0, forced: a(function() {
        ot.f(1);
      }) }, { getOwnPropertySymbols: function(Dt) {
        return ot.f(k(Dt));
      } }), P) {
        var He = !w || a(function() {
          var Dt = zr();
          return P([Dt]) != "[null]" || P({ a: Dt }) != "{}" || P(Object(Dt)) != "{}";
        });
        j({ target: "JSON", stat: !0, forced: He }, { stringify: function(Dt, Vt, ue) {
          var de = It(arguments), Ke = Vt;
          if ((c(Vt) || Dt !== void 0) && !b(Dt))
            return y(Vt) || (Vt = function(xn, Lt) {
              if (l(Ke) && (Lt = v(Ke, this, xn, Lt)), !b(Lt))
                return Lt;
            }), de[1] = Vt, m(P, null, de);
        } });
      }
      if (!We[Vr]) {
        var tr = We.valueOf;
        xe(We, Vr, function(Dt) {
          return v(tr, this);
        });
      }
      ye(zr, ar), Et[be] = !0;
    }, a625: function(F) {
      F.exports = JSON.parse('{"psaccounts":{"accountManager":{"errorInstallEnable":"Er is een fout opgetreden. Probeer het nog eens."},"alert":{"ps_accounts":{"enable":{"title":"Activeer de module PrestaShop Account","message":"De module PrestaShop account is nodig om de configuratie van deze module voort te zetten.","action":"Activeren","loading":"Activering van de module PrestaShop Account aan de gang..."},"install":{"title":"Installeer de module PrestaShop Account","message":"De module PrestaShop account is nodig om de configuratie van deze module voort te zetten.","action":"Installeer","loading":"Installatie van de module PrestaShop Account aan de gang..."},"update":{"title":"Update PrestaShop Accounts-module","message":"Er is een nieuwe versie van PrestaShop-accounts beschikbaar. Werk de module bij om de services te blijven gebruiken","action":"Bijwerken","loading":"De PrestaShop Account module wordt momenteel bijgewerkt..."}},"ps_eventbus":{"enable":{"title":"Activeer de PrestaShop Event Bus module","message":"U heeft de PrestaShop Event Bus module nodig om verder te gaan met het opzetten van deze module.","action":"Activeren","loading":"De PrestaShop Event Bus module wordt momenteel geactiveerd..."},"install":{"title":"Installeer de module Prestashop Event Bus","message":"De module Prestashop Event Bus is nodig om de configuratie van deze module voort te zetten.","action":"Installeer","loading":"Installatie van de module Prestashop Event Bus aan de gang..."}}},"alertShopDomainShouldExists":{"title":"Winkel URL niet ingevuld!","message":"Alleen winkels met een toegewezen URL kunnen aan een PrestaShop account gekoppeld worden.<br />De volgende winkels hebben geen toegewezen URL: "},"account":{"title":"Koppel uw winkel aan een PrestaShop account | Koppel uw winkels aan een PrestaShop account","authorize":"U kunt uw winkel maar aan \xE9\xE9n account koppelen. Kies het goed!","authorized":"Uw winkel is gekoppeld aan de PrestaShop account: | Uw winkels is gekoppeld aan de PrestaShop account:","authorizedPartially":"Uw winkels zijn gedeeltelijk gekoppeld aan een PrestaShop account","authorizedSeveral":"Uw winkels zijn gekoppeld aan meerdere PrestaShop accounts","connectButton":"Koppelen","reonboardButton":"Opnieuw verbinden","disconnectButton":"Een ander account gebruiken","moduleUpdateInformation":"<strong>Nieuwe update:</strong> u kunt uw geassocieerde winkels beheren.<br /> Gelieve u opnieuw aan te melden <strong>met hetzelfde e-mailadres</strong> om van deze update te kunnen profiteren.<br /> Andere module-updates kunnen beschikbaar zijn in Module Manager, tabblad Updates.","emailNotVerified":{"title":"Er is een bevestigingsmail verzonden.","description":"Controleer uw inbox en klik op de link om uw account te activeren."},"sendEmail":"Doorsturen","needToBeAdmin":"Om verder te gaan, moet u een administrator van de winkel zijn.","pleaseContact":"Neem alstublieft contact op met","manageAccountButton":"Bekijk mijn geassocieerde winkels","unlinkButton":"Loskoppelen"}}}');
    }, a630: function(F, G, o) {
      var j = o("23e7"), z = o("4df4"), $ = o("1c7e"), m = !$(function(v) {
        Array.from(v);
      });
      j({ target: "Array", stat: !0, forced: m }, { from: z });
    }, a640: function(F, G, o) {
      var j = o("d039");
      F.exports = function(z, $) {
        var m = [][z];
        return !!m && j(function() {
          m.call(null, $ || function() {
            throw 1;
          }, 1);
        });
      };
    }, a9e3: function(F, G, o) {
      var j = o("83ab"), z = o("da84"), $ = o("e330"), m = o("94ca"), v = o("6eeb"), u = o("1a2d"), S = o("7156"), g = o("3a9b"), w = o("d9b5"), a = o("c04e"), f = o("d039"), y = o("241c").f, l = o("06cf").f, c = o("9bf2").f, s = o("408a"), b = o("58a8").trim, h = "Number", k = z[h], d = k.prototype, O = z.TypeError, M = $("".slice), L = $("".charCodeAt), x = function(St) {
        var wt = a(St, "number");
        return typeof wt == "bigint" ? wt : T(wt);
      }, T = function(St) {
        var wt, Nt, It, xe, mt, pt, Et, Mt, xt = a(St, "number");
        if (w(xt))
          throw O("Cannot convert a Symbol value to a number");
        if (typeof xt == "string" && xt.length > 2) {
          if (xt = b(xt), wt = L(xt, 0), wt === 43 || wt === 45) {
            if (Nt = L(xt, 2), Nt === 88 || Nt === 120)
              return NaN;
          } else if (wt === 48) {
            switch (L(xt, 1)) {
              case 66:
              case 98:
                It = 2, xe = 49;
                break;
              case 79:
              case 111:
                It = 8, xe = 55;
                break;
              default:
                return +xt;
            }
            for (mt = M(xt, 2), pt = mt.length, Et = 0; Et < pt; Et++)
              if (Mt = L(mt, Et), Mt < 48 || Mt > xe)
                return NaN;
            return parseInt(mt, It);
          }
        }
        return +xt;
      };
      if (m(h, !k(" 0o1") || !k("0b1") || k("+0x1"))) {
        for (var N, Y = function(St) {
          var wt = arguments.length < 1 ? 0 : k(x(St)), Nt = this;
          return g(d, Nt) && f(function() {
            s(Nt);
          }) ? S(Object(wt), Nt, Y) : wt;
        }, ot = j ? y(k) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), at = 0; ot.length > at; at++)
          u(k, N = ot[at]) && !u(Y, N) && c(Y, N, l(k, N));
        Y.prototype = d, d.constructor = Y, v(z, h, Y);
      }
    }, ac1f: function(F, G, o) {
      var j = o("23e7"), z = o("9263");
      j({ target: "RegExp", proto: !0, forced: /./.exec !== z }, { exec: z });
    }, ad6d: function(F, G, o) {
      var j = o("825a");
      F.exports = function() {
        var z = j(this), $ = "";
        return z.global && ($ += "g"), z.ignoreCase && ($ += "i"), z.multiline && ($ += "m"), z.dotAll && ($ += "s"), z.unicode && ($ += "u"), z.sticky && ($ += "y"), $;
      };
    }, ae93: function(F, G, o) {
      var j, z, $, m = o("d039"), v = o("1626"), u = o("7c73"), S = o("e163"), g = o("6eeb"), w = o("b622"), a = o("c430"), f = w("iterator"), y = !1;
      [].keys && ($ = [].keys(), "next" in $ ? (z = S(S($)), z !== Object.prototype && (j = z)) : y = !0);
      var l = j == null || m(function() {
        var c = {};
        return j[f].call(c) !== c;
      });
      l ? j = {} : a && (j = u(j)), v(j[f]) || g(j, f, function() {
        return this;
      }), F.exports = { IteratorPrototype: j, BUGGY_SAFARI_ITERATORS: y };
    }, aed9: function(F, G, o) {
      var j = o("83ab"), z = o("d039");
      F.exports = j && z(function() {
        return Object.defineProperty(function() {
        }, "prototype", { value: 42, writable: !1 }).prototype != 42;
      });
    }, af03: function(F, G, o) {
      var j = o("d039");
      F.exports = function(z) {
        return j(function() {
          var $ = ""[z]('"');
          return $ !== $.toLowerCase() || $.split('"').length > 3;
        });
      };
    }, b041: function(F, G, o) {
      var j = o("00ee"), z = o("f5df");
      F.exports = j ? {}.toString : function() {
        return "[object " + z(this) + "]";
      };
    }, b0c0: function(F, G, o) {
      var j = o("83ab"), z = o("5e77").EXISTS, $ = o("e330"), m = o("9bf2").f, v = Function.prototype, u = $(v.toString), S = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, g = $(S.exec), w = "name";
      j && !z && m(v, w, { configurable: !0, get: function() {
        try {
          return g(S, u(this))[1];
        } catch {
          return "";
        }
      } });
    }, b4b5: function(F, G, o) {
      var j = o("24fb");
      G = j(!1), G.push([F.i, "body.ui-displayed{overflow:hidden}", ""]), F.exports = G;
    }, b575: function(F, G, o) {
      var j, z, $, m, v, u, S, g, w = o("da84"), a = o("0366"), f = o("06cf").f, y = o("2cf4").set, l = o("1cdc"), c = o("d4c3"), s = o("a4b4"), b = o("605d"), h = w.MutationObserver || w.WebKitMutationObserver, k = w.document, d = w.process, O = w.Promise, M = f(w, "queueMicrotask"), L = M && M.value;
      L || (j = function() {
        var x, T;
        for (b && (x = d.domain) && x.exit(); z; ) {
          T = z.fn, z = z.next;
          try {
            T();
          } catch (N) {
            throw z ? m() : $ = void 0, N;
          }
        }
        $ = void 0, x && x.enter();
      }, l || b || s || !h || !k ? !c && O && O.resolve ? (S = O.resolve(void 0), S.constructor = O, g = a(S.then, S), m = function() {
        g(j);
      }) : b ? m = function() {
        d.nextTick(j);
      } : (y = a(y, w), m = function() {
        y(j);
      }) : (v = !0, u = k.createTextNode(""), new h(j).observe(u, { characterData: !0 }), m = function() {
        u.data = v = !v;
      })), F.exports = L || function(x) {
        var T = { fn: x, next: void 0 };
        $ && ($.next = T), z || (z = T, m()), $ = T;
      };
    }, b622: function(F, G, o) {
      var j = o("da84"), z = o("5692"), $ = o("1a2d"), m = o("90e3"), v = o("4930"), u = o("fdbf"), S = z("wks"), g = j.Symbol, w = g && g.for, a = u ? g : g && g.withoutSetter || m;
      F.exports = function(f) {
        if (!$(S, f) || !v && typeof S[f] != "string") {
          var y = "Symbol." + f;
          v && $(g, f) ? S[f] = g[f] : S[f] = u && w ? w(y) : a(y);
        }
        return S[f];
      };
    }, b639: function(F, G, o) {
      (function(j) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var z = o("1fb5"), $ = o("9152"), m = o("e3db");
        function v() {
          try {
            var P = new Uint8Array(1);
            return P.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
              return 42;
            } }, P.foo() === 42 && typeof P.subarray == "function" && P.subarray(1, 1).byteLength === 0;
          } catch {
            return !1;
          }
        }
        function u() {
          return g.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function S(P, D) {
          if (u() < D)
            throw new RangeError("Invalid typed array length");
          return g.TYPED_ARRAY_SUPPORT ? (P = new Uint8Array(D), P.__proto__ = g.prototype) : (P === null && (P = new g(D)), P.length = D), P;
        }
        function g(P, D, W) {
          if (!g.TYPED_ARRAY_SUPPORT && !(this instanceof g))
            return new g(P, D, W);
          if (typeof P == "number") {
            if (typeof D == "string")
              throw new Error("If encoding is specified then the first argument must be a string");
            return y(this, P);
          }
          return w(this, P, D, W);
        }
        function w(P, D, W, et) {
          if (typeof D == "number")
            throw new TypeError('"value" argument must not be a number');
          return typeof ArrayBuffer < "u" && D instanceof ArrayBuffer ? s(P, D, W, et) : typeof D == "string" ? l(P, D, W) : b(P, D);
        }
        function a(P) {
          if (typeof P != "number")
            throw new TypeError('"size" argument must be a number');
          if (P < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function f(P, D, W, et) {
          return a(D), D <= 0 ? S(P, D) : W !== void 0 ? typeof et == "string" ? S(P, D).fill(W, et) : S(P, D).fill(W) : S(P, D);
        }
        function y(P, D) {
          if (a(D), P = S(P, D < 0 ? 0 : 0 | h(D)), !g.TYPED_ARRAY_SUPPORT)
            for (var W = 0; W < D; ++W)
              P[W] = 0;
          return P;
        }
        function l(P, D, W) {
          if (typeof W == "string" && W !== "" || (W = "utf8"), !g.isEncoding(W))
            throw new TypeError('"encoding" must be a valid string encoding');
          var et = 0 | d(D, W);
          P = S(P, et);
          var ct = P.write(D, W);
          return ct !== et && (P = P.slice(0, ct)), P;
        }
        function c(P, D) {
          var W = D.length < 0 ? 0 : 0 | h(D.length);
          P = S(P, W);
          for (var et = 0; et < W; et += 1)
            P[et] = 255 & D[et];
          return P;
        }
        function s(P, D, W, et) {
          if (D.byteLength, W < 0 || D.byteLength < W)
            throw new RangeError("'offset' is out of bounds");
          if (D.byteLength < W + (et || 0))
            throw new RangeError("'length' is out of bounds");
          return D = W === void 0 && et === void 0 ? new Uint8Array(D) : et === void 0 ? new Uint8Array(D, W) : new Uint8Array(D, W, et), g.TYPED_ARRAY_SUPPORT ? (P = D, P.__proto__ = g.prototype) : P = c(P, D), P;
        }
        function b(P, D) {
          if (g.isBuffer(D)) {
            var W = 0 | h(D.length);
            return P = S(P, W), P.length === 0 || D.copy(P, 0, 0, W), P;
          }
          if (D) {
            if (typeof ArrayBuffer < "u" && D.buffer instanceof ArrayBuffer || "length" in D)
              return typeof D.length != "number" || _n(D.length) ? S(P, 0) : c(P, D);
            if (D.type === "Buffer" && m(D.data))
              return c(P, D.data);
          }
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        function h(P) {
          if (P >= u())
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + u().toString(16) + " bytes");
          return 0 | P;
        }
        function k(P) {
          return +P != P && (P = 0), g.alloc(+P);
        }
        function d(P, D) {
          if (g.isBuffer(P))
            return P.length;
          if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(P) || P instanceof ArrayBuffer))
            return P.byteLength;
          typeof P != "string" && (P = "" + P);
          var W = P.length;
          if (W === 0)
            return 0;
          for (var et = !1; ; )
            switch (D) {
              case "ascii":
              case "latin1":
              case "binary":
                return W;
              case "utf8":
              case "utf-8":
              case void 0:
                return rn(P).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * W;
              case "hex":
                return W >>> 1;
              case "base64":
                return We(P).length;
              default:
                if (et)
                  return rn(P).length;
                D = ("" + D).toLowerCase(), et = !0;
            }
        }
        function O(P, D, W) {
          var et = !1;
          if ((D === void 0 || D < 0) && (D = 0), D > this.length || ((W === void 0 || W > this.length) && (W = this.length), W <= 0) || (W >>>= 0, D >>>= 0, W <= D))
            return "";
          for (P || (P = "utf8"); ; )
            switch (P) {
              case "hex":
                return Et(this, D, W);
              case "utf8":
              case "utf-8":
                return Nt(this, D, W);
              case "ascii":
                return mt(this, D, W);
              case "latin1":
              case "binary":
                return pt(this, D, W);
              case "base64":
                return wt(this, D, W);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return Mt(this, D, W);
              default:
                if (et)
                  throw new TypeError("Unknown encoding: " + P);
                P = (P + "").toLowerCase(), et = !0;
            }
        }
        function M(P, D, W) {
          var et = P[D];
          P[D] = P[W], P[W] = et;
        }
        function L(P, D, W, et, ct) {
          if (P.length === 0)
            return -1;
          if (typeof W == "string" ? (et = W, W = 0) : W > 2147483647 ? W = 2147483647 : W < -2147483648 && (W = -2147483648), W = +W, isNaN(W) && (W = ct ? 0 : P.length - 1), W < 0 && (W = P.length + W), W >= P.length) {
            if (ct)
              return -1;
            W = P.length - 1;
          } else if (W < 0) {
            if (!ct)
              return -1;
            W = 0;
          }
          if (typeof D == "string" && (D = g.from(D, et)), g.isBuffer(D))
            return D.length === 0 ? -1 : x(P, D, W, et, ct);
          if (typeof D == "number")
            return D &= 255, g.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? ct ? Uint8Array.prototype.indexOf.call(P, D, W) : Uint8Array.prototype.lastIndexOf.call(P, D, W) : x(P, [D], W, et, ct);
          throw new TypeError("val must be string, number or Buffer");
        }
        function x(P, D, W, et, ct) {
          var yt, Wt = 1, Se = P.length, Pe = D.length;
          if (et !== void 0 && (et = String(et).toLowerCase(), et === "ucs2" || et === "ucs-2" || et === "utf16le" || et === "utf-16le")) {
            if (P.length < 2 || D.length < 2)
              return -1;
            Wt = 2, Se /= 2, Pe /= 2, W /= 2;
          }
          function we(kr, Ge) {
            return Wt === 1 ? kr[Ge] : kr.readUInt16BE(Ge * Wt);
          }
          if (ct) {
            var ke = -1;
            for (yt = W; yt < Se; yt++)
              if (we(P, yt) === we(D, ke === -1 ? 0 : yt - ke)) {
                if (ke === -1 && (ke = yt), yt - ke + 1 === Pe)
                  return ke * Wt;
              } else
                ke !== -1 && (yt -= yt - ke), ke = -1;
          } else
            for (W + Pe > Se && (W = Se - Pe), yt = W; yt >= 0; yt--) {
              for (var ur = !0, Ce = 0; Ce < Pe; Ce++)
                if (we(P, yt + Ce) !== we(D, Ce)) {
                  ur = !1;
                  break;
                }
              if (ur)
                return yt;
            }
          return -1;
        }
        function T(P, D, W, et) {
          W = Number(W) || 0;
          var ct = P.length - W;
          et ? (et = Number(et), et > ct && (et = ct)) : et = ct;
          var yt = D.length;
          if (yt % 2 !== 0)
            throw new TypeError("Invalid hex string");
          et > yt / 2 && (et = yt / 2);
          for (var Wt = 0; Wt < et; ++Wt) {
            var Se = parseInt(D.substr(2 * Wt, 2), 16);
            if (isNaN(Se))
              return Wt;
            P[W + Wt] = Se;
          }
          return Wt;
        }
        function N(P, D, W, et) {
          return fn(rn(D, P.length - W), P, W, et);
        }
        function Y(P, D, W, et) {
          return fn(sr(D), P, W, et);
        }
        function ot(P, D, W, et) {
          return Y(P, D, W, et);
        }
        function at(P, D, W, et) {
          return fn(We(D), P, W, et);
        }
        function St(P, D, W, et) {
          return fn(zr(D, P.length - W), P, W, et);
        }
        function wt(P, D, W) {
          return D === 0 && W === P.length ? z.fromByteArray(P) : z.fromByteArray(P.slice(D, W));
        }
        function Nt(P, D, W) {
          W = Math.min(P.length, W);
          for (var et = [], ct = D; ct < W; ) {
            var yt, Wt, Se, Pe, we = P[ct], ke = null, ur = we > 239 ? 4 : we > 223 ? 3 : we > 191 ? 2 : 1;
            if (ct + ur <= W)
              switch (ur) {
                case 1:
                  we < 128 && (ke = we);
                  break;
                case 2:
                  yt = P[ct + 1], (192 & yt) === 128 && (Pe = (31 & we) << 6 | 63 & yt, Pe > 127 && (ke = Pe));
                  break;
                case 3:
                  yt = P[ct + 1], Wt = P[ct + 2], (192 & yt) === 128 && (192 & Wt) === 128 && (Pe = (15 & we) << 12 | (63 & yt) << 6 | 63 & Wt, Pe > 2047 && (Pe < 55296 || Pe > 57343) && (ke = Pe));
                  break;
                case 4:
                  yt = P[ct + 1], Wt = P[ct + 2], Se = P[ct + 3], (192 & yt) === 128 && (192 & Wt) === 128 && (192 & Se) === 128 && (Pe = (15 & we) << 18 | (63 & yt) << 12 | (63 & Wt) << 6 | 63 & Se, Pe > 65535 && Pe < 1114112 && (ke = Pe));
              }
            ke === null ? (ke = 65533, ur = 1) : ke > 65535 && (ke -= 65536, et.push(ke >>> 10 & 1023 | 55296), ke = 56320 | 1023 & ke), et.push(ke), ct += ur;
          }
          return xe(et);
        }
        G.Buffer = g, G.SlowBuffer = k, G.INSPECT_MAX_BYTES = 50, g.TYPED_ARRAY_SUPPORT = j.TYPED_ARRAY_SUPPORT !== void 0 ? j.TYPED_ARRAY_SUPPORT : v(), G.kMaxLength = u(), g.poolSize = 8192, g._augment = function(P) {
          return P.__proto__ = g.prototype, P;
        }, g.from = function(P, D, W) {
          return w(null, P, D, W);
        }, g.TYPED_ARRAY_SUPPORT && (g.prototype.__proto__ = Uint8Array.prototype, g.__proto__ = Uint8Array, typeof Symbol < "u" && Symbol.species && g[Symbol.species] === g && Object.defineProperty(g, Symbol.species, { value: null, configurable: !0 })), g.alloc = function(P, D, W) {
          return f(null, P, D, W);
        }, g.allocUnsafe = function(P) {
          return y(null, P);
        }, g.allocUnsafeSlow = function(P) {
          return y(null, P);
        }, g.isBuffer = function(P) {
          return !(P == null || !P._isBuffer);
        }, g.compare = function(P, D) {
          if (!g.isBuffer(P) || !g.isBuffer(D))
            throw new TypeError("Arguments must be Buffers");
          if (P === D)
            return 0;
          for (var W = P.length, et = D.length, ct = 0, yt = Math.min(W, et); ct < yt; ++ct)
            if (P[ct] !== D[ct]) {
              W = P[ct], et = D[ct];
              break;
            }
          return W < et ? -1 : et < W ? 1 : 0;
        }, g.isEncoding = function(P) {
          switch (String(P).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }, g.concat = function(P, D) {
          if (!m(P))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (P.length === 0)
            return g.alloc(0);
          var W;
          if (D === void 0)
            for (D = 0, W = 0; W < P.length; ++W)
              D += P[W].length;
          var et = g.allocUnsafe(D), ct = 0;
          for (W = 0; W < P.length; ++W) {
            var yt = P[W];
            if (!g.isBuffer(yt))
              throw new TypeError('"list" argument must be an Array of Buffers');
            yt.copy(et, ct), ct += yt.length;
          }
          return et;
        }, g.byteLength = d, g.prototype._isBuffer = !0, g.prototype.swap16 = function() {
          var P = this.length;
          if (P % 2 !== 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var D = 0; D < P; D += 2)
            M(this, D, D + 1);
          return this;
        }, g.prototype.swap32 = function() {
          var P = this.length;
          if (P % 4 !== 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var D = 0; D < P; D += 4)
            M(this, D, D + 3), M(this, D + 1, D + 2);
          return this;
        }, g.prototype.swap64 = function() {
          var P = this.length;
          if (P % 8 !== 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var D = 0; D < P; D += 8)
            M(this, D, D + 7), M(this, D + 1, D + 6), M(this, D + 2, D + 5), M(this, D + 3, D + 4);
          return this;
        }, g.prototype.toString = function() {
          var P = 0 | this.length;
          return P === 0 ? "" : arguments.length === 0 ? Nt(this, 0, P) : O.apply(this, arguments);
        }, g.prototype.equals = function(P) {
          if (!g.isBuffer(P))
            throw new TypeError("Argument must be a Buffer");
          return this === P || g.compare(this, P) === 0;
        }, g.prototype.inspect = function() {
          var P = "", D = G.INSPECT_MAX_BYTES;
          return this.length > 0 && (P = this.toString("hex", 0, D).match(/.{2}/g).join(" "), this.length > D && (P += " ... ")), "<Buffer " + P + ">";
        }, g.prototype.compare = function(P, D, W, et, ct) {
          if (!g.isBuffer(P))
            throw new TypeError("Argument must be a Buffer");
          if (D === void 0 && (D = 0), W === void 0 && (W = P ? P.length : 0), et === void 0 && (et = 0), ct === void 0 && (ct = this.length), D < 0 || W > P.length || et < 0 || ct > this.length)
            throw new RangeError("out of range index");
          if (et >= ct && D >= W)
            return 0;
          if (et >= ct)
            return -1;
          if (D >= W)
            return 1;
          if (D >>>= 0, W >>>= 0, et >>>= 0, ct >>>= 0, this === P)
            return 0;
          for (var yt = ct - et, Wt = W - D, Se = Math.min(yt, Wt), Pe = this.slice(et, ct), we = P.slice(D, W), ke = 0; ke < Se; ++ke)
            if (Pe[ke] !== we[ke]) {
              yt = Pe[ke], Wt = we[ke];
              break;
            }
          return yt < Wt ? -1 : Wt < yt ? 1 : 0;
        }, g.prototype.includes = function(P, D, W) {
          return this.indexOf(P, D, W) !== -1;
        }, g.prototype.indexOf = function(P, D, W) {
          return L(this, P, D, W, !0);
        }, g.prototype.lastIndexOf = function(P, D, W) {
          return L(this, P, D, W, !1);
        }, g.prototype.write = function(P, D, W, et) {
          if (D === void 0)
            et = "utf8", W = this.length, D = 0;
          else if (W === void 0 && typeof D == "string")
            et = D, W = this.length, D = 0;
          else {
            if (!isFinite(D))
              throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            D |= 0, isFinite(W) ? (W |= 0, et === void 0 && (et = "utf8")) : (et = W, W = void 0);
          }
          var ct = this.length - D;
          if ((W === void 0 || W > ct) && (W = ct), P.length > 0 && (W < 0 || D < 0) || D > this.length)
            throw new RangeError("Attempt to write outside buffer bounds");
          et || (et = "utf8");
          for (var yt = !1; ; )
            switch (et) {
              case "hex":
                return T(this, P, D, W);
              case "utf8":
              case "utf-8":
                return N(this, P, D, W);
              case "ascii":
                return Y(this, P, D, W);
              case "latin1":
              case "binary":
                return ot(this, P, D, W);
              case "base64":
                return at(this, P, D, W);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return St(this, P, D, W);
              default:
                if (yt)
                  throw new TypeError("Unknown encoding: " + et);
                et = ("" + et).toLowerCase(), yt = !0;
            }
        }, g.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        };
        var It = 4096;
        function xe(P) {
          var D = P.length;
          if (D <= It)
            return String.fromCharCode.apply(String, P);
          for (var W = "", et = 0; et < D; )
            W += String.fromCharCode.apply(String, P.slice(et, et += It));
          return W;
        }
        function mt(P, D, W) {
          var et = "";
          W = Math.min(P.length, W);
          for (var ct = D; ct < W; ++ct)
            et += String.fromCharCode(127 & P[ct]);
          return et;
        }
        function pt(P, D, W) {
          var et = "";
          W = Math.min(P.length, W);
          for (var ct = D; ct < W; ++ct)
            et += String.fromCharCode(P[ct]);
          return et;
        }
        function Et(P, D, W) {
          var et = P.length;
          (!D || D < 0) && (D = 0), (!W || W < 0 || W > et) && (W = et);
          for (var ct = "", yt = D; yt < W; ++yt)
            ct += en(P[yt]);
          return ct;
        }
        function Mt(P, D, W) {
          for (var et = P.slice(D, W), ct = "", yt = 0; yt < et.length; yt += 2)
            ct += String.fromCharCode(et[yt] + 256 * et[yt + 1]);
          return ct;
        }
        function xt(P, D, W) {
          if (P % 1 !== 0 || P < 0)
            throw new RangeError("offset is not uint");
          if (P + D > W)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function Yt(P, D, W, et, ct, yt) {
          if (!g.isBuffer(P))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (D > ct || D < yt)
            throw new RangeError('"value" argument is out of bounds');
          if (W + et > P.length)
            throw new RangeError("Index out of range");
        }
        function ce(P, D, W, et) {
          D < 0 && (D = 65535 + D + 1);
          for (var ct = 0, yt = Math.min(P.length - W, 2); ct < yt; ++ct)
            P[W + ct] = (D & 255 << 8 * (et ? ct : 1 - ct)) >>> 8 * (et ? ct : 1 - ct);
        }
        function ye(P, D, W, et) {
          D < 0 && (D = 4294967295 + D + 1);
          for (var ct = 0, yt = Math.min(P.length - W, 4); ct < yt; ++ct)
            P[W + ct] = D >>> 8 * (et ? ct : 3 - ct) & 255;
        }
        function fe(P, D, W, et, ct, yt) {
          if (W + et > P.length)
            throw new RangeError("Index out of range");
          if (W < 0)
            throw new RangeError("Index out of range");
        }
        function Oe(P, D, W, et, ct) {
          return ct || fe(P, D, W, 4), $.write(P, D, W, et, 23, 4), W + 4;
        }
        function be(P, D, W, et, ct) {
          return ct || fe(P, D, W, 8), $.write(P, D, W, et, 52, 8), W + 8;
        }
        g.prototype.slice = function(P, D) {
          var W, et = this.length;
          if (P = ~~P, D = D === void 0 ? et : ~~D, P < 0 ? (P += et, P < 0 && (P = 0)) : P > et && (P = et), D < 0 ? (D += et, D < 0 && (D = 0)) : D > et && (D = et), D < P && (D = P), g.TYPED_ARRAY_SUPPORT)
            W = this.subarray(P, D), W.__proto__ = g.prototype;
          else {
            var ct = D - P;
            W = new g(ct, void 0);
            for (var yt = 0; yt < ct; ++yt)
              W[yt] = this[yt + P];
          }
          return W;
        }, g.prototype.readUIntLE = function(P, D, W) {
          P |= 0, D |= 0, W || xt(P, D, this.length);
          for (var et = this[P], ct = 1, yt = 0; ++yt < D && (ct *= 256); )
            et += this[P + yt] * ct;
          return et;
        }, g.prototype.readUIntBE = function(P, D, W) {
          P |= 0, D |= 0, W || xt(P, D, this.length);
          for (var et = this[P + --D], ct = 1; D > 0 && (ct *= 256); )
            et += this[P + --D] * ct;
          return et;
        }, g.prototype.readUInt8 = function(P, D) {
          return D || xt(P, 1, this.length), this[P];
        }, g.prototype.readUInt16LE = function(P, D) {
          return D || xt(P, 2, this.length), this[P] | this[P + 1] << 8;
        }, g.prototype.readUInt16BE = function(P, D) {
          return D || xt(P, 2, this.length), this[P] << 8 | this[P + 1];
        }, g.prototype.readUInt32LE = function(P, D) {
          return D || xt(P, 4, this.length), (this[P] | this[P + 1] << 8 | this[P + 2] << 16) + 16777216 * this[P + 3];
        }, g.prototype.readUInt32BE = function(P, D) {
          return D || xt(P, 4, this.length), 16777216 * this[P] + (this[P + 1] << 16 | this[P + 2] << 8 | this[P + 3]);
        }, g.prototype.readIntLE = function(P, D, W) {
          P |= 0, D |= 0, W || xt(P, D, this.length);
          for (var et = this[P], ct = 1, yt = 0; ++yt < D && (ct *= 256); )
            et += this[P + yt] * ct;
          return ct *= 128, et >= ct && (et -= Math.pow(2, 8 * D)), et;
        }, g.prototype.readIntBE = function(P, D, W) {
          P |= 0, D |= 0, W || xt(P, D, this.length);
          for (var et = D, ct = 1, yt = this[P + --et]; et > 0 && (ct *= 256); )
            yt += this[P + --et] * ct;
          return ct *= 128, yt >= ct && (yt -= Math.pow(2, 8 * D)), yt;
        }, g.prototype.readInt8 = function(P, D) {
          return D || xt(P, 1, this.length), 128 & this[P] ? -1 * (255 - this[P] + 1) : this[P];
        }, g.prototype.readInt16LE = function(P, D) {
          D || xt(P, 2, this.length);
          var W = this[P] | this[P + 1] << 8;
          return 32768 & W ? 4294901760 | W : W;
        }, g.prototype.readInt16BE = function(P, D) {
          D || xt(P, 2, this.length);
          var W = this[P + 1] | this[P] << 8;
          return 32768 & W ? 4294901760 | W : W;
        }, g.prototype.readInt32LE = function(P, D) {
          return D || xt(P, 4, this.length), this[P] | this[P + 1] << 8 | this[P + 2] << 16 | this[P + 3] << 24;
        }, g.prototype.readInt32BE = function(P, D) {
          return D || xt(P, 4, this.length), this[P] << 24 | this[P + 1] << 16 | this[P + 2] << 8 | this[P + 3];
        }, g.prototype.readFloatLE = function(P, D) {
          return D || xt(P, 4, this.length), $.read(this, P, !0, 23, 4);
        }, g.prototype.readFloatBE = function(P, D) {
          return D || xt(P, 4, this.length), $.read(this, P, !1, 23, 4);
        }, g.prototype.readDoubleLE = function(P, D) {
          return D || xt(P, 8, this.length), $.read(this, P, !0, 52, 8);
        }, g.prototype.readDoubleBE = function(P, D) {
          return D || xt(P, 8, this.length), $.read(this, P, !1, 52, 8);
        }, g.prototype.writeUIntLE = function(P, D, W, et) {
          if (P = +P, D |= 0, W |= 0, !et) {
            var ct = Math.pow(2, 8 * W) - 1;
            Yt(this, P, D, W, ct, 0);
          }
          var yt = 1, Wt = 0;
          for (this[D] = 255 & P; ++Wt < W && (yt *= 256); )
            this[D + Wt] = P / yt & 255;
          return D + W;
        }, g.prototype.writeUIntBE = function(P, D, W, et) {
          if (P = +P, D |= 0, W |= 0, !et) {
            var ct = Math.pow(2, 8 * W) - 1;
            Yt(this, P, D, W, ct, 0);
          }
          var yt = W - 1, Wt = 1;
          for (this[D + yt] = 255 & P; --yt >= 0 && (Wt *= 256); )
            this[D + yt] = P / Wt & 255;
          return D + W;
        }, g.prototype.writeUInt8 = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 1, 255, 0), g.TYPED_ARRAY_SUPPORT || (P = Math.floor(P)), this[D] = 255 & P, D + 1;
        }, g.prototype.writeUInt16LE = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 2, 65535, 0), g.TYPED_ARRAY_SUPPORT ? (this[D] = 255 & P, this[D + 1] = P >>> 8) : ce(this, P, D, !0), D + 2;
        }, g.prototype.writeUInt16BE = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 2, 65535, 0), g.TYPED_ARRAY_SUPPORT ? (this[D] = P >>> 8, this[D + 1] = 255 & P) : ce(this, P, D, !1), D + 2;
        }, g.prototype.writeUInt32LE = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 4, 4294967295, 0), g.TYPED_ARRAY_SUPPORT ? (this[D + 3] = P >>> 24, this[D + 2] = P >>> 16, this[D + 1] = P >>> 8, this[D] = 255 & P) : ye(this, P, D, !0), D + 4;
        }, g.prototype.writeUInt32BE = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 4, 4294967295, 0), g.TYPED_ARRAY_SUPPORT ? (this[D] = P >>> 24, this[D + 1] = P >>> 16, this[D + 2] = P >>> 8, this[D + 3] = 255 & P) : ye(this, P, D, !1), D + 4;
        }, g.prototype.writeIntLE = function(P, D, W, et) {
          if (P = +P, D |= 0, !et) {
            var ct = Math.pow(2, 8 * W - 1);
            Yt(this, P, D, W, ct - 1, -ct);
          }
          var yt = 0, Wt = 1, Se = 0;
          for (this[D] = 255 & P; ++yt < W && (Wt *= 256); )
            P < 0 && Se === 0 && this[D + yt - 1] !== 0 && (Se = 1), this[D + yt] = (P / Wt >> 0) - Se & 255;
          return D + W;
        }, g.prototype.writeIntBE = function(P, D, W, et) {
          if (P = +P, D |= 0, !et) {
            var ct = Math.pow(2, 8 * W - 1);
            Yt(this, P, D, W, ct - 1, -ct);
          }
          var yt = W - 1, Wt = 1, Se = 0;
          for (this[D + yt] = 255 & P; --yt >= 0 && (Wt *= 256); )
            P < 0 && Se === 0 && this[D + yt + 1] !== 0 && (Se = 1), this[D + yt] = (P / Wt >> 0) - Se & 255;
          return D + W;
        }, g.prototype.writeInt8 = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 1, 127, -128), g.TYPED_ARRAY_SUPPORT || (P = Math.floor(P)), P < 0 && (P = 255 + P + 1), this[D] = 255 & P, D + 1;
        }, g.prototype.writeInt16LE = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 2, 32767, -32768), g.TYPED_ARRAY_SUPPORT ? (this[D] = 255 & P, this[D + 1] = P >>> 8) : ce(this, P, D, !0), D + 2;
        }, g.prototype.writeInt16BE = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 2, 32767, -32768), g.TYPED_ARRAY_SUPPORT ? (this[D] = P >>> 8, this[D + 1] = 255 & P) : ce(this, P, D, !1), D + 2;
        }, g.prototype.writeInt32LE = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 4, 2147483647, -2147483648), g.TYPED_ARRAY_SUPPORT ? (this[D] = 255 & P, this[D + 1] = P >>> 8, this[D + 2] = P >>> 16, this[D + 3] = P >>> 24) : ye(this, P, D, !0), D + 4;
        }, g.prototype.writeInt32BE = function(P, D, W) {
          return P = +P, D |= 0, W || Yt(this, P, D, 4, 2147483647, -2147483648), P < 0 && (P = 4294967295 + P + 1), g.TYPED_ARRAY_SUPPORT ? (this[D] = P >>> 24, this[D + 1] = P >>> 16, this[D + 2] = P >>> 8, this[D + 3] = 255 & P) : ye(this, P, D, !1), D + 4;
        }, g.prototype.writeFloatLE = function(P, D, W) {
          return Oe(this, P, D, !0, W);
        }, g.prototype.writeFloatBE = function(P, D, W) {
          return Oe(this, P, D, !1, W);
        }, g.prototype.writeDoubleLE = function(P, D, W) {
          return be(this, P, D, !0, W);
        }, g.prototype.writeDoubleBE = function(P, D, W) {
          return be(this, P, D, !1, W);
        }, g.prototype.copy = function(P, D, W, et) {
          if (W || (W = 0), et || et === 0 || (et = this.length), D >= P.length && (D = P.length), D || (D = 0), et > 0 && et < W && (et = W), et === W || P.length === 0 || this.length === 0)
            return 0;
          if (D < 0)
            throw new RangeError("targetStart out of bounds");
          if (W < 0 || W >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (et < 0)
            throw new RangeError("sourceEnd out of bounds");
          et > this.length && (et = this.length), P.length - D < et - W && (et = P.length - D + W);
          var ct, yt = et - W;
          if (this === P && W < D && D < et)
            for (ct = yt - 1; ct >= 0; --ct)
              P[ct + D] = this[ct + W];
          else if (yt < 1e3 || !g.TYPED_ARRAY_SUPPORT)
            for (ct = 0; ct < yt; ++ct)
              P[ct + D] = this[ct + W];
          else
            Uint8Array.prototype.set.call(P, this.subarray(W, W + yt), D);
          return yt;
        }, g.prototype.fill = function(P, D, W, et) {
          if (typeof P == "string") {
            if (typeof D == "string" ? (et = D, D = 0, W = this.length) : typeof W == "string" && (et = W, W = this.length), P.length === 1) {
              var ct = P.charCodeAt(0);
              ct < 256 && (P = ct);
            }
            if (et !== void 0 && typeof et != "string")
              throw new TypeError("encoding must be a string");
            if (typeof et == "string" && !g.isEncoding(et))
              throw new TypeError("Unknown encoding: " + et);
          } else
            typeof P == "number" && (P &= 255);
          if (D < 0 || this.length < D || this.length < W)
            throw new RangeError("Out of range index");
          if (W <= D)
            return this;
          var yt;
          if (D >>>= 0, W = W === void 0 ? this.length : W >>> 0, P || (P = 0), typeof P == "number")
            for (yt = D; yt < W; ++yt)
              this[yt] = P;
          else {
            var Wt = g.isBuffer(P) ? P : rn(new g(P, et).toString()), Se = Wt.length;
            for (yt = 0; yt < W - D; ++yt)
              this[yt + D] = Wt[yt % Se];
          }
          return this;
        };
        var ar = /[^+\/0-9A-Za-z-_]/g;
        function fr(P) {
          if (P = Vr(P).replace(ar, ""), P.length < 2)
            return "";
          for (; P.length % 4 !== 0; )
            P += "=";
          return P;
        }
        function Vr(P) {
          return P.trim ? P.trim() : P.replace(/^\s+|\s+$/g, "");
        }
        function en(P) {
          return P < 16 ? "0" + P.toString(16) : P.toString(16);
        }
        function rn(P, D) {
          var W;
          D = D || 1 / 0;
          for (var et = P.length, ct = null, yt = [], Wt = 0; Wt < et; ++Wt) {
            if (W = P.charCodeAt(Wt), W > 55295 && W < 57344) {
              if (!ct) {
                if (W > 56319) {
                  (D -= 3) > -1 && yt.push(239, 191, 189);
                  continue;
                }
                if (Wt + 1 === et) {
                  (D -= 3) > -1 && yt.push(239, 191, 189);
                  continue;
                }
                ct = W;
                continue;
              }
              if (W < 56320) {
                (D -= 3) > -1 && yt.push(239, 191, 189), ct = W;
                continue;
              }
              W = 65536 + (ct - 55296 << 10 | W - 56320);
            } else
              ct && (D -= 3) > -1 && yt.push(239, 191, 189);
            if (ct = null, W < 128) {
              if ((D -= 1) < 0)
                break;
              yt.push(W);
            } else if (W < 2048) {
              if ((D -= 2) < 0)
                break;
              yt.push(W >> 6 | 192, 63 & W | 128);
            } else if (W < 65536) {
              if ((D -= 3) < 0)
                break;
              yt.push(W >> 12 | 224, W >> 6 & 63 | 128, 63 & W | 128);
            } else {
              if (!(W < 1114112))
                throw new Error("Invalid code point");
              if ((D -= 4) < 0)
                break;
              yt.push(W >> 18 | 240, W >> 12 & 63 | 128, W >> 6 & 63 | 128, 63 & W | 128);
            }
          }
          return yt;
        }
        function sr(P) {
          for (var D = [], W = 0; W < P.length; ++W)
            D.push(255 & P.charCodeAt(W));
          return D;
        }
        function zr(P, D) {
          for (var W, et, ct, yt = [], Wt = 0; Wt < P.length && !((D -= 2) < 0); ++Wt)
            W = P.charCodeAt(Wt), et = W >> 8, ct = W % 256, yt.push(ct), yt.push(et);
          return yt;
        }
        function We(P) {
          return z.toByteArray(fr(P));
        }
        function fn(P, D, W, et) {
          for (var ct = 0; ct < et && !(ct + W >= D.length || ct >= P.length); ++ct)
            D[ct + W] = P[ct];
          return ct;
        }
        function _n(P) {
          return P !== P;
        }
      }).call(this, o("c8ba"));
    }, b64b: function(F, G, o) {
      var j = o("23e7"), z = o("7b0b"), $ = o("df75"), m = o("d039"), v = m(function() {
        $(1);
      });
      j({ target: "Object", stat: !0, forced: v }, { keys: function(u) {
        return $(z(u));
      } });
    }, b727: function(F, G, o) {
      var j = o("0366"), z = o("e330"), $ = o("44ad"), m = o("7b0b"), v = o("07fa"), u = o("65f0"), S = z([].push), g = function(w) {
        var a = w == 1, f = w == 2, y = w == 3, l = w == 4, c = w == 6, s = w == 7, b = w == 5 || c;
        return function(h, k, d, O) {
          for (var M, L, x = m(h), T = $(x), N = j(k, d), Y = v(T), ot = 0, at = O || u, St = a ? at(h, Y) : f || s ? at(h, 0) : void 0; Y > ot; ot++)
            if ((b || ot in T) && (M = T[ot], L = N(M, ot, x), w))
              if (a)
                St[ot] = L;
              else if (L)
                switch (w) {
                  case 3:
                    return !0;
                  case 5:
                    return M;
                  case 6:
                    return ot;
                  case 2:
                    S(St, M);
                }
              else
                switch (w) {
                  case 4:
                    return !1;
                  case 7:
                    S(St, M);
                }
          return c ? -1 : y || l ? l : St;
        };
      };
      F.exports = { forEach: g(0), map: g(1), filter: g(2), some: g(3), every: g(4), find: g(5), findIndex: g(6), filterReject: g(7) };
    }, b997: function(F, G, o) {
      (function(j) {
        (function(z, $) {
          F.exports = $();
        })(typeof self < "u" && self, function() {
          return function(z) {
            var $ = {};
            function m(v) {
              if ($[v])
                return $[v].exports;
              var u = $[v] = { i: v, l: !1, exports: {} };
              return z[v].call(u.exports, u, u.exports, m), u.l = !0, u.exports;
            }
            return m.m = z, m.c = $, m.d = function(v, u, S) {
              m.o(v, u) || Object.defineProperty(v, u, { enumerable: !0, get: S });
            }, m.r = function(v) {
              typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(v, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(v, "__esModule", { value: !0 });
            }, m.t = function(v, u) {
              if (1 & u && (v = m(v)), 8 & u || 4 & u && typeof v == "object" && v && v.__esModule)
                return v;
              var S = /* @__PURE__ */ Object.create(null);
              if (m.r(S), Object.defineProperty(S, "default", { enumerable: !0, value: v }), 2 & u && typeof v != "string")
                for (var g in v)
                  m.d(S, g, function(w) {
                    return v[w];
                  }.bind(null, g));
              return S;
            }, m.n = function(v) {
              var u = v && v.__esModule ? function() {
                return v.default;
              } : function() {
                return v;
              };
              return m.d(u, "a", u), u;
            }, m.o = function(v, u) {
              return {}.hasOwnProperty.call(v, u);
            }, m.p = "", m(m.s = 0);
          }([function(z, $, m) {
            function v(p, C) {
              p.prototype = Object.create(C.prototype), p.prototype.constructor = p, p.__proto__ = C;
            }
            function u() {
              return (u = Object.assign || function(p) {
                for (var C = 1; C < arguments.length; C++) {
                  var I = arguments[C];
                  for (var B in I)
                    ({}).hasOwnProperty.call(I, B) && (p[B] = I[B]);
                }
                return p;
              }).apply(this, arguments);
            }
            function S(p) {
              try {
                if (!p)
                  return !1;
                if (typeof Promise < "u" && p instanceof Promise)
                  return !0;
                if (typeof window < "u" && typeof window.Window == "function" && p instanceof window.Window || typeof window < "u" && typeof window.constructor == "function" && p instanceof window.constructor)
                  return !1;
                var C = {}.toString;
                if (C) {
                  var I = C.call(p);
                  if (I === "[object Window]" || I === "[object global]" || I === "[object DOMWindow]")
                    return !1;
                }
                if (typeof p.then == "function")
                  return !0;
              } catch {
                return !1;
              }
              return !1;
            }
            m.r($), m.d($, "PopupOpenError", function() {
              return Hr;
            }), m.d($, "create", function() {
              return La;
            }), m.d($, "destroy", function() {
              return ta;
            }), m.d($, "destroyComponents", function() {
              return Qi;
            }), m.d($, "destroyAll", function() {
              return _a;
            }), m.d($, "PROP_TYPE", function() {
              return ga;
            }), m.d($, "PROP_SERIALIZATION", function() {
              return Ao;
            }), m.d($, "CONTEXT", function() {
              return Ir;
            }), m.d($, "EVENT", function() {
              return yr;
            });
            var g, w = [], a = [], f = 0;
            function y() {
              if (!f && g) {
                var p = g;
                g = null, p.resolve();
              }
            }
            function l() {
              f += 1;
            }
            function c() {
              f -= 1, y();
            }
            var s = function() {
              function p(I) {
                var B = this;
                if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], I) {
                  var q, X, J = !1, rt = !1, ut = !1;
                  l();
                  try {
                    I(function(st) {
                      ut ? B.resolve(st) : (J = !0, q = st);
                    }, function(st) {
                      ut ? B.reject(st) : (rt = !0, X = st);
                    });
                  } catch (st) {
                    return c(), void this.reject(st);
                  }
                  c(), ut = !0, J ? this.resolve(q) : rt && this.reject(X);
                }
              }
              var C = p.prototype;
              return C.resolve = function(I) {
                if (this.resolved || this.rejected)
                  return this;
                if (S(I))
                  throw new Error("Can not resolve promise with another promise");
                return this.resolved = !0, this.value = I, this.dispatch(), this;
              }, C.reject = function(I) {
                var B = this;
                if (this.resolved || this.rejected)
                  return this;
                if (S(I))
                  throw new Error("Can not reject promise with another promise");
                if (!I) {
                  var q = I && typeof I.toString == "function" ? I.toString() : {}.toString.call(I);
                  I = new Error("Expected reject to be called with Error, got " + q);
                }
                return this.rejected = !0, this.error = I, this.errorHandled || setTimeout(function() {
                  B.errorHandled || function(X, J) {
                    if (w.indexOf(X) === -1) {
                      w.push(X), setTimeout(function() {
                        throw X;
                      }, 1);
                      for (var rt = 0; rt < a.length; rt++)
                        a[rt](X, J);
                    }
                  }(I, B);
                }, 1), this.dispatch(), this;
              }, C.asyncReject = function(I) {
                return this.errorHandled = !0, this.reject(I), this;
              }, C.dispatch = function() {
                var I = this.resolved, B = this.rejected, q = this.handlers;
                if (!this.dispatching && (I || B)) {
                  this.dispatching = !0, l();
                  for (var X = function(gt, bt) {
                    return gt.then(function(Ct) {
                      bt.resolve(Ct);
                    }, function(Ct) {
                      bt.reject(Ct);
                    });
                  }, J = 0; J < q.length; J++) {
                    var rt = q[J], ut = rt.onSuccess, st = rt.onError, ft = rt.promise, ht = void 0;
                    if (I)
                      try {
                        ht = ut ? ut(this.value) : this.value;
                      } catch (gt) {
                        ft.reject(gt);
                        continue;
                      }
                    else if (B) {
                      if (!st) {
                        ft.reject(this.error);
                        continue;
                      }
                      try {
                        ht = st(this.error);
                      } catch (gt) {
                        ft.reject(gt);
                        continue;
                      }
                    }
                    ht instanceof p && (ht.resolved || ht.rejected) ? (ht.resolved ? ft.resolve(ht.value) : ft.reject(ht.error), ht.errorHandled = !0) : S(ht) ? ht instanceof p && (ht.resolved || ht.rejected) ? ht.resolved ? ft.resolve(ht.value) : ft.reject(ht.error) : X(ht, ft) : ft.resolve(ht);
                  }
                  q.length = 0, this.dispatching = !1, c();
                }
              }, C.then = function(I, B) {
                if (I && typeof I != "function" && !I.call)
                  throw new Error("Promise.then expected a function for success handler");
                if (B && typeof B != "function" && !B.call)
                  throw new Error("Promise.then expected a function for error handler");
                var q = new p();
                return this.handlers.push({ promise: q, onSuccess: I, onError: B }), this.errorHandled = !0, this.dispatch(), q;
              }, C.catch = function(I) {
                return this.then(void 0, I);
              }, C.finally = function(I) {
                if (I && typeof I != "function" && !I.call)
                  throw new Error("Promise.finally expected a function");
                return this.then(function(B) {
                  return p.try(I).then(function() {
                    return B;
                  });
                }, function(B) {
                  return p.try(I).then(function() {
                    throw B;
                  });
                });
              }, C.timeout = function(I, B) {
                var q = this;
                if (this.resolved || this.rejected)
                  return this;
                var X = setTimeout(function() {
                  q.resolved || q.rejected || q.reject(B || new Error("Promise timed out after " + I + "ms"));
                }, I);
                return this.then(function(J) {
                  return clearTimeout(X), J;
                });
              }, C.toPromise = function() {
                if (typeof Promise > "u")
                  throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
              }, p.resolve = function(I) {
                return I instanceof p ? I : S(I) ? new p(function(B, q) {
                  return I.then(B, q);
                }) : new p().resolve(I);
              }, p.reject = function(I) {
                return new p().reject(I);
              }, p.asyncReject = function(I) {
                return new p().asyncReject(I);
              }, p.all = function(I) {
                var B = new p(), q = I.length, X = [];
                if (!q)
                  return B.resolve(X), B;
                for (var J = function(st, ft, ht) {
                  return ft.then(function(gt) {
                    X[st] = gt, (q -= 1) == 0 && B.resolve(X);
                  }, function(gt) {
                    ht.reject(gt);
                  });
                }, rt = 0; rt < I.length; rt++) {
                  var ut = I[rt];
                  if (ut instanceof p) {
                    if (ut.resolved) {
                      X[rt] = ut.value, q -= 1;
                      continue;
                    }
                  } else if (!S(ut)) {
                    X[rt] = ut, q -= 1;
                    continue;
                  }
                  J(rt, p.resolve(ut), B);
                }
                return q === 0 && B.resolve(X), B;
              }, p.hash = function(I) {
                var B = {}, q = [], X = function(rt) {
                  if (I.hasOwnProperty(rt)) {
                    var ut = I[rt];
                    S(ut) ? q.push(ut.then(function(st) {
                      B[rt] = st;
                    })) : B[rt] = ut;
                  }
                };
                for (var J in I)
                  X(J);
                return p.all(q).then(function() {
                  return B;
                });
              }, p.map = function(I, B) {
                return p.all(I.map(B));
              }, p.onPossiblyUnhandledException = function(I) {
                return function(B) {
                  return a.push(B), { cancel: function() {
                    a.splice(a.indexOf(B), 1);
                  } };
                }(I);
              }, p.try = function(I, B, q) {
                if (I && typeof I != "function" && !I.call)
                  throw new Error("Promise.try expected a function");
                var X;
                l();
                try {
                  X = I.apply(B, q || []);
                } catch (J) {
                  return c(), p.reject(J);
                }
                return c(), p.resolve(X);
              }, p.delay = function(I) {
                return new p(function(B) {
                  setTimeout(B, I);
                });
              }, p.isPromise = function(I) {
                return !!(I && I instanceof p) || S(I);
              }, p.flush = function() {
                return function(I) {
                  var B = g = g || new I();
                  return y(), B;
                }(p);
              }, p;
            }();
            function b(p) {
              return {}.toString.call(p) === "[object RegExp]";
            }
            var h = { IFRAME: "iframe", POPUP: "popup" }, k = `Call was rejected by callee.\r
`;
            function d(p) {
              return p === void 0 && (p = window), p.location.protocol === "about:";
            }
            function O(p) {
              if (p === void 0 && (p = window), p)
                try {
                  if (p.parent && p.parent !== p)
                    return p.parent;
                } catch {
                }
            }
            function M(p) {
              if (p === void 0 && (p = window), p && !O(p))
                try {
                  return p.opener;
                } catch {
                }
            }
            function L(p) {
              try {
                return !0;
              } catch {
              }
              return !1;
            }
            function x(p) {
              p === void 0 && (p = window);
              var C = p.location;
              if (!C)
                throw new Error("Can not read window location");
              var I = C.protocol;
              if (!I)
                throw new Error("Can not read window protocol");
              if (I === "file:")
                return "file://";
              if (I === "about:") {
                var B = O(p);
                return B && L() ? x(B) : "about://";
              }
              var q = C.host;
              if (!q)
                throw new Error("Can not read window host");
              return I + "//" + q;
            }
            function T(p) {
              p === void 0 && (p = window);
              var C = x(p);
              return C && p.mockDomain && p.mockDomain.indexOf("mock:") === 0 ? p.mockDomain : C;
            }
            function N(p) {
              if (!function(C) {
                try {
                  if (C === window)
                    return !0;
                } catch {
                }
                try {
                  var I = Object.getOwnPropertyDescriptor(C, "location");
                  if (I && I.enumerable === !1)
                    return !1;
                } catch {
                }
                try {
                  if (d(C) && L())
                    return !0;
                } catch {
                }
                try {
                  if (x(C) === x(window))
                    return !0;
                } catch {
                }
                return !1;
              }(p))
                return !1;
              try {
                if (p === window || d(p) && L() || T(window) === T(p))
                  return !0;
              } catch {
              }
              return !1;
            }
            function Y(p) {
              if (!N(p))
                throw new Error("Expected window to be same domain");
              return p;
            }
            function ot(p, C) {
              if (!p || !C)
                return !1;
              var I = O(C);
              return I ? I === p : function(B) {
                var q = [];
                try {
                  for (; B.parent !== B; )
                    q.push(B.parent), B = B.parent;
                } catch {
                }
                return q;
              }(C).indexOf(p) !== -1;
            }
            function at(p) {
              var C, I, B = [];
              try {
                C = p.frames;
              } catch {
                C = p;
              }
              try {
                I = C.length;
              } catch {
              }
              if (I === 0)
                return B;
              if (I) {
                for (var q = 0; q < I; q++) {
                  var X = void 0;
                  try {
                    X = C[q];
                  } catch {
                    continue;
                  }
                  B.push(X);
                }
                return B;
              }
              for (var J = 0; J < 100; J++) {
                var rt = void 0;
                try {
                  rt = C[J];
                } catch {
                  return B;
                }
                if (!rt)
                  return B;
                B.push(rt);
              }
              return B;
            }
            function St(p) {
              for (var C = [], I = 0, B = at(p); I < B.length; I++) {
                var q = B[I];
                C.push(q);
                for (var X = 0, J = St(q); X < J.length; X++)
                  C.push(J[X]);
              }
              return C;
            }
            function wt(p) {
              p === void 0 && (p = window);
              try {
                if (p.top)
                  return p.top;
              } catch {
              }
              if (O(p) === p)
                return p;
              try {
                if (ot(window, p) && window.top)
                  return window.top;
              } catch {
              }
              try {
                if (ot(p, window) && window.top)
                  return window.top;
              } catch {
              }
              for (var C = 0, I = St(p); C < I.length; C++) {
                var B = I[C];
                try {
                  if (B.top)
                    return B.top;
                } catch {
                }
                if (O(B) === B)
                  return B;
              }
            }
            function Nt(p) {
              var C = wt(p);
              if (!C)
                throw new Error("Can not determine top window");
              var I = [].concat(St(C), [C]);
              return I.indexOf(p) === -1 && (I = [].concat(I, [p], St(p))), I;
            }
            var It = [], xe = [];
            function mt(p, C) {
              C === void 0 && (C = !0);
              try {
                if (p === window)
                  return !1;
              } catch {
                return !0;
              }
              try {
                if (!p)
                  return !0;
              } catch {
                return !0;
              }
              try {
                if (p.closed)
                  return !0;
              } catch (q) {
                return !q || q.message !== k;
              }
              if (C && N(p))
                try {
                  if (p.mockclosed)
                    return !0;
                } catch {
                }
              try {
                if (!p.parent || !p.top)
                  return !0;
              } catch {
              }
              var I = function(q, X) {
                for (var J = 0; J < q.length; J++)
                  try {
                    if (q[J] === X)
                      return J;
                  } catch {
                  }
                return -1;
              }(It, p);
              if (I !== -1) {
                var B = xe[I];
                if (B && function(q) {
                  if (!q.contentWindow || !q.parentNode)
                    return !0;
                  var X = q.ownerDocument;
                  if (X && X.documentElement && !X.documentElement.contains(q)) {
                    for (var J = q; J.parentNode && J.parentNode !== J; )
                      J = J.parentNode;
                    if (!J.host || !X.documentElement.contains(J.host))
                      return !0;
                  }
                  return !1;
                }(B))
                  return !0;
              }
              return !1;
            }
            function pt(p) {
              return (p = p || window).navigator.mockUserAgent || p.navigator.userAgent;
            }
            function Et(p, C) {
              for (var I = at(p), B = 0; B < I.length; B++) {
                var q = I[B];
                try {
                  if (N(q) && q.name === C && I.indexOf(q) !== -1)
                    return q;
                } catch {
                }
              }
              try {
                if (I.indexOf(p.frames[C]) !== -1)
                  return p.frames[C];
              } catch {
              }
              try {
                if (I.indexOf(p[C]) !== -1)
                  return p[C];
              } catch {
              }
            }
            function Mt(p, C) {
              return p === M(C);
            }
            function xt(p) {
              return p === void 0 && (p = window), M(p = p || window) || O(p) || void 0;
            }
            function Yt(p, C) {
              for (var I = 0; I < p.length; I++)
                for (var B = p[I], q = 0; q < C.length; q++)
                  if (B === C[q])
                    return !0;
              return !1;
            }
            function ce(p) {
              p === void 0 && (p = window);
              for (var C = 0, I = p; I; )
                (I = O(I)) && (C += 1);
              return C;
            }
            function ye(p, C) {
              var I = wt(p) || p, B = wt(C) || C;
              try {
                if (I && B)
                  return I === B;
              } catch {
              }
              var q = Nt(p), X = Nt(C);
              if (Yt(q, X))
                return !0;
              var J = M(I), rt = M(B);
              return J && Yt(Nt(J), X) || rt && Yt(Nt(rt), q), !1;
            }
            function fe(p, C) {
              if (typeof p == "string") {
                if (typeof C == "string")
                  return p === "*" || C === p;
                if (b(C) || Array.isArray(C))
                  return !1;
              }
              return b(p) ? b(C) ? p.toString() === C.toString() : !Array.isArray(C) && Boolean(C.match(p)) : !!Array.isArray(p) && (Array.isArray(C) ? JSON.stringify(p) === JSON.stringify(C) : !b(C) && p.some(function(I) {
                return fe(I, C);
              }));
            }
            function Oe(p) {
              return p.match(/^(https?|mock|file):\/\//) ? p.split("/").slice(0, 3).join("/") : T();
            }
            function be(p, C, I, B) {
              var q;
              return I === void 0 && (I = 1e3), B === void 0 && (B = 1 / 0), function X() {
                if (mt(p))
                  return q && clearTimeout(q), C();
                B <= 0 ? clearTimeout(q) : (B -= I, q = setTimeout(X, I));
              }(), { cancel: function() {
                q && clearTimeout(q);
              } };
            }
            function ar(p) {
              try {
                if (p === window)
                  return !0;
              } catch (C) {
                if (C && C.message === k)
                  return !0;
              }
              try {
                if ({}.toString.call(p) === "[object Window]")
                  return !0;
              } catch (C) {
                if (C && C.message === k)
                  return !0;
              }
              try {
                if (window.Window && p instanceof window.Window)
                  return !0;
              } catch (C) {
                if (C && C.message === k)
                  return !0;
              }
              try {
                if (p && p.self === p)
                  return !0;
              } catch (C) {
                if (C && C.message === k)
                  return !0;
              }
              try {
                if (p && p.parent === p)
                  return !0;
              } catch (C) {
                if (C && C.message === k)
                  return !0;
              }
              try {
                if (p && p.top === p)
                  return !0;
              } catch (C) {
                if (C && C.message === k)
                  return !0;
              }
              try {
                if (p && p.__cross_domain_utils_window_check__ === "__unlikely_value__")
                  return !1;
              } catch {
                return !0;
              }
              try {
                if ("postMessage" in p && "self" in p && "location" in p)
                  return !0;
              } catch {
              }
              return !1;
            }
            function fr(p) {
              if (C = Oe(p), C.indexOf("mock:") !== 0)
                return p;
              var C;
              throw new Error("Mock urls not supported out of test mode");
            }
            function Vr(p) {
              try {
                p.close();
              } catch {
              }
            }
            function en(p, C) {
              for (var I = 0; I < p.length; I++)
                try {
                  if (p[I] === C)
                    return I;
                } catch {
                }
              return -1;
            }
            var rn, sr = function() {
              function p() {
                if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__", function() {
                  if (typeof WeakMap > "u" || Object.freeze === void 0)
                    return !1;
                  try {
                    var I = /* @__PURE__ */ new WeakMap(), B = {};
                    return Object.freeze(B), I.set(B, "__testvalue__"), I.get(B) === "__testvalue__";
                  } catch {
                    return !1;
                  }
                }())
                  try {
                    this.weakmap = /* @__PURE__ */ new WeakMap();
                  } catch {
                  }
                this.keys = [], this.values = [];
              }
              var C = p.prototype;
              return C._cleanupClosedWindows = function() {
                for (var I = this.weakmap, B = this.keys, q = 0; q < B.length; q++) {
                  var X = B[q];
                  if (ar(X) && mt(X)) {
                    if (I)
                      try {
                        I.delete(X);
                      } catch {
                      }
                    B.splice(q, 1), this.values.splice(q, 1), q -= 1;
                  }
                }
              }, C.isSafeToReadWrite = function(I) {
                return !ar(I);
              }, C.set = function(I, B) {
                if (!I)
                  throw new Error("WeakMap expected key");
                var q = this.weakmap;
                if (q)
                  try {
                    q.set(I, B);
                  } catch {
                    delete this.weakmap;
                  }
                if (this.isSafeToReadWrite(I))
                  try {
                    var X = this.name, J = I[X];
                    return void (J && J[0] === I ? J[1] = B : Object.defineProperty(I, X, { value: [I, B], writable: !0 }));
                  } catch {
                  }
                this._cleanupClosedWindows();
                var rt = this.keys, ut = this.values, st = en(rt, I);
                st === -1 ? (rt.push(I), ut.push(B)) : ut[st] = B;
              }, C.get = function(I) {
                if (!I)
                  throw new Error("WeakMap expected key");
                var B = this.weakmap;
                if (B)
                  try {
                    if (B.has(I))
                      return B.get(I);
                  } catch {
                    delete this.weakmap;
                  }
                if (this.isSafeToReadWrite(I))
                  try {
                    var q = I[this.name];
                    return q && q[0] === I ? q[1] : void 0;
                  } catch {
                  }
                this._cleanupClosedWindows();
                var X = en(this.keys, I);
                if (X !== -1)
                  return this.values[X];
              }, C.delete = function(I) {
                if (!I)
                  throw new Error("WeakMap expected key");
                var B = this.weakmap;
                if (B)
                  try {
                    B.delete(I);
                  } catch {
                    delete this.weakmap;
                  }
                if (this.isSafeToReadWrite(I))
                  try {
                    var q = I[this.name];
                    q && q[0] === I && (q[0] = q[1] = void 0);
                  } catch {
                  }
                this._cleanupClosedWindows();
                var X = this.keys, J = en(X, I);
                J !== -1 && (X.splice(J, 1), this.values.splice(J, 1));
              }, C.has = function(I) {
                if (!I)
                  throw new Error("WeakMap expected key");
                var B = this.weakmap;
                if (B)
                  try {
                    if (B.has(I))
                      return !0;
                  } catch {
                    delete this.weakmap;
                  }
                if (this.isSafeToReadWrite(I))
                  try {
                    var q = I[this.name];
                    return !(!q || q[0] !== I);
                  } catch {
                  }
                return this._cleanupClosedWindows(), en(this.keys, I) !== -1;
              }, C.getOrSet = function(I, B) {
                if (this.has(I))
                  return this.get(I);
                var q = B();
                return this.set(I, q), q;
              }, p;
            }();
            function zr(p) {
              return (zr = Object.setPrototypeOf ? Object.getPrototypeOf : function(C) {
                return C.__proto__ || Object.getPrototypeOf(C);
              })(p);
            }
            function We(p, C) {
              return (We = Object.setPrototypeOf || function(I, B) {
                return I.__proto__ = B, I;
              })(p, C);
            }
            function fn() {
              if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
                return !1;
              if (typeof Proxy == "function")
                return !0;
              try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                })), !0;
              } catch {
                return !1;
              }
            }
            function _n(p, C, I) {
              return (_n = fn() ? Reflect.construct : function(B, q, X) {
                var J = [null];
                J.push.apply(J, q);
                var rt = new (Function.bind.apply(B, J))();
                return X && We(rt, X.prototype), rt;
              }).apply(null, arguments);
            }
            function P(p) {
              var C = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
              return (P = function(I) {
                if (I === null || (B = I, Function.toString.call(B).indexOf("[native code]") === -1))
                  return I;
                var B;
                if (typeof I != "function")
                  throw new TypeError("Super expression must either be null or a function");
                if (C !== void 0) {
                  if (C.has(I))
                    return C.get(I);
                  C.set(I, q);
                }
                function q() {
                  return _n(I, arguments, zr(this).constructor);
                }
                return q.prototype = Object.create(I.prototype, { constructor: { value: q, enumerable: !1, writable: !0, configurable: !0 } }), We(q, I);
              })(p);
            }
            function D(p) {
              return p.name || p.__name__ || p.displayName || "anonymous";
            }
            function W(p, C) {
              try {
                delete p.name, p.name = C;
              } catch {
              }
              return p.__name__ = p.displayName = C, p;
            }
            function et(p) {
              if (typeof btoa == "function")
                return btoa(encodeURIComponent(p).replace(/%([0-9A-F]{2})/g, function(C, I) {
                  return String.fromCharCode(parseInt(I, 16));
                }));
              if (typeof j < "u")
                return j.from(p, "utf8").toString("base64");
              throw new Error("Can not find window.btoa or Buffer");
            }
            function ct() {
              var p = "0123456789abcdef";
              return "xxxxxxxxxx".replace(/./g, function() {
                return p.charAt(Math.floor(Math.random() * p.length));
              }) + "_" + et(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            }
            function yt(p) {
              try {
                return JSON.stringify([].slice.call(p), function(C, I) {
                  return typeof I == "function" ? "memoize[" + function(B) {
                    if (rn = rn || new sr(), B == null || typeof B != "object" && typeof B != "function")
                      throw new Error("Invalid object");
                    var q = rn.get(B);
                    return q || (q = typeof B + ":" + ct(), rn.set(B, q)), q;
                  }(I) + "]" : I;
                });
              } catch {
                throw new Error("Arguments not serializable -- can not be used to memoize");
              }
            }
            function Wt() {
              return {};
            }
            var Se = 0, Pe = 0;
            function we(p, C) {
              C === void 0 && (C = {});
              var I, B, q = C.thisNamespace, X = q !== void 0 && q, J = C.time, rt = Se;
              Se += 1;
              var ut = function() {
                for (var st = arguments.length, ft = new Array(st), ht = 0; ht < st; ht++)
                  ft[ht] = arguments[ht];
                var gt;
                rt < Pe && (I = null, B = null, rt = Se, Se += 1), gt = X ? (B = B || new sr()).getOrSet(this, Wt) : I = I || {};
                var bt = yt(ft), Ct = gt[bt];
                if (Ct && J && Date.now() - Ct.time < J && (delete gt[bt], Ct = null), Ct)
                  return Ct.value;
                var Bt = Date.now(), re = p.apply(this, arguments);
                return gt[bt] = { time: Bt, value: re }, re;
              };
              return ut.reset = function() {
                I = null, B = null;
              }, W(ut, (C.name || D(p)) + "::memoized");
            }
            function ke(p) {
              var C = {};
              function I() {
                for (var B = arguments, q = this, X = arguments.length, J = new Array(X), rt = 0; rt < X; rt++)
                  J[rt] = arguments[rt];
                var ut = yt(J);
                return C.hasOwnProperty(ut) || (C[ut] = s.try(function() {
                  return p.apply(q, B);
                }).finally(function() {
                  delete C[ut];
                })), C[ut];
              }
              return I.reset = function() {
                C = {};
              }, W(I, D(p) + "::promiseMemoized");
            }
            function ur(p, C, I) {
              I === void 0 && (I = []);
              var B = p.__inline_memoize_cache__ = p.__inline_memoize_cache__ || {}, q = yt(I);
              return B.hasOwnProperty(q) ? B[q] : B[q] = C.apply(void 0, I);
            }
            function Ce() {
            }
            function kr(p) {
              var C = !1;
              return W(function() {
                if (!C)
                  return C = !0, p.apply(this, arguments);
              }, D(p) + "::once");
            }
            function Ge(p, C) {
              if (C === void 0 && (C = 1), C >= 3)
                return "stringifyError stack overflow";
              try {
                if (!p)
                  return "<unknown error: " + {}.toString.call(p) + ">";
                if (typeof p == "string")
                  return p;
                if (p instanceof Error) {
                  var I = p && p.stack, B = p && p.message;
                  if (I && B)
                    return I.indexOf(B) !== -1 ? I : B + `
` + I;
                  if (I)
                    return I;
                  if (B)
                    return B;
                }
                return p && p.toString && typeof p.toString == "function" ? p.toString() : {}.toString.call(p);
              } catch (q) {
                return "Error while stringifying error: " + Ge(q, C + 1);
              }
            }
            function Jr(p) {
              return typeof p == "string" ? p : p && p.toString && typeof p.toString == "function" ? p.toString() : {}.toString.call(p);
            }
            function dr(p, C) {
              if (!C)
                return p;
              if (Object.assign)
                return Object.assign(p, C);
              for (var I in C)
                C.hasOwnProperty(I) && (p[I] = C[I]);
              return p;
            }
            function Pt(p) {
              return p;
            }
            function Ut(p, C) {
              var I;
              return function B() {
                I = setTimeout(function() {
                  p(), B();
                }, C);
              }(), { cancel: function() {
                clearTimeout(I);
              } };
            }
            function te(p, C, I) {
              if (Array.isArray(p)) {
                if (typeof C != "number")
                  throw new TypeError("Array key must be number");
              } else if (typeof p == "object" && p !== null && typeof C != "string")
                throw new TypeError("Object key must be string");
              Object.defineProperty(p, C, { configurable: !0, enumerable: !0, get: function() {
                delete p[C];
                var B = I();
                return p[C] = B, B;
              }, set: function(B) {
                delete p[C], p[C] = B;
              } });
            }
            function Jt(p) {
              return [].slice.call(p);
            }
            function He(p) {
              return typeof (C = p) == "object" && C !== null && {}.toString.call(p) === "[object Object]";
              var C;
            }
            function tr(p) {
              if (!He(p))
                return !1;
              var C = p.constructor;
              if (typeof C != "function")
                return !1;
              var I = C.prototype;
              return !!He(I) && !!I.hasOwnProperty("isPrototypeOf");
            }
            function Dt(p, C, I) {
              if (I === void 0 && (I = ""), Array.isArray(p)) {
                for (var B = p.length, q = [], X = function(ft) {
                  te(q, ft, function() {
                    var ht = I ? I + "." + ft : "" + ft, gt = C(p[ft], ft, ht);
                    return (tr(gt) || Array.isArray(gt)) && (gt = Dt(gt, C, ht)), gt;
                  });
                }, J = 0; J < B; J++)
                  X(J);
                return q;
              }
              if (tr(p)) {
                var rt = {}, ut = function(ft) {
                  if (!p.hasOwnProperty(ft))
                    return "continue";
                  te(rt, ft, function() {
                    var ht = I ? I + "." + ft : "" + ft, gt = C(p[ft], ft, ht);
                    return (tr(gt) || Array.isArray(gt)) && (gt = Dt(gt, C, ht)), gt;
                  });
                };
                for (var st in p)
                  ut(st);
                return rt;
              }
              throw new Error("Pass an object or array");
            }
            function Vt(p) {
              return p != null;
            }
            function ue(p) {
              return {}.toString.call(p) === "[object RegExp]";
            }
            function de(p, C, I) {
              if (p.hasOwnProperty(C))
                return p[C];
              var B = I();
              return p[C] = B, B;
            }
            function Ke(p) {
              var C, I = [], B = !1;
              return { set: function(q, X) {
                return B || (p[q] = X, this.register(function() {
                  delete p[q];
                })), X;
              }, register: function(q) {
                B ? q(C) : I.push(kr(function() {
                  return q(C);
                }));
              }, all: function(q) {
                C = q;
                var X = [];
                for (B = !0; I.length; ) {
                  var J = I.shift();
                  X.push(J());
                }
                return s.all(X).then(Ce);
              } };
            }
            function xn(p, C) {
              if (C == null)
                throw new Error("Expected " + p + " to be present");
              return C;
            }
            we.clear = function() {
              Pe = Se;
            }, we(function(p) {
              if (Object.values)
                return Object.values(p);
              var C = [];
              for (var I in p)
                p.hasOwnProperty(I) && C.push(p[I]);
              return C;
            });
            var Lt = function(p) {
              function C(I) {
                var B;
                return (B = p.call(this, I) || this).name = B.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(q) {
                  if (q === void 0)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return q;
                }(B), B.constructor) : B.stack = new Error(I).stack, B;
              }
              return v(C, p), C;
            }(P(Error));
            function je() {
              return Boolean(document.body) && document.readyState === "complete";
            }
            function Ro() {
              return Boolean(document.body) && document.readyState === "interactive";
            }
            function ua(p) {
              return p.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
            }
            function la(p) {
              return ur(la, function() {
                var C = {};
                if (!p || p.indexOf("=") === -1)
                  return C;
                for (var I = 0, B = p.split("&"); I < B.length; I++) {
                  var q = B[I];
                  (q = q.split("="))[0] && q[1] && (C[decodeURIComponent(q[0])] = decodeURIComponent(q[1]));
                }
                return C;
              }, [p]);
            }
            function oo(p, C) {
              return C === void 0 && (C = {}), C && Object.keys(C).length ? function(I) {
                return I === void 0 && (I = {}), Object.keys(I).filter(function(B) {
                  return typeof I[B] == "string";
                }).map(function(B) {
                  return ua(B) + "=" + ua(I[B]);
                }).join("&");
              }(u({}, la(p), C)) : p;
            }
            function _o(p, C) {
              p.appendChild(C);
            }
            function _i(p) {
              return p instanceof window.Element || p !== null && typeof p == "object" && p.nodeType === 1 && typeof p.style == "object" && typeof p.ownerDocument == "object";
            }
            function Io(p, C) {
              return C === void 0 && (C = document), _i(p) ? p : typeof p == "string" ? C.querySelector(p) : void 0;
            }
            function xi(p) {
              return new s(function(C, I) {
                var B = Jr(p), q = Io(p);
                if (q)
                  return C(q);
                if (je())
                  return I(new Error("Document is ready and element " + B + " does not exist"));
                var X = setInterval(function() {
                  return (q = Io(p)) ? (clearInterval(X), C(q)) : je() ? (clearInterval(X), I(new Error("Document is ready and element " + B + " does not exist"))) : void 0;
                }, 10);
              });
            }
            we(function() {
              return new s(function(p) {
                if (je() || Ro())
                  return p();
                var C = setInterval(function() {
                  if (je() || Ro())
                    return clearInterval(C), p();
                }, 10);
              });
            });
            var vr, Hr = function(p) {
              function C() {
                return p.apply(this, arguments) || this;
              }
              return v(C, p), C;
            }(Lt);
            function Jo(p) {
              if ((vr = vr || new sr()).has(p)) {
                var C = vr.get(p);
                if (C)
                  return C;
              }
              var I = new s(function(B, q) {
                p.addEventListener("load", function() {
                  (function(X) {
                    if (function() {
                      for (var J = 0; J < It.length; J++) {
                        var rt = !1;
                        try {
                          rt = It[J].closed;
                        } catch {
                        }
                        rt && (xe.splice(J, 1), It.splice(J, 1));
                      }
                    }(), X && X.contentWindow)
                      try {
                        It.push(X.contentWindow), xe.push(X);
                      } catch {
                      }
                  })(p), B(p);
                }), p.addEventListener("error", function(X) {
                  p.contentWindow ? B(p) : q(X);
                });
              });
              return vr.set(p, I), I;
            }
            function Sn(p) {
              return Jo(p).then(function(C) {
                if (!C.contentWindow)
                  throw new Error("Could not find window in iframe");
                return C.contentWindow;
              });
            }
            function fa(p, C) {
              p === void 0 && (p = {});
              var I = p.style || {}, B = function(X, J, rt) {
                X === void 0 && (X = "div"), J === void 0 && (J = {}), X = X.toLowerCase();
                var ut = document.createElement(X);
                if (J.style && dr(ut.style, J.style), J.class && (ut.className = J.class.join(" ")), J.id && ut.setAttribute("id", J.id), J.attributes)
                  for (var st = 0, ft = Object.keys(J.attributes); st < ft.length; st++) {
                    var ht = ft[st];
                    ut.setAttribute(ht, J.attributes[ht]);
                  }
                if (J.styleSheet && function(gt, bt, Ct) {
                  Ct === void 0 && (Ct = window.document), gt.styleSheet ? gt.styleSheet.cssText = bt : gt.appendChild(Ct.createTextNode(bt));
                }(ut, J.styleSheet), J.html) {
                  if (X === "iframe")
                    throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                  ut.innerHTML = J.html;
                }
                return ut;
              }("iframe", { attributes: u({ allowTransparency: "true" }, p.attributes || {}), style: u({ backgroundColor: "transparent", border: "none" }, I), html: p.html, class: p.class }), q = window.navigator.userAgent.match(/MSIE|Edge/i);
              return B.hasAttribute("id") || B.setAttribute("id", ct()), Jo(B), C && function(X, J) {
                J === void 0 && (J = document);
                var rt = Io(X, J);
                if (rt)
                  return rt;
                throw new Error("Can not find element: " + Jr(X));
              }(C).appendChild(B), (p.url || q) && B.setAttribute("src", p.url || "about:blank"), B;
            }
            function $n(p, C, I) {
              return p.addEventListener(C, I), { cancel: function() {
                p.removeEventListener(C, I);
              } };
            }
            function Ia(p) {
              p.style.setProperty("display", "");
            }
            function Fi(p) {
              p.style.setProperty("display", "none", "important");
            }
            function Zo(p) {
              p && p.parentNode && p.parentNode.removeChild(p);
            }
            function Bi(p) {
              return !(p && p.parentNode && p.ownerDocument && p.ownerDocument.documentElement && p.ownerDocument.documentElement.contains(p));
            }
            function io(p, C, I) {
              var B = I === void 0 ? {} : I, q = B.width, X = q === void 0 || q, J = B.height, rt = J === void 0 || J, ut = B.interval, st = ut === void 0 ? 100 : ut, ft = B.win, ht = ft === void 0 ? window : ft, gt = p.offsetWidth, bt = p.offsetHeight, Ct = !1;
              C({ width: gt, height: bt });
              var Bt, re, Xt = function() {
                if (!Ct && function(Ft) {
                  return Boolean(Ft.offsetWidth || Ft.offsetHeight || Ft.getClientRects().length);
                }(p)) {
                  var pe = p.offsetWidth, ge = p.offsetHeight;
                  (X && pe !== gt || rt && ge !== bt) && C({ width: pe, height: ge }), gt = pe, bt = ge;
                }
              };
              return ht.addEventListener("resize", Xt), ht.ResizeObserver !== void 0 ? ((Bt = new ht.ResizeObserver(Xt)).observe(p), re = Ut(Xt, 10 * st)) : ht.MutationObserver !== void 0 ? ((Bt = new ht.MutationObserver(Xt)).observe(p, { attributes: !0, childList: !0, subtree: !0, characterData: !1 }), re = Ut(Xt, 10 * st)) : re = Ut(Xt, st), { cancel: function() {
                Ct = !0, Bt.disconnect(), window.removeEventListener("resize", Xt), re.cancel();
              } };
            }
            function Xo(p) {
              for (; p.parentNode; )
                p = p.parentNode;
              return p.toString() === "[object ShadowRoot]";
            }
            var Pn = typeof document < "u" ? document.currentScript : null, Wn = we(function() {
              if (Pn || (Pn = function() {
                try {
                  var p = function() {
                    try {
                      throw new Error("_");
                    } catch (J) {
                      return J.stack || "";
                    }
                  }(), C = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(p), I = C && C[1];
                  if (!I)
                    return;
                  for (var B = 0, q = [].slice.call(document.getElementsByTagName("script")).reverse(); B < q.length; B++) {
                    var X = q[B];
                    if (X.src && X.src === I)
                      return X;
                  }
                } catch {
                }
              }()))
                return Pn;
              throw new Error("Can not determine current script");
            }), kn = ct();
            function Si(p) {
              return typeof p == "string" && /^[0-9]+%$/.test(p);
            }
            function To(p) {
              if (typeof p == "number")
                return p;
              var C = p.match(/^([0-9]+)(px|%)$/);
              if (!C)
                throw new Error("Could not match css value from " + p);
              return parseInt(C[1], 10);
            }
            function Ui(p) {
              return To(p) + "px";
            }
            function An(p) {
              return typeof p == "number" ? Ui(p) : Si(p) ? p : Ui(p);
            }
            function qn(p, C) {
              if (typeof p == "number")
                return p;
              if (Si(p))
                return parseInt(C * To(p) / 100, 10);
              if (typeof (I = p) == "string" && /^[0-9]+px$/.test(I))
                return To(p);
              var I;
              throw new Error("Can not normalize dimension: " + p);
            }
            function hn(p) {
              p === void 0 && (p = window);
              var C = "__post_robot_10_0_42__";
              return p !== window ? p[C] : p[C] = p[C] || {};
            }
            we(function() {
              var p;
              try {
                p = Wn();
              } catch {
                return kn;
              }
              var C = p.getAttribute("data-uid");
              return C && typeof C == "string" || (C = p.getAttribute("data-uid-auto")) && typeof C == "string" || (C = ct(), p.setAttribute("data-uid-auto", C)), C;
            });
            var ki = function() {
              return {};
            };
            function Be(p, C) {
              return p === void 0 && (p = "store"), C === void 0 && (C = ki), de(hn(), p, function() {
                var I = C();
                return { has: function(B) {
                  return I.hasOwnProperty(B);
                }, get: function(B, q) {
                  return I.hasOwnProperty(B) ? I[B] : q;
                }, set: function(B, q) {
                  return I[B] = q, q;
                }, del: function(B) {
                  delete I[B];
                }, getOrSet: function(B, q) {
                  return de(I, B, q);
                }, reset: function() {
                  I = C();
                }, keys: function() {
                  return Object.keys(I);
                } };
              });
            }
            var Yr, Ai = function() {
            };
            function Mo() {
              var p = hn();
              return p.WINDOW_WILDCARD = p.WINDOW_WILDCARD || new Ai(), p.WINDOW_WILDCARD;
            }
            function xr(p, C) {
              return p === void 0 && (p = "store"), C === void 0 && (C = ki), Be("windowStore").getOrSet(p, function() {
                var I = new sr(), B = function(q) {
                  return I.getOrSet(q, C);
                };
                return { has: function(q) {
                  return B(q).hasOwnProperty(p);
                }, get: function(q, X) {
                  var J = B(q);
                  return J.hasOwnProperty(p) ? J[p] : X;
                }, set: function(q, X) {
                  return B(q)[p] = X, X;
                }, del: function(q) {
                  delete B(q)[p];
                }, getOrSet: function(q, X) {
                  return de(B(q), p, X);
                } };
              });
            }
            function Wi() {
              return Be("instance").getOrSet("instanceID", ct);
            }
            function Qo(p, C) {
              var I = C.domain, B = xr("helloPromises"), q = B.get(p);
              q && q.resolve({ domain: I });
              var X = s.resolve({ domain: I });
              return B.set(p, X), X;
            }
            function ti(p, C) {
              return (0, C.send)(p, "postrobot_hello", { instanceID: Wi() }, { domain: "*", timeout: -1 }).then(function(I) {
                var B = I.origin, q = I.data.instanceID;
                return Qo(p, { domain: B }), { win: p, domain: B, instanceID: q };
              });
            }
            function Vn(p, C) {
              var I = C.send;
              return xr("windowInstanceIDPromises").getOrSet(p, function() {
                return ti(p, { send: I }).then(function(B) {
                  return B.instanceID;
                });
              });
            }
            function xo(p, C, I) {
              C === void 0 && (C = 5e3), I === void 0 && (I = "Window");
              var B = function(q) {
                return xr("helloPromises").getOrSet(q, function() {
                  return new s();
                });
              }(p);
              return C !== -1 && (B = B.timeout(C, new Error(I + " did not load after " + C + "ms"))), B;
            }
            function ao(p) {
              xr("knownWindows").set(p, !0);
            }
            function Hn(p) {
              return typeof p == "object" && p !== null && typeof p.__type__ == "string";
            }
            function ei(p) {
              return p === void 0 ? "undefined" : p === null ? "null" : Array.isArray(p) ? "array" : typeof p == "function" ? "function" : typeof p == "object" ? p instanceof Error ? "error" : typeof p.then == "function" ? "promise" : {}.toString.call(p) === "[object RegExp]" ? "regex" : {}.toString.call(p) === "[object Date]" ? "date" : "object" : typeof p == "string" ? "string" : typeof p == "number" ? "number" : typeof p == "boolean" ? "boolean" : void 0;
            }
            function so(p, C) {
              return { __type__: p, __val__: C };
            }
            var on, Yn = ((Yr = {}).function = function() {
            }, Yr.error = function(p) {
              return so("error", { message: p.message, stack: p.stack, code: p.code, data: p.data });
            }, Yr.promise = function() {
            }, Yr.regex = function(p) {
              return so("regex", p.source);
            }, Yr.date = function(p) {
              return so("date", p.toJSON());
            }, Yr.array = function(p) {
              return p;
            }, Yr.object = function(p) {
              return p;
            }, Yr.string = function(p) {
              return p;
            }, Yr.number = function(p) {
              return p;
            }, Yr.boolean = function(p) {
              return p;
            }, Yr.null = function(p) {
              return p;
            }, Yr), co = {}, Ta = ((on = {}).function = function() {
              throw new Error("Function serialization is not implemented; nothing to deserialize");
            }, on.error = function(p) {
              var C = p.stack, I = p.code, B = p.data, q = new Error(p.message);
              return q.code = I, B && (q.data = B), q.stack = C + `

` + q.stack, q;
            }, on.promise = function() {
              throw new Error("Promise serialization is not implemented; nothing to deserialize");
            }, on.regex = function(p) {
              return new RegExp(p);
            }, on.date = function(p) {
              return new Date(p);
            }, on.array = function(p) {
              return p;
            }, on.object = function(p) {
              return p;
            }, on.string = function(p) {
              return p;
            }, on.number = function(p) {
              return p;
            }, on.boolean = function(p) {
              return p;
            }, on.null = function(p) {
              return p;
            }, on), da = {};
            function zo() {
              return !!pt(window).match(/MSIE|trident|edge\/12|edge\/13/i);
            }
            function uo(p) {
              return !ye(window, p);
            }
            function lo(p, C) {
              if (p) {
                if (T() !== Oe(p))
                  return !0;
              } else if (C && !N(C))
                return !0;
              return !1;
            }
            function ri(p) {
              var C = p.win, I = p.domain;
              return !(!zo() || I && !lo(I, C) || C && !uo(C));
            }
            function Do(p) {
              return "__postrobot_bridge___" + (p = p || Oe(p)).replace(/[^a-zA-Z0-9]+/g, "_");
            }
            function pa() {
              return Boolean(window.name && window.name === Do(T()));
            }
            var Lo = new s(function(p) {
              if (window.document && window.document.body)
                return p(window.document.body);
              var C = setInterval(function() {
                if (window.document && window.document.body)
                  return clearInterval(C), p(window.document.body);
              }, 10);
            });
            function Ei(p) {
              xr("remoteWindowPromises").getOrSet(p, function() {
                return new s();
              });
            }
            function qi(p) {
              var C = xr("remoteWindowPromises").get(p);
              if (!C)
                throw new Error("Remote window promise not found");
              return C;
            }
            function No(p, C, I) {
              qi(p).resolve(function(B, q, X) {
                if (B !== p)
                  throw new Error("Remote window does not match window");
                if (!fe(q, C))
                  throw new Error("Remote domain " + q + " does not match domain " + C);
                I.fireAndForget(X);
              });
            }
            function Fo(p, C) {
              qi(p).reject(C).catch(Ce);
            }
            function ni(p) {
              for (var C = p.win, I = p.name, B = p.domain, q = Be("popupWindowsByName"), X = xr("popupWindowsByWin"), J = 0, rt = q.keys(); J < rt.length; J++) {
                var ut = rt[J], st = q.get(ut);
                st && !mt(st.win) || q.del(ut);
              }
              if (mt(C))
                return { win: C, name: I, domain: B };
              var ft = X.getOrSet(C, function() {
                return I ? q.getOrSet(I, function() {
                  return { win: C, name: I };
                }) : { win: C };
              });
              if (ft.win && ft.win !== C)
                throw new Error("Different window already linked for window: " + (I || "undefined"));
              return I && (ft.name = I, q.set(I, ft)), B && (ft.domain = B, Ei(C)), X.set(C, ft), ft;
            }
            function So(p) {
              var C, I = p.on, B = p.send, q = p.receiveMessage;
              C = window.open, window.open = function(X, J, rt, ut) {
                var st = C.call(this, fr(X), J, rt, ut);
                return st && (ni({ win: st, name: J, domain: X ? Oe(X) : null }), st);
              }, function(X) {
                var J = X.on, rt = X.send, ut = X.receiveMessage, st = Be("popupWindowsByName");
                J("postrobot_open_tunnel", function(ft) {
                  var ht = ft.source, gt = ft.origin, bt = ft.data, Ct = Be("bridges").get(gt);
                  if (!Ct)
                    throw new Error("Can not find bridge promise for domain " + gt);
                  return Ct.then(function(Bt) {
                    if (ht !== Bt)
                      throw new Error("Message source does not matched registered bridge for domain " + gt);
                    if (!bt.name)
                      throw new Error("Register window expected to be passed window name");
                    if (!bt.sendMessage)
                      throw new Error("Register window expected to be passed sendMessage method");
                    if (!st.has(bt.name))
                      throw new Error("Window with name " + bt.name + " does not exist, or was not opened by this window");
                    var re = function() {
                      return st.get(bt.name);
                    };
                    if (!re().domain)
                      throw new Error("We do not have a registered domain for window " + bt.name);
                    if (re().domain !== gt)
                      throw new Error("Message origin " + gt + " does not matched registered window origin " + (re().domain || "unknown"));
                    return No(re().win, gt, bt.sendMessage), { sendMessage: function(Xt) {
                      if (window && !window.closed && re()) {
                        var pe = re().domain;
                        if (pe)
                          try {
                            ut({ data: Xt, origin: pe, source: re().win }, { on: J, send: rt });
                          } catch (ge) {
                            s.reject(ge);
                          }
                      }
                    } };
                  });
                });
              }({ on: I, send: B, receiveMessage: q }), function(X) {
                var J = X.send;
                hn(window).openTunnelToParent = function(rt) {
                  var ut = rt.name, st = rt.source, ft = rt.canary, ht = rt.sendMessage, gt = Be("tunnelWindows"), bt = O(window);
                  if (!bt)
                    throw new Error("No parent window found to open tunnel to");
                  var Ct = function(Bt) {
                    var re = Bt.name, Xt = Bt.source, pe = Bt.canary, ge = Bt.sendMessage;
                    (function() {
                      for (var Ue = Be("tunnelWindows"), me = 0, ve = Ue.keys(); me < ve.length; me++) {
                        var Re = ve[me];
                        mt(Ue[Re].source) && Ue.del(Re);
                      }
                    })();
                    var Ft = ct();
                    return Be("tunnelWindows").set(Ft, { name: re, source: Xt, canary: pe, sendMessage: ge }), Ft;
                  }({ name: ut, source: st, canary: ft, sendMessage: ht });
                  return J(bt, "postrobot_open_tunnel", { name: ut, sendMessage: function() {
                    var Bt = gt.get(Ct);
                    if (Bt && Bt.source && !mt(Bt.source)) {
                      try {
                        Bt.canary();
                      } catch {
                        return;
                      }
                      Bt.sendMessage.apply(this, arguments);
                    }
                  } }, { domain: "*" });
                };
              }({ send: B }), function(X) {
                var J = X.on, rt = X.send, ut = X.receiveMessage;
                s.try(function() {
                  var st, ft = M(window);
                  if (ft && ri({ win: ft }))
                    return Ei(ft), (st = ft, xr("remoteBridgeAwaiters").getOrSet(st, function() {
                      return s.try(function() {
                        var ht = Et(st, Do(T()));
                        if (ht)
                          return N(ht) && hn(Y(ht)) ? ht : new s(function(gt) {
                            var bt, Ct;
                            bt = setInterval(function() {
                              if (ht && N(ht) && hn(Y(ht)))
                                return clearInterval(bt), clearTimeout(Ct), gt(ht);
                            }, 100), Ct = setTimeout(function() {
                              return clearInterval(bt), gt();
                            }, 2e3);
                          });
                      });
                    })).then(function(ht) {
                      return ht ? window.name ? hn(Y(ht)).openTunnelToParent({ name: window.name, source: window, canary: function() {
                      }, sendMessage: function(gt) {
                        try {
                        } catch {
                          return;
                        }
                        if (window && !window.closed)
                          try {
                            ut({ data: gt, origin: this.origin, source: this.source }, { on: J, send: rt });
                          } catch (bt) {
                            s.reject(bt);
                          }
                      } }).then(function(gt) {
                        var bt = gt.source, Ct = gt.origin, Bt = gt.data;
                        if (bt !== ft)
                          throw new Error("Source does not match opener");
                        No(bt, Ct, Bt.sendMessage);
                      }).catch(function(gt) {
                        throw Fo(ft, gt), gt;
                      }) : Fo(ft, new Error("Can not register with opener: window does not have a name")) : Fo(ft, new Error("Can not register with opener: no bridge found in opener"));
                    });
                });
              }({ on: I, send: B, receiveMessage: q });
            }
            function ko() {
              for (var p = Be("idToProxyWindow"), C = 0, I = p.keys(); C < I.length; C++) {
                var B = I[C];
                p.get(B).shouldClean() && p.del(B);
              }
            }
            function Bo(p, C) {
              var I = C.send, B = C.id, q = B === void 0 ? ct() : B, X = p.then(function(rt) {
                if (N(rt))
                  return Y(rt).name;
              }), J = p.then(function(rt) {
                if (mt(rt))
                  throw new Error("Window is closed, can not determine type");
                return M(rt) ? h.POPUP : h.IFRAME;
              });
              return X.catch(Ce), J.catch(Ce), { id: q, getType: function() {
                return J;
              }, getInstanceID: ke(function() {
                return p.then(function(rt) {
                  return Vn(rt, { send: I });
                });
              }), close: function() {
                return p.then(Vr);
              }, getName: function() {
                return p.then(function(rt) {
                  if (!mt(rt))
                    return N(rt) ? Y(rt).name : X;
                });
              }, focus: function() {
                return p.then(function(rt) {
                  rt.focus();
                });
              }, isClosed: function() {
                return p.then(function(rt) {
                  return mt(rt);
                });
              }, setLocation: function(rt) {
                return p.then(function(ut) {
                  var st = window.location.protocol + "//" + window.location.host;
                  if (rt.indexOf("/") === 0)
                    rt = "" + st + rt;
                  else if (!rt.match(/^https?:\/\//) && rt.indexOf(st) !== 0)
                    throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(rt));
                  if (N(ut))
                    try {
                      if (ut.location && typeof ut.location.replace == "function")
                        return void ut.location.replace(rt);
                    } catch {
                    }
                  ut.location = rt;
                });
              }, setName: function(rt) {
                return p.then(function(ut) {
                  ni({ win: ut, name: rt });
                  var st = N(ut), ft = function(ht) {
                    if (N(ht))
                      return Y(ht).frameElement;
                    for (var gt = 0, bt = document.querySelectorAll("iframe"); gt < bt.length; gt++) {
                      var Ct = bt[gt];
                      if (Ct && Ct.contentWindow && Ct.contentWindow === ht)
                        return Ct;
                    }
                  }(ut);
                  if (!st)
                    throw new Error("Can not set name for cross-domain window: " + rt);
                  Y(ut).name = rt, ft && ft.setAttribute("name", rt), X = s.resolve(rt);
                });
              } };
            }
            var mn = function() {
              function p(I) {
                var B = I.send, q = I.win, X = I.serializedWindow;
                this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new s(), this.serializedWindow = X || Bo(this.actualWindowPromise, { send: B }), Be("idToProxyWindow").set(this.getID(), this), q && this.setWindow(q, { send: B });
              }
              var C = p.prototype;
              return C.getID = function() {
                return this.serializedWindow.id;
              }, C.getType = function() {
                return this.serializedWindow.getType();
              }, C.isPopup = function() {
                return this.getType().then(function(I) {
                  return I === h.POPUP;
                });
              }, C.setLocation = function(I) {
                var B = this;
                return this.serializedWindow.setLocation(I).then(function() {
                  return B;
                });
              }, C.getName = function() {
                return this.serializedWindow.getName();
              }, C.setName = function(I) {
                var B = this;
                return this.serializedWindow.setName(I).then(function() {
                  return B;
                });
              }, C.close = function() {
                var I = this;
                return this.serializedWindow.close().then(function() {
                  return I;
                });
              }, C.focus = function() {
                var I = this, B = this.isPopup(), q = this.getName(), X = s.hash({ isPopup: B, name: q }).then(function(rt) {
                  var ut = rt.name;
                  rt.isPopup && ut && window.open("", ut);
                }), J = this.serializedWindow.focus();
                return s.all([X, J]).then(function() {
                  return I;
                });
              }, C.isClosed = function() {
                return this.serializedWindow.isClosed();
              }, C.getWindow = function() {
                return this.actualWindow;
              }, C.setWindow = function(I, B) {
                var q = B.send;
                this.actualWindow = I, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = Bo(this.actualWindowPromise, { send: q, id: this.getID() }), xr("winToProxyWindow").set(I, this);
              }, C.awaitWindow = function() {
                return this.actualWindowPromise;
              }, C.matchWindow = function(I, B) {
                var q = this, X = B.send;
                return s.try(function() {
                  return q.actualWindow ? I === q.actualWindow : s.hash({ proxyInstanceID: q.getInstanceID(), knownWindowInstanceID: Vn(I, { send: X }) }).then(function(J) {
                    var rt = J.proxyInstanceID === J.knownWindowInstanceID;
                    return rt && q.setWindow(I, { send: X }), rt;
                  });
                });
              }, C.unwrap = function() {
                return this.actualWindow || this;
              }, C.getInstanceID = function() {
                return this.serializedWindow.getInstanceID();
              }, C.shouldClean = function() {
                return Boolean(this.actualWindow && mt(this.actualWindow));
              }, C.serialize = function() {
                return this.serializedWindow;
              }, p.unwrap = function(I) {
                return p.isProxyWindow(I) ? I.unwrap() : I;
              }, p.serialize = function(I, B) {
                var q = B.send;
                return ko(), p.toProxyWindow(I, { send: q }).serialize();
              }, p.deserialize = function(I, B) {
                var q = B.send;
                return ko(), Be("idToProxyWindow").get(I.id) || new p({ serializedWindow: I, send: q });
              }, p.isProxyWindow = function(I) {
                return Boolean(I && !ar(I) && I.isProxyWindow);
              }, p.toProxyWindow = function(I, B) {
                var q = B.send;
                if (ko(), p.isProxyWindow(I))
                  return I;
                var X = I;
                return xr("winToProxyWindow").get(X) || new p({ win: X, send: q });
              }, p;
            }();
            function Oi(p, C, I, B, q) {
              var X = xr("methodStore"), J = Be("proxyWindowMethods");
              mn.isProxyWindow(B) ? J.set(p, { val: C, name: I, domain: q, source: B }) : (J.del(p), X.getOrSet(B, function() {
                return {};
              })[p] = { domain: q, name: I, val: C, source: B });
            }
            function ha(p, C) {
              var I = xr("methodStore"), B = Be("proxyWindowMethods");
              return I.getOrSet(p, function() {
                return {};
              })[C] || B.get(C);
            }
            function Vi(p, C, I, B, q) {
              var X, J, rt;
              J = (X = { on: q.on, send: q.send }).on, rt = X.send, Be("builtinListeners").getOrSet("functionCalls", function() {
                return J("postrobot_method", { domain: "*" }, function(ft) {
                  var ht = ft.source, gt = ft.origin, bt = ft.data, Ct = bt.id, Bt = bt.name, re = ha(ht, Ct);
                  if (!re)
                    throw new Error("Could not find method '" + Bt + "' with id: " + bt.id + " in " + T(window));
                  var Xt = re.source, pe = re.domain, ge = re.val;
                  return s.try(function() {
                    if (!fe(pe, gt))
                      throw new Error("Method '" + bt.name + "' domain " + JSON.stringify(ue(re.domain) ? re.domain.source : re.domain) + " does not match origin " + gt + " in " + T(window));
                    if (mn.isProxyWindow(Xt))
                      return Xt.matchWindow(ht, { send: rt }).then(function(Ft) {
                        if (!Ft)
                          throw new Error("Method call '" + bt.name + "' failed - proxy window does not match source in " + T(window));
                      });
                  }).then(function() {
                    return ge.apply({ source: ht, origin: gt }, bt.args);
                  }, function(Ft) {
                    return s.try(function() {
                      if (ge.onError)
                        return ge.onError(Ft);
                    }).then(function() {
                      throw Ft.stack && (Ft.stack = "Remote call to " + Bt + "(" + function(Ue) {
                        return Ue === void 0 && (Ue = []), Jt(Ue).map(function(me) {
                          return typeof me == "string" ? "'" + me + "'" : me === void 0 ? "undefined" : me === null ? "null" : typeof me == "boolean" ? me.toString() : Array.isArray(me) ? "[ ... ]" : typeof me == "object" ? "{ ... }" : typeof me == "function" ? "() => { ... }" : "<" + typeof me + ">";
                        }).join(", ");
                      }(bt.args) + `) failed

` + Ft.stack), Ft;
                    });
                  }).then(function(Ft) {
                    return { result: Ft, id: Ct, name: Bt };
                  });
                });
              });
              var ut = I.__id__ || ct();
              p = mn.unwrap(p);
              var st = I.__name__ || I.name || B;
              return typeof st == "string" && typeof st.indexOf == "function" && st.indexOf("anonymous::") === 0 && (st = st.replace("anonymous::", B + "::")), mn.isProxyWindow(p) ? (Oi(ut, I, st, p, C), p.awaitWindow().then(function(ft) {
                Oi(ut, I, st, ft, C);
              })) : Oi(ut, I, st, p, C), so("cross_domain_function", { id: ut, name: st });
            }
            function ji(p, C, I, B) {
              var q, X = B.on, J = B.send;
              return function(rt, ut) {
                ut === void 0 && (ut = co);
                var st = JSON.stringify(rt, function(ft) {
                  var ht = this[ft];
                  if (Hn(this))
                    return ht;
                  var gt = ei(ht);
                  if (!gt)
                    return ht;
                  var bt = ut[gt] || Yn[gt];
                  return bt ? bt(ht, ft) : ht;
                });
                return st === void 0 ? "undefined" : st;
              }(I, ((q = {}).promise = function(rt, ut) {
                return function(st, ft, ht, gt, bt) {
                  return so("cross_domain_zalgo_promise", { then: Vi(st, ft, function(Ct, Bt) {
                    return ht.then(Ct, Bt);
                  }, gt, { on: bt.on, send: bt.send }) });
                }(p, C, rt, ut, { on: X, send: J });
              }, q.function = function(rt, ut) {
                return Vi(p, C, rt, ut, { on: X, send: J });
              }, q.object = function(rt) {
                return ar(rt) || mn.isProxyWindow(rt) ? so("cross_domain_window", mn.serialize(rt, { send: J })) : rt;
              }, q));
            }
            function Cn(p, C, I, B) {
              var q, X = B.send;
              return function(J, rt) {
                if (rt === void 0 && (rt = da), J !== "undefined")
                  return JSON.parse(J, function(ut, st) {
                    if (Hn(this))
                      return st;
                    var ft, ht;
                    if (Hn(st) ? (ft = st.__type__, ht = st.__val__) : (ft = ei(st), ht = st), !ft)
                      return ht;
                    var gt = rt[ft] || Ta[ft];
                    return gt ? gt(ht, ut) : ht;
                  });
              }(I, ((q = {}).cross_domain_zalgo_promise = function(J) {
                return function(rt, ut, st) {
                  return new s(st.then);
                }(0, 0, J);
              }, q.cross_domain_function = function(J) {
                return function(rt, ut, st, ft) {
                  var ht = st.id, gt = st.name, bt = ft.send, Ct = function(re) {
                    function Xt() {
                      var pe = arguments;
                      return mn.toProxyWindow(rt, { send: bt }).awaitWindow().then(function(ge) {
                        var Ft = ha(ge, ht);
                        if (Ft && Ft.val !== Xt)
                          return Ft.val.apply({ source: window, origin: T() }, pe);
                        var Ue = [].slice.call(pe);
                        return re.fireAndForget ? bt(ge, "postrobot_method", { id: ht, name: gt, args: Ue }, { domain: ut, fireAndForget: !0 }) : bt(ge, "postrobot_method", { id: ht, name: gt, args: Ue }, { domain: ut, fireAndForget: !1 }).then(function(me) {
                          return me.data.result;
                        });
                      }).catch(function(ge) {
                        throw ge;
                      });
                    }
                    return re === void 0 && (re = {}), Xt.__name__ = gt, Xt.__origin__ = ut, Xt.__source__ = rt, Xt.__id__ = ht, Xt.origin = ut, Xt;
                  }, Bt = Ct();
                  return Bt.fireAndForget = Ct({ fireAndForget: !0 }), Bt;
                }(p, C, J, { send: X });
              }, q.cross_domain_window = function(J) {
                return mn.deserialize(J, { send: X });
              }, q));
            }
            var gr = {};
            function oi(p, C, I, B) {
              var q = B.on, X = B.send;
              return s.try(function() {
                var J = xr().getOrSet(p, function() {
                  return {};
                });
                return J.buffer = J.buffer || [], J.buffer.push(I), J.flush = J.flush || s.flush().then(function() {
                  if (mt(p))
                    throw new Error("Window is closed");
                  var rt, ut = ji(p, C, ((rt = {}).__post_robot_10_0_42__ = J.buffer || [], rt), { on: q, send: X });
                  delete J.buffer;
                  for (var st = Object.keys(gr), ft = [], ht = 0; ht < st.length; ht++) {
                    var gt = st[ht];
                    try {
                      gr[gt](p, ut, C);
                    } catch (bt) {
                      ft.push(bt);
                    }
                  }
                  if (ft.length === st.length)
                    throw new Error(`All post-robot messaging strategies failed:

` + ft.map(function(bt, Ct) {
                      return Ct + ". " + Ge(bt);
                    }).join(`

`));
                }), J.flush.then(function() {
                  delete J.flush;
                });
              }).then(Ce);
            }
            function ma(p) {
              return Be("responseListeners").get(p);
            }
            function fo(p) {
              Be("responseListeners").del(p);
            }
            function Gn(p) {
              return Be("erroredResponseListeners").has(p);
            }
            function $i(p) {
              var C = p.name, I = p.win, B = p.domain, q = xr("requestListeners");
              if (I === "*" && (I = null), B === "*" && (B = null), !C)
                throw new Error("Name required to get request listener");
              for (var X = 0, J = [I, Mo()]; X < J.length; X++) {
                var rt = J[X];
                if (rt) {
                  var ut = q.get(rt);
                  if (ut) {
                    var st = ut[C];
                    if (st) {
                      if (B && typeof B == "string") {
                        if (st[B])
                          return st[B];
                        if (st.__domain_regex__)
                          for (var ft = 0, ht = st.__domain_regex__; ft < ht.length; ft++) {
                            var gt = ht[ft], bt = gt.listener;
                            if (fe(gt.regex, B))
                              return bt;
                          }
                      }
                      if (st["*"])
                        return st["*"];
                    }
                  }
                }
              }
            }
            function Hi(p, C, I, B) {
              var q = B.on, X = B.send, J = $i({ name: I.name, win: p, domain: C }), rt = I.name === "postrobot_method" && I.data && typeof I.data.name == "string" ? I.data.name + "()" : I.name;
              function ut(st, ft, ht) {
                return s.flush().then(function() {
                  if (!I.fireAndForget && !mt(p))
                    try {
                      return oi(p, C, { id: ct(), origin: T(window), type: "postrobot_message_response", hash: I.hash, name: I.name, ack: st, data: ft, error: ht }, { on: q, send: X });
                    } catch (gt) {
                      throw new Error("Send response message failed for " + rt + " in " + T() + `

` + Ge(gt));
                    }
                });
              }
              return s.all([s.flush().then(function() {
                if (!I.fireAndForget && !mt(p))
                  try {
                    return oi(p, C, { id: ct(), origin: T(window), type: "postrobot_message_ack", hash: I.hash, name: I.name }, { on: q, send: X });
                  } catch (st) {
                    throw new Error("Send ack message failed for " + rt + " in " + T() + `

` + Ge(st));
                  }
              }), s.try(function() {
                if (!J)
                  throw new Error("No handler found for post message: " + I.name + " from " + C + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!fe(J.domain, C))
                  throw new Error("Request origin " + C + " does not match domain " + J.domain.toString());
                return J.handler({ source: p, origin: C, data: I.data });
              }).then(function(st) {
                return ut("success", st);
              }, function(st) {
                return ut("error", null, st);
              })]).then(Ce).catch(function(st) {
                if (J && J.handleError)
                  return J.handleError(st);
                throw st;
              });
            }
            function Pi(p, C, I) {
              if (!Gn(I.hash)) {
                var B = ma(I.hash);
                if (!B)
                  throw new Error("No handler found for post message ack for message: " + I.name + " from " + C + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                try {
                  if (!fe(B.domain, C))
                    throw new Error("Ack origin " + C + " does not match domain " + B.domain.toString());
                  if (p !== B.win)
                    throw new Error("Ack source does not match registered window");
                } catch (q) {
                  B.promise.reject(q);
                }
                B.ack = !0;
              }
            }
            function Yi(p, C, I) {
              if (!Gn(I.hash)) {
                var B, q = ma(I.hash);
                if (!q)
                  throw new Error("No handler found for post message response for message: " + I.name + " from " + C + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!fe(q.domain, C))
                  throw new Error("Response origin " + C + " does not match domain " + (B = q.domain, Array.isArray(B) ? "(" + B.join(" | ") + ")" : b(B) ? "RegExp(" + B.toString() : B.toString()));
                if (p !== q.win)
                  throw new Error("Response source does not match registered window");
                fo(I.hash), I.ack === "error" ? q.promise.reject(I.error) : I.ack === "success" && q.promise.resolve({ source: p, origin: C, data: I.data });
              }
            }
            function Ci(p, C) {
              var I = C.on, B = C.send, q = Be("receivedMessages");
              try {
                if (!window || window.closed || !p.source)
                  return;
              } catch {
                return;
              }
              var X = p.source, J = p.origin, rt = function(ft, ht, gt, bt) {
                var Ct, Bt = bt.on, re = bt.send;
                try {
                  Ct = Cn(ht, gt, ft, { on: Bt, send: re });
                } catch {
                  return;
                }
                if (Ct && typeof Ct == "object" && Ct !== null) {
                  var Xt = Ct.__post_robot_10_0_42__;
                  if (Array.isArray(Xt))
                    return Xt;
                }
              }(p.data, X, J, { on: I, send: B });
              if (rt) {
                ao(X);
                for (var ut = 0; ut < rt.length; ut++) {
                  var st = rt[ut];
                  if (q.has(st.id) || (q.set(st.id, !0), mt(X) && !st.fireAndForget))
                    return;
                  st.origin.indexOf("file:") === 0 && (J = "file://");
                  try {
                    st.type === "postrobot_message_request" ? Hi(X, J, st, { on: I, send: B }) : st.type === "postrobot_message_response" ? Yi(X, J, st) : st.type === "postrobot_message_ack" && Pi(X, J, st);
                  } catch (ft) {
                    setTimeout(function() {
                      throw ft;
                    }, 0);
                  }
                }
              }
            }
            function Rn(p, C, I) {
              if (!p)
                throw new Error("Expected name");
              if (typeof (C = C || {}) == "function" && (I = C, C = {}), !I)
                throw new Error("Expected handler");
              (C = C || {}).name = p, C.handler = I || C.handler;
              var B = C.window, q = C.domain, X = function J(rt, ut) {
                var st = rt.name, ft = rt.win, ht = rt.domain, gt = xr("requestListeners");
                if (!st || typeof st != "string")
                  throw new Error("Name required to add request listener");
                if (Array.isArray(ft)) {
                  for (var bt = [], Ct = 0, Bt = ft; Ct < Bt.length; Ct++)
                    bt.push(J({ name: st, domain: ht, win: Bt[Ct] }, ut));
                  return { cancel: function() {
                    for (var pr = 0; pr < bt.length; pr++)
                      bt[pr].cancel();
                  } };
                }
                if (Array.isArray(ht)) {
                  for (var re = [], Xt = 0, pe = ht; Xt < pe.length; Xt++)
                    re.push(J({ name: st, win: ft, domain: pe[Xt] }, ut));
                  return { cancel: function() {
                    for (var pr = 0; pr < re.length; pr++)
                      re[pr].cancel();
                  } };
                }
                var ge = $i({ name: st, win: ft, domain: ht });
                if (ft && ft !== "*" || (ft = Mo()), ht = ht || "*", ge)
                  throw ft && ht ? new Error("Request listener already exists for " + st + " on domain " + ht.toString() + " for " + (ft === Mo() ? "wildcard" : "specified") + " window") : ft ? new Error("Request listener already exists for " + st + " for " + (ft === Mo() ? "wildcard" : "specified") + " window") : ht ? new Error("Request listener already exists for " + st + " on domain " + ht.toString()) : new Error("Request listener already exists for " + st);
                var Ft, Ue, me = gt.getOrSet(ft, function() {
                  return {};
                }), ve = de(me, st, function() {
                  return {};
                }), Re = ht.toString();
                return ue(ht) ? (Ft = de(ve, "__domain_regex__", function() {
                  return [];
                })).push(Ue = { regex: ht, listener: ut }) : ve[Re] = ut, { cancel: function() {
                  delete ve[Re], Ue && (Ft.splice(Ft.indexOf(Ue, 1)), Ft.length || delete ve.__domain_regex__), Object.keys(ve).length || delete me[st], ft && !Object.keys(me).length && gt.del(ft);
                } };
              }({ name: p, win: B, domain: q }, { handler: C.handler, handleError: C.errorHandler || function(J) {
                throw J;
              }, window: B, domain: q || "*", name: p });
              return { cancel: function() {
                X.cancel();
              } };
            }
            gr.postrobot_post_message = function(p, C, I) {
              I.indexOf("file:") === 0 && (I = "*"), p.postMessage(C, I);
            }, gr.postrobot_bridge = function(p, C, I) {
              if (!zo() && !pa())
                throw new Error("Bridge not needed for browser");
              if (N(p))
                throw new Error("Post message through bridge disabled between same domain windows");
              if (ye(window, p) !== !1)
                throw new Error("Can only use bridge to communicate between two different windows, not between frames");
              (function(B, q, X) {
                var J = Mt(window, B), rt = Mt(B, window);
                if (!J && !rt)
                  throw new Error("Can only send messages to and from parent and popup windows");
                qi(B).then(function(ut) {
                  return ut(B, q, X);
                });
              })(p, I, C);
            }, gr.postrobot_global = function(p, C) {
              if (!pt(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i))
                throw new Error("Global messaging not needed for browser");
              if (!N(p))
                throw new Error("Post message through global disabled between different domain windows");
              if (ye(window, p) !== !1)
                throw new Error("Can only use global to communicate between two different windows, not between frames");
              var I = hn(p);
              if (!I)
                throw new Error("Can not find postRobot global on foreign window");
              I.receiveMessage({ source: window, origin: T(), data: C });
            };
            var vn, gn = function p(C, I, B, q) {
              var X = (q = q || {}).domain || "*", J = q.timeout || -1, rt = q.timeout || 5e3, ut = q.fireAndForget || !1;
              return s.try(function() {
                if (function(st, ft, ht) {
                  if (!st)
                    throw new Error("Expected name");
                  if (ht && typeof ht != "string" && !Array.isArray(ht) && !ue(ht))
                    throw new TypeError("Can not send " + st + ". Expected domain " + JSON.stringify(ht) + " to be a string, array, or regex");
                  if (mt(ft))
                    throw new Error("Can not send " + st + ". Target window is closed");
                }(I, C, X), function(st, ft) {
                  var ht = xt(ft);
                  if (ht)
                    return ht === st;
                  if (ft === st || wt(ft) === ft)
                    return !1;
                  for (var gt = 0, bt = at(st); gt < bt.length; gt++)
                    if (bt[gt] === ft)
                      return !0;
                  return !1;
                }(window, C))
                  return xo(C, rt);
              }).then(function(st) {
                return function(ft, ht, gt, bt) {
                  var Ct = bt.send;
                  return s.try(function() {
                    return typeof ht == "string" ? ht : s.try(function() {
                      return gt || ti(ft, { send: Ct }).then(function(Bt) {
                        return Bt.domain;
                      });
                    }).then(function(Bt) {
                      if (!fe(ht, ht))
                        throw new Error("Domain " + Jr(ht) + " does not match " + Jr(ht));
                      return Bt;
                    });
                  });
                }(C, X, (st === void 0 ? {} : st).domain, { send: p });
              }).then(function(st) {
                var ft = st, ht = I === "postrobot_method" && B && typeof B.name == "string" ? B.name + "()" : I, gt = new s(), bt = I + "_" + ct();
                if (!ut) {
                  var Ct = { name: I, win: C, domain: ft, promise: gt };
                  (function(Ue, me) {
                    Be("responseListeners").set(Ue, me);
                  })(bt, Ct);
                  var Bt = xr("requestPromises").getOrSet(C, function() {
                    return [];
                  });
                  Bt.push(gt), gt.catch(function() {
                    (function(Ue) {
                      Be("erroredResponseListeners").set(Ue, !0);
                    })(bt), fo(bt);
                  });
                  var re = function(Ue) {
                    return xr("knownWindows").get(Ue, !1);
                  }(C) ? 1e4 : 2e3, Xt = J, pe = re, ge = Xt, Ft = Ut(function() {
                    return mt(C) ? gt.reject(new Error("Window closed for " + I + " before " + (Ct.ack ? "response" : "ack"))) : Ct.cancelled ? gt.reject(new Error("Response listener was cancelled for " + I)) : (pe = Math.max(pe - 500, 0), ge !== -1 && (ge = Math.max(ge - 500, 0)), Ct.ack || pe !== 0 ? ge === 0 ? gt.reject(new Error("No response for postMessage " + ht + " in " + T() + " in " + Xt + "ms")) : void 0 : gt.reject(new Error("No ack for postMessage " + ht + " in " + T() + " in " + re + "ms")));
                  }, 500);
                  gt.finally(function() {
                    Ft.cancel(), Bt.splice(Bt.indexOf(gt, 1));
                  }).catch(Ce);
                }
                return oi(C, ft, { id: ct(), origin: T(window), type: "postrobot_message_request", hash: bt, name: I, data: B, fireAndForget: ut }, { on: Rn, send: p }).then(function() {
                  return ut ? gt.resolve() : gt;
                }, function(Ue) {
                  throw new Error("Send request message failed for " + ht + " in " + T() + `

` + Ge(Ue));
                });
              });
            };
            function Gi(p, C, I) {
              return ji(p, C, I, { on: Rn, send: gn });
            }
            function va(p, C, I) {
              return Cn(p, C, I, { on: Rn, send: gn });
            }
            function Ri(p) {
              return mn.toProxyWindow(p, { send: gn });
            }
            function ii(p) {
              for (var C = 0, I = xr("requestPromises").get(p, []); C < I.length; C++)
                I[C].reject(new Error("Window " + (mt(p) ? "closed" : "cleaned up") + " before response")).catch(Ce);
            }
            function Uo(p) {
              if (p === void 0 && (p = window), !N(p))
                throw new Error("Can not get global for window on different domain");
              return p.__zoid_9_0_63__ || (p.__zoid_9_0_63__ = {}), p.__zoid_9_0_63__;
            }
            function Ii(p) {
              return { get: function() {
                var C = this;
                return s.try(function() {
                  if (C.source && C.source !== window)
                    throw new Error("Can not call get on proxy object from a remote window");
                  return p;
                });
              } };
            }
            vn = { setupBridge: So, openBridge: function(p, C) {
              var I = Be("bridges"), B = Be("bridgeFrames");
              return C = C || Oe(p), I.getOrSet(C, function() {
                return s.try(function() {
                  if (T() === C)
                    throw new Error("Can not open bridge on the same domain as current domain: " + C);
                  var q = Do(C);
                  if (Et(window, q))
                    throw new Error("Frame with name " + q + " already exists on page");
                  var X = function(J, rt) {
                    var ut = document.createElement("iframe");
                    return ut.setAttribute("name", J), ut.setAttribute("id", J), ut.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), ut.setAttribute("frameborder", "0"), ut.setAttribute("border", "0"), ut.setAttribute("scrolling", "no"), ut.setAttribute("allowTransparency", "true"), ut.setAttribute("tabindex", "-1"), ut.setAttribute("hidden", "true"), ut.setAttribute("title", ""), ut.setAttribute("role", "presentation"), ut.src = rt, ut;
                  }(q, p);
                  return B.set(C, X), Lo.then(function(J) {
                    J.appendChild(X);
                    var rt = X.contentWindow;
                    return new s(function(ut, st) {
                      X.addEventListener("load", ut), X.addEventListener("error", st);
                    }).then(function() {
                      return xo(rt, 5e3, "Bridge " + p);
                    }).then(function() {
                      return rt;
                    });
                  });
                });
              });
            }, linkWindow: ni, linkUrl: function(p, C) {
              ni({ win: p, domain: Oe(C) });
            }, isBridge: pa, needsBridge: ri, needsBridgeForBrowser: zo, hasBridge: function(p, C) {
              return Be("bridges").has(C || Oe(p));
            }, needsBridgeForWin: uo, needsBridgeForDomain: lo, destroyBridges: function() {
              for (var p = Be("bridges"), C = Be("bridgeFrames"), I = 0, B = C.keys(); I < B.length; I++) {
                var q = C.get(B[I]);
                q && q.parentNode && q.parentNode.removeChild(q);
              }
              C.reset(), p.reset();
            } };
            var ga = { STRING: "string", OBJECT: "object", FUNCTION: "function", BOOLEAN: "boolean", NUMBER: "number", ARRAY: "array" }, Ao = { JSON: "json", DOTIFY: "dotify", BASE64: "base64" }, Ir = h, yr = { RENDER: "zoid-render", RENDERED: "zoid-rendered", DISPLAY: "zoid-display", ERROR: "zoid-error", CLOSE: "zoid-close", DESTROY: "zoid-destroy", PROPS: "zoid-props", RESIZE: "zoid-resize", FOCUS: "zoid-focus" };
            function ya(p, C, I, B, q) {
              if (!p.hasOwnProperty(I))
                return B;
              var X = p[I];
              return typeof X.childDecorate == "function" ? X.childDecorate({ value: B, uid: q.uid, close: q.close, focus: q.focus, onError: q.onError, onProps: q.onProps, resize: q.resize, getParent: q.getParent, getParentDomain: q.getParentDomain, show: q.show, hide: q.hide }) : B;
            }
            function ai(p) {
              return ur(ai, function() {
                if (!p)
                  throw new Error("No window name");
                var C = p.split("__"), I = C[1], B = C[2], q = C[3];
                if (I !== "zoid")
                  throw new Error("Window not rendered by zoid - got " + I);
                if (!B)
                  throw new Error("Expected component name");
                if (!q)
                  throw new Error("Expected encoded payload");
                try {
                  return JSON.parse(function(X) {
                    if (typeof atob == "function")
                      return decodeURIComponent([].map.call(atob(X), function(J) {
                        return "%" + ("00" + J.charCodeAt(0).toString(16)).slice(-2);
                      }).join(""));
                    if (typeof j < "u")
                      return j.from(X, "base64").toString("utf8");
                    throw new Error("Can not find window.atob or Buffer");
                  }(q));
                } catch (X) {
                  throw new Error("Can not decode window name payload: " + q + ": " + Ge(X));
                }
              }, [p]);
            }
            function Wo() {
              try {
                return ai(window.name);
              } catch {
              }
            }
            function Ki() {
              return s.try(function() {
                window.focus();
              });
            }
            function Ji() {
              return s.try(function() {
                window.close();
              });
            }
            function Zi(p, C, I) {
              return s.try(function() {
                return typeof p.queryParam == "function" ? p.queryParam({ value: I }) : typeof p.queryParam == "string" ? p.queryParam : C;
              });
            }
            function ba(p, C, I) {
              return s.try(function() {
                return typeof p.queryValue == "function" && Vt(I) ? p.queryValue({ value: I }) : I;
              });
            }
            function Eo(p, C, I) {
              C === void 0 && (C = {}), I === void 0 && (I = window);
              var B, q, X, J, rt, ut = p.propsDef, st = p.containerTemplate, ft = p.prerenderTemplate, ht = p.tag, gt = p.name, bt = p.attributes, Ct = p.dimensions, Bt = p.autoResize, re = p.url, Xt = p.domain, pe = new s(), ge = [], Ft = Ke(), Ue = {}, me = { visible: !0 }, ve = C.event ? C.event : (B = {}, q = {}, { on: function(Tt, qt) {
                var Gt = q[Tt] = q[Tt] || [];
                Gt.push(qt);
                var ee = !1;
                return { cancel: function() {
                  ee || (ee = !0, Gt.splice(Gt.indexOf(qt), 1));
                } };
              }, once: function(Tt, qt) {
                var Gt = this.on(Tt, function() {
                  Gt.cancel(), qt();
                });
                return Gt;
              }, trigger: function(Tt) {
                for (var qt = arguments.length, Gt = new Array(qt > 1 ? qt - 1 : 0), ee = 1; ee < qt; ee++)
                  Gt[ee - 1] = arguments[ee];
                var ae = q[Tt], ze = [];
                if (ae)
                  for (var Ze = function(hr) {
                    var $e = ae[hr];
                    ze.push(s.try(function() {
                      return $e.apply(void 0, Gt);
                    }));
                  }, rr = 0; rr < ae.length; rr++)
                    Ze(rr);
                return s.all(ze).then(Ce);
              }, triggerOnce: function(Tt) {
                if (B[Tt])
                  return s.resolve();
                B[Tt] = !0;
                for (var qt = arguments.length, Gt = new Array(qt > 1 ? qt - 1 : 0), ee = 1; ee < qt; ee++)
                  Gt[ee - 1] = arguments[ee];
                return this.trigger.apply(this, [Tt].concat(Gt));
              }, reset: function() {
                q = {};
              } }), Re = C.props ? C.props : {}, pr = C.onError, Dr = C.getProxyContainer, Je = C.show, Jn = C.hide, ho = C.close, mo = C.renderContainer, Zn = C.getProxyWindow, In = C.setProxyWin, Oo = C.openFrame, vo = C.openPrerenderFrame, Xn = C.prerender, go = C.open, Tn = C.openPrerender, Me = C.watchForUnload, Ae = C.getInternalState, Ar = C.setInternalState, Lr = function(Tt) {
                for (var qt = {}, Gt = 0, ee = Object.keys(Re); Gt < ee.length; Gt++) {
                  var ae = ee[Gt], ze = ut[ae];
                  ze && ze.sendToChild === !1 || ze && ze.sameDomain && !fe(Tt, T(window)) || (qt[ae] = Re[ae]);
                }
                return s.hash(qt);
              }, Er = function() {
                return s.try(function() {
                  return Ae ? Ae() : me;
                });
              }, Nr = function(Tt) {
                return s.try(function() {
                  return Ar ? Ar(Tt) : me = u({}, me, Tt);
                });
              }, Ee = function() {
                return Zn ? Zn() : s.try(function() {
                  var Tt = Re.window;
                  if (Tt) {
                    var qt = Ri(Tt);
                    return Ft.register(function() {
                      return Tt.close();
                    }), qt;
                  }
                  return new mn({ send: gn });
                });
              }, Sr = function(Tt) {
                return Dr ? Dr(Tt) : s.try(function() {
                  return xi(Tt);
                }).then(function(qt) {
                  return Xo(qt) && (qt = function(Gt) {
                    var ee = function(rr) {
                      var hr = function($e) {
                        for (; $e.parentNode; )
                          $e = $e.parentNode;
                        if (Xo($e))
                          return $e;
                      }(rr);
                      if (hr.host)
                        return hr.host;
                    }(Gt);
                    if (!ee)
                      throw new Error("Element is not in shadow dom");
                    if (Xo(ee))
                      throw new Error("Host element is also in shadow dom");
                    var ae = "shadow-slot-" + ct(), ze = document.createElement("slot");
                    ze.setAttribute("name", ae), Gt.appendChild(ze);
                    var Ze = document.createElement("div");
                    return Ze.setAttribute("slot", ae), ee.appendChild(Ze), Ze;
                  }(qt)), Ii(qt);
                });
              }, En = function(Tt) {
                return In ? In(Tt) : s.try(function() {
                  X = Tt;
                });
              }, Gr = function() {
                return Je ? Je() : s.hash({ setState: Nr({ visible: !0 }), showElement: J ? J.get().then(Ia) : null }).then(Ce);
              }, bn = function() {
                return Jn ? Jn() : s.hash({ setState: Nr({ visible: !1 }), showElement: J ? J.get().then(Fi) : null }).then(Ce);
              }, an = function() {
                return typeof re == "function" ? re({ props: Re }) : re;
              }, dn = function() {
                return typeof bt == "function" ? bt({ props: Re }) : bt;
              }, yo = function() {
                return Xt && typeof Xt == "string" ? Xt : Oe(an());
              }, jo = function() {
                return Xt && ue(Xt) ? Xt : yo();
              }, Qn = function(Tt, qt) {
                var Gt = qt.windowName;
                return Oo ? Oo(Tt, { windowName: Gt }) : s.try(function() {
                  if (Tt === Ir.IFRAME)
                    return Ii(fa({ attributes: u({ name: Gt, title: gt }, dn().iframe) }));
                });
              }, si = function(Tt) {
                return vo ? vo(Tt) : s.try(function() {
                  if (Tt === Ir.IFRAME)
                    return Ii(fa({ attributes: u({ name: "__zoid_prerender_frame__" + gt + "_" + ct() + "__", title: "prerender__" + gt }, dn().iframe) }));
                });
              }, Vo = function(Tt, qt, Gt) {
                return Tn ? Tn(Tt, qt, Gt) : s.try(function() {
                  if (Tt === Ir.IFRAME) {
                    if (!Gt)
                      throw new Error("Expected proxy frame to be passed");
                    return Gt.get().then(function(ee) {
                      return Ft.register(function() {
                        return Zo(ee);
                      }), Sn(ee).then(function(ae) {
                        return Y(ae);
                      }).then(function(ae) {
                        return Ri(ae);
                      });
                    });
                  }
                  if (Tt === Ir.POPUP)
                    return qt;
                  throw new Error("No render context available for " + Tt);
                });
              }, Ho = function() {
                return s.try(function() {
                  if (X)
                    return s.all([ve.trigger(yr.FOCUS), X.focus()]).then(Ce);
                });
              }, Yo = function(Tt, qt, Gt, ee) {
                if (qt === T(window)) {
                  var ae = Uo(window);
                  return ae.windows = ae.windows || {}, ae.windows[Gt] = window, Ft.register(function() {
                    delete ae.windows[Gt];
                  }), { type: "global", uid: Gt };
                }
                return ee === Ir.POPUP ? { type: "opener" } : { type: "parent", distance: ce(window) };
              }, xa = function(Tt) {
                return s.try(function() {
                  rt = Tt, pe.resolve(), Ft.register(function() {
                    return Tt.close.fireAndForget().catch(Ce);
                  });
                });
              }, ea = function(Tt) {
                var qt = Tt.width, Gt = Tt.height;
                return s.try(function() {
                  ve.trigger(yr.RESIZE, { width: qt, height: Gt });
                });
              }, ci = function(Tt) {
                return s.try(function() {
                  return ve.trigger(yr.DESTROY);
                }).catch(Ce).then(function() {
                  return Ft.all(Tt);
                }).then(function() {
                  pe.asyncReject(Tt || new Error("Component destroyed"));
                });
              }, Mn = we(function(Tt) {
                return s.try(function() {
                  return ho ? mt(ho.__source__) ? void 0 : ho() : s.try(function() {
                    return ve.trigger(yr.CLOSE);
                  }).then(function() {
                    return ci(Tt || new Error("Component closed"));
                  });
                });
              }), Mi = function(Tt, qt) {
                var Gt = qt.proxyWin, ee = qt.proxyFrame, ae = qt.windowName;
                return go ? go(Tt, { proxyWin: Gt, proxyFrame: ee, windowName: ae }) : s.try(function() {
                  if (Tt === Ir.IFRAME) {
                    if (!ee)
                      throw new Error("Expected proxy frame to be passed");
                    return ee.get().then(function(hr) {
                      return Sn(hr).then(function($e) {
                        return Ft.register(function() {
                          return Zo(hr);
                        }), Ft.register(function() {
                          return ii($e);
                        }), $e;
                      });
                    });
                  }
                  if (Tt === Ir.POPUP) {
                    var ze = Ct.width, Ze = Ct.height;
                    ze = qn(ze, window.outerWidth), Ze = qn(Ze, window.outerWidth);
                    var rr = function(hr, $e) {
                      var Zr = ($e = $e || {}).width, Or = $e.height, Fr = 0, Br = 0;
                      Zr && (window.outerWidth ? Br = Math.round((window.outerWidth - Zr) / 2) + window.screenX : window.screen.width && (Br = Math.round((window.screen.width - Zr) / 2))), Or && (window.outerHeight ? Fr = Math.round((window.outerHeight - Or) / 2) + window.screenY : window.screen.height && (Fr = Math.round((window.screen.height - Or) / 2))), Zr && Or && ($e = u({ top: Fr, left: Br, width: Zr, height: Or, status: 1, toolbar: 0, menubar: 0, resizable: 1, scrollbars: 1 }, $e));
                      var lr = $e.name || "";
                      delete $e.name;
                      var jr, sn = Object.keys($e).map(function(nr) {
                        if ($e[nr] != null)
                          return nr + "=" + Jr($e[nr]);
                      }).filter(Boolean).join(",");
                      try {
                        jr = window.open("", lr, sn, !0);
                      } catch (nr) {
                        throw new Hr("Can not open popup window - " + (nr.stack || nr.message));
                      }
                      if (mt(jr))
                        throw new Hr("Can not open popup window - blocked");
                      return window.addEventListener("unload", function() {
                        return jr.close();
                      }), jr;
                    }(0, u({ name: ae, width: ze, height: Ze }, dn().popup));
                    return Ft.register(function() {
                      return Vr(rr);
                    }), Ft.register(function() {
                      return ii(rr);
                    }), rr;
                  }
                  throw new Error("No render context available for " + Tt);
                }).then(function(ze) {
                  return Gt.setWindow(ze, { send: gn }), Gt;
                });
              }, ra = function() {
                return s.try(function() {
                  var Tt = $n(window, "unload", kr(function() {
                    ci(new Error("Window navigated away"));
                  })), qt = be(I, ci, 3e3);
                  if (Ft.register(qt.cancel), Ft.register(Tt.cancel), Me)
                    return Me();
                });
              }, ui = function(Tt) {
                var qt = !1;
                return Tt.isClosed().then(function(Gt) {
                  return Gt ? (qt = !0, Mn(new Error("Detected component window close"))) : s.delay(200).then(function() {
                    return Tt.isClosed();
                  }).then(function(ee) {
                    if (ee)
                      return qt = !0, Mn(new Error("Detected component window close"));
                  });
                }).then(function() {
                  return qt;
                });
              }, li = function(Tt) {
                return pr ? pr(Tt) : s.try(function() {
                  if (ge.indexOf(Tt) === -1)
                    return ge.push(Tt), pe.asyncReject(Tt), ve.trigger(yr.ERROR, Tt);
                });
              };
              xa.onError = li;
              var na = function(Tt, qt) {
                return Tt({ container: qt.container, context: qt.context, uid: qt.uid, doc: qt.doc, frame: qt.frame, prerenderFrame: qt.prerenderFrame, focus: Ho, close: Mn, state: Ue, props: Re, tag: ht, dimensions: Ct, event: ve });
              }, Sa = function(Tt, qt) {
                var Gt = qt.context, ee = qt.uid;
                return Xn ? Xn(Tt, { context: Gt, uid: ee }) : s.try(function() {
                  if (ft) {
                    var ae = Tt.getWindow();
                    if (ae && N(ae) && function(lr) {
                      try {
                        if (!lr.location.href || lr.location.href === "about:blank")
                          return !0;
                      } catch {
                      }
                      return !1;
                    }(ae)) {
                      var ze = (ae = Y(ae)).document, Ze = na(ft, { context: Gt, uid: ee, doc: ze });
                      if (Ze) {
                        if (Ze.ownerDocument !== ze)
                          throw new Error("Expected prerender template to have been created with document from child window");
                        (function(lr, jr) {
                          var sn = jr.tagName.toLowerCase();
                          if (sn !== "html")
                            throw new Error("Expected element to be html, got " + sn);
                          for (var nr = lr.document.documentElement, cn = 0, Xr = Jt(nr.children); cn < Xr.length; cn++)
                            nr.removeChild(Xr[cn]);
                          for (var br = 0, Ur = Jt(jr.children); br < Ur.length; br++)
                            nr.appendChild(Ur[br]);
                        })(ae, Ze);
                        var rr = Bt.width, hr = rr !== void 0 && rr, $e = Bt.height, Zr = $e !== void 0 && $e, Or = Bt.element, Fr = Or === void 0 ? "body" : Or;
                        if ((Fr = Io(Fr, ze)) && (hr || Zr)) {
                          var Br = io(Fr, function(lr) {
                            ea({ width: hr ? lr.width : void 0, height: Zr ? lr.height : void 0 });
                          }, { width: hr, height: Zr, win: ae });
                          ve.on(yr.RENDERED, Br.cancel);
                        }
                      }
                    }
                  }
                });
              }, zi = function(Tt, qt) {
                var Gt = qt.proxyFrame, ee = qt.proxyPrerenderFrame, ae = qt.context, ze = qt.uid;
                return mo ? mo(Tt, { proxyFrame: Gt, proxyPrerenderFrame: ee, context: ae, uid: ze }) : s.hash({ container: Tt.get(), frame: Gt ? Gt.get() : null, prerenderFrame: ee ? ee.get() : null, internalState: Er() }).then(function(Ze) {
                  var rr = Ze.container, hr = Ze.internalState.visible, $e = na(st, { context: ae, uid: ze, container: rr, frame: Ze.frame, prerenderFrame: Ze.prerenderFrame, doc: document });
                  if ($e) {
                    hr || Fi($e), _o(rr, $e);
                    var Zr = function(Or, Fr) {
                      Fr = kr(Fr);
                      var Br, lr, jr, sn = !1, nr = [], cn = function() {
                        sn = !0;
                        for (var pn = 0; pn < nr.length; pn++)
                          nr[pn].disconnect();
                        Br && Br.cancel(), jr && jr.removeEventListener("unload", Xr), lr && Zo(lr);
                      }, Xr = function() {
                        sn || (Fr(), cn());
                      };
                      if (Bi(Or))
                        return Xr(), { cancel: cn };
                      if (window.MutationObserver)
                        for (var br = Or.parentElement; br; ) {
                          var Ur = new window.MutationObserver(function() {
                            Bi(Or) && Xr();
                          });
                          Ur.observe(br, { childList: !0 }), nr.push(Ur), br = br.parentElement;
                        }
                      return (lr = document.createElement("iframe")).setAttribute("name", "__detect_close_" + ct() + "__"), lr.style.display = "none", Sn(lr).then(function(pn) {
                        (jr = Y(pn)).addEventListener("unload", Xr);
                      }), Or.appendChild(lr), Br = Ut(function() {
                        Bi(Or) && Xr();
                      }, 1e3), { cancel: cn };
                    }($e, function() {
                      return Mn(new Error("Detected container element removed from DOM"));
                    });
                    return Ft.register(function() {
                      return Zr.cancel();
                    }), Ft.register(function() {
                      return Zo($e);
                    }), J = Ii($e);
                  }
                });
              }, Di = function() {
                return { state: Ue, event: ve, close: Mn, focus: Ho, resize: ea, onError: li, updateProps: Na, show: Gr, hide: bn };
              }, ka = function(Tt, qt) {
                qt === void 0 && (qt = !1);
                var Gt = Di();
                (function(ee, ae, ze, Ze, rr) {
                  rr === void 0 && (rr = !1), dr(ae, ze = ze || {});
                  for (var hr = rr ? [] : [].concat(Object.keys(ee)), $e = 0, Zr = Object.keys(ze); $e < Zr.length; $e++) {
                    var Or = Zr[$e];
                    hr.indexOf(Or) === -1 && hr.push(Or);
                  }
                  for (var Fr = [], Br = Ze.state, lr = Ze.close, jr = Ze.focus, sn = Ze.event, nr = Ze.onError, cn = 0; cn < hr.length; cn++) {
                    var Xr = hr[cn], br = ee[Xr], Ur = ze[Xr];
                    if (br) {
                      var pn = br.alias;
                      if (pn && (!Vt(Ur) && Vt(ze[pn]) && (Ur = ze[pn]), Fr.push(pn)), br.value && (Ur = br.value({ props: ae, state: Br, close: lr, focus: jr, event: sn, onError: nr })), !Vt(Ur) && br.default && (Ur = br.default({ props: ae, state: Br, close: lr, focus: jr, event: sn, onError: nr })), Vt(Ur) && (br.type === "array" ? !Array.isArray(Ur) : typeof Ur !== br.type))
                        throw new TypeError("Prop is not of type " + br.type + ": " + Xr);
                      ae[Xr] = Ur;
                    }
                  }
                  for (var fi = 0; fi < Fr.length; fi++)
                    delete ae[Fr[fi]];
                  for (var zn = 0, Dn = Object.keys(ae); zn < Dn.length; zn++) {
                    var to = Dn[zn], On = ee[to], he = ae[to];
                    On && Vt(he) && On.decorate && (ae[to] = On.decorate({ value: he, props: ae, state: Br, close: lr, focus: jr, event: sn, onError: nr }));
                  }
                  for (var er = 0, Xe = Object.keys(ee); er < Xe.length; er++) {
                    var qe = Xe[er];
                    if (ee[qe].required !== !1 && !Vt(ae[qe]))
                      throw new Error('Expected prop "' + qe + '" to be defined');
                  }
                })(ut, Re, Tt, Gt, qt);
              }, Na = function(Tt) {
                return ka(Tt, !0), pe.then(function() {
                  var qt = rt, Gt = X;
                  if (qt && Gt)
                    return Lr(jo()).then(function(ee) {
                      return qt.updateProps(ee).catch(function(ae) {
                        return ui(Gt).then(function(ze) {
                          if (!ze)
                            throw ae;
                        });
                      });
                    });
                });
              };
              return { init: function() {
                (function() {
                  ve.on(yr.RENDER, function() {
                    return Re.onRender();
                  }), ve.on(yr.DISPLAY, function() {
                    return Re.onDisplay();
                  }), ve.on(yr.RENDERED, function() {
                    return Re.onRendered();
                  }), ve.on(yr.CLOSE, function() {
                    return Re.onClose();
                  }), ve.on(yr.DESTROY, function() {
                    return Re.onDestroy();
                  }), ve.on(yr.RESIZE, function() {
                    return Re.onResize();
                  }), ve.on(yr.FOCUS, function() {
                    return Re.onFocus();
                  }), ve.on(yr.PROPS, function(Tt) {
                    return Re.onProps(Tt);
                  }), ve.on(yr.ERROR, function(Tt) {
                    return Re && Re.onError ? Re.onError(Tt) : pe.reject(Tt).then(function() {
                      setTimeout(function() {
                        throw Tt;
                      }, 1);
                    });
                  }), Ft.register(ve.reset);
                })();
              }, render: function(Tt, qt, Gt) {
                return s.try(function() {
                  var ee = "zoid-" + ht + "-" + ct(), ae = jo(), ze = yo();
                  (function(he, er, Xe) {
                    if (he !== window) {
                      if (!ye(window, he))
                        throw new Error("Can only renderTo an adjacent frame");
                      var qe = T();
                      if (!fe(er, qe) && !N(he))
                        throw new Error("Can not render remotely to " + er.toString() + " - can only render to " + qe);
                      if (Xe && typeof Xe != "string")
                        throw new Error("Container passed to renderTo must be a string selector, got " + typeof Xe + " }");
                    }
                  })(Tt, ae, qt);
                  var Ze = s.try(function() {
                    if (Tt !== window)
                      return function(he, er) {
                        for (var Xe = {}, qe = 0, wr = Object.keys(Re); qe < wr.length; qe++) {
                          var or = wr[qe], Qr = ut[or];
                          Qr && Qr.allowDelegate && (Xe[or] = Re[or]);
                        }
                        var mr = gn(er, "zoid_delegate_" + gt, { overrides: { props: Xe, event: ve, close: Mn, onError: li, getInternalState: Er, setInternalState: Nr } }).then(function(Qt) {
                          var se = Qt.data.parent;
                          return Ft.register(function(zt) {
                            if (!mt(er))
                              return se.destroy(zt);
                          }), se.getDelegateOverrides();
                        }).catch(function(Qt) {
                          throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + Ge(Qt));
                        });
                        return Dr = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.getProxyContainer.apply(_e, se);
                          });
                        }, mo = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.renderContainer.apply(_e, se);
                          });
                        }, Je = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.show.apply(_e, se);
                          });
                        }, Jn = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.hide.apply(_e, se);
                          });
                        }, Me = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.watchForUnload.apply(_e, se);
                          });
                        }, he === Ir.IFRAME ? (Zn = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.getProxyWindow.apply(_e, se);
                          });
                        }, Oo = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.openFrame.apply(_e, se);
                          });
                        }, vo = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.openPrerenderFrame.apply(_e, se);
                          });
                        }, Xn = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.prerender.apply(_e, se);
                          });
                        }, go = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.open.apply(_e, se);
                          });
                        }, Tn = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.openPrerender.apply(_e, se);
                          });
                        }) : he === Ir.POPUP && (In = function() {
                          for (var Qt = arguments.length, se = new Array(Qt), zt = 0; zt < Qt; zt++)
                            se[zt] = arguments[zt];
                          return mr.then(function(_e) {
                            return _e.setProxyWin.apply(_e, se);
                          });
                        }), mr;
                      }(Gt, Tt);
                  }), rr = Re.window, hr = ra(), $e = function(he, er) {
                    var Xe = {}, qe = Object.keys(er);
                    return s.all(qe.map(function(wr) {
                      var or = he[wr];
                      if (or)
                        return s.resolve().then(function() {
                          var Qr = er[wr];
                          if (Qr && or.queryParam)
                            return Qr;
                        }).then(function(Qr) {
                          if (Qr != null)
                            return s.all([Zi(or, wr, Qr), ba(or, 0, Qr)]).then(function(mr) {
                              var Qt, se = mr[0], zt = mr[1];
                              if (typeof zt == "boolean")
                                Qt = zt.toString();
                              else if (typeof zt == "string")
                                Qt = zt.toString();
                              else if (typeof zt == "object" && zt !== null) {
                                if (or.serialization === Ao.JSON)
                                  Qt = JSON.stringify(zt);
                                else if (or.serialization === Ao.BASE64)
                                  Qt = btoa(JSON.stringify(zt));
                                else if (or.serialization === Ao.DOTIFY || !or.serialization) {
                                  Qt = function pi(Wr, _r, un) {
                                    for (var Tr in _r === void 0 && (_r = ""), un === void 0 && (un = {}), _r = _r && _r + ".", Wr)
                                      Wr.hasOwnProperty(Tr) && Wr[Tr] != null && typeof Wr[Tr] != "function" && (Wr[Tr] && Array.isArray(Wr[Tr]) && Wr[Tr].length && Wr[Tr].every(function(eo) {
                                        return typeof eo != "object";
                                      }) ? un["" + _r + Tr + "[]"] = Wr[Tr].join(",") : Wr[Tr] && typeof Wr[Tr] == "object" ? un = pi(Wr[Tr], "" + _r + Tr, un) : un["" + _r + Tr] = Wr[Tr].toString());
                                    return un;
                                  }(zt, wr);
                                  for (var _e = 0, $o = Object.keys(Qt); _e < $o.length; _e++) {
                                    var di = $o[_e];
                                    Xe[di] = Qt[di];
                                  }
                                  return;
                                }
                              } else
                                typeof zt == "number" && (Qt = zt.toString());
                              Xe[se] = Qt;
                            });
                        });
                    })).then(function() {
                      return Xe;
                    });
                  }(ut, Re).then(function(he) {
                    return function(er, Xe) {
                      var qe, wr, or = Xe.query || {}, Qr = Xe.hash || {}, mr = er.split("#");
                      wr = mr[1];
                      var Qt = (qe = mr[0]).split("?");
                      qe = Qt[0];
                      var se = oo(Qt[1], or), zt = oo(wr, Qr);
                      return se && (qe = qe + "?" + se), zt && (qe = qe + "#" + zt), qe;
                    }(fr(an()), { query: he });
                  }), Zr = ve.trigger(yr.RENDER), Or = Sr(qt), Fr = Ee(), Br = Fr.then(function(he) {
                    return function(Xe) {
                      var qe = Xe === void 0 ? {} : Xe, wr = qe.proxyWin, or = qe.childDomain, Qr = qe.domain, mr = (qe.target, qe.context), Qt = qe.uid;
                      return function(se, zt, _e, $o) {
                        return Lr(_e).then(function(di) {
                          var pi = Gi(se, _e, di), Wr = zt === T() ? { type: "uid", uid: $o } : { type: "raw", value: pi };
                          if (Wr.type === "uid") {
                            var _r = Uo(window);
                            _r.props = _r.props || {}, _r.props[$o] = pi, Ft.register(function() {
                              delete _r.props[$o];
                            });
                          }
                          return Wr;
                        });
                      }(wr, or, Qr, Qt).then(function(se) {
                        return { uid: Qt, context: mr, tag: ht, version: "9_0_63", childDomain: or, parentDomain: T(window), parent: Yo(0, or, Qt, mr), props: se, exports: Gi(wr, Qr, (zt = wr, { init: xa, close: Mn, checkClose: function() {
                          return ui(zt);
                        }, resize: ea, onError: li, show: Gr, hide: bn })) };
                        var zt;
                      });
                    }({ proxyWin: (er = { proxyWin: he, childDomain: ze, domain: ae, target: Tt, context: Gt, uid: ee }).proxyWin, childDomain: er.childDomain, domain: er.domain, target: er.target, context: er.context, uid: er.uid }).then(function(Xe) {
                      return "__zoid__" + gt + "__" + et(JSON.stringify(Xe)) + "__";
                    });
                    var er;
                  }), lr = Br.then(function(he) {
                    return Qn(Gt, { windowName: he });
                  }), jr = si(Gt), sn = s.hash({ proxyContainer: Or, proxyFrame: lr, proxyPrerenderFrame: jr }).then(function(he) {
                    return zi(he.proxyContainer, { context: Gt, uid: ee, proxyFrame: he.proxyFrame, proxyPrerenderFrame: he.proxyPrerenderFrame });
                  }).then(function(he) {
                    return he;
                  }), nr = s.hash({ windowName: Br, proxyFrame: lr, proxyWin: Fr }).then(function(he) {
                    var er = he.proxyWin;
                    return rr ? er : Mi(Gt, { windowName: he.windowName, proxyWin: er, proxyFrame: he.proxyFrame });
                  }), cn = s.hash({ proxyWin: nr, proxyPrerenderFrame: jr }).then(function(he) {
                    return Vo(Gt, he.proxyWin, he.proxyPrerenderFrame);
                  }), Xr = nr.then(function(he) {
                    return X = he, En(he);
                  }), br = s.hash({ proxyPrerenderWin: cn, state: Xr }).then(function(he) {
                    return Sa(he.proxyPrerenderWin, { context: Gt, uid: ee });
                  }), Ur = s.hash({ proxyWin: nr, windowName: Br }).then(function(he) {
                    if (rr)
                      return he.proxyWin.setName(he.windowName);
                  }), pn = s.hash({ proxyWin: nr, builtUrl: $e, windowName: Ur, prerender: br }).then(function(he) {
                    return he.proxyWin.setLocation(he.builtUrl);
                  }), fi = nr.then(function(he) {
                    (function er(Xe, qe) {
                      var wr = !1;
                      return Ft.register(function() {
                        wr = !0;
                      }), s.delay(2e3).then(function() {
                        return Xe.isClosed();
                      }).then(function(or) {
                        return or ? Mn(new Error("Detected " + qe + " close")) : wr ? void 0 : er(Xe, qe);
                      });
                    })(he, Gt);
                  }), zn = s.hash({ container: sn, prerender: br }).then(function() {
                    return ve.trigger(yr.DISPLAY);
                  }), Dn = nr.then(function(he) {
                    return function(er, Xe, qe) {
                      return s.try(function() {
                        return er.awaitWindow();
                      }).then(function(wr) {
                        if (vn && vn.needsBridge({ win: wr, domain: Xe }) && !vn.hasBridge(Xe, Xe)) {
                          var or = typeof p.bridgeUrl == "function" ? p.bridgeUrl({ props: Re }) : p.bridgeUrl;
                          if (!or)
                            throw new Error("Bridge needed to render " + qe);
                          var Qr = Oe(or);
                          return vn.linkUrl(wr, Xe), vn.openBridge(fr(or), Qr);
                        }
                      });
                    }(he, ze, Gt);
                  }), to = pn.then(function() {
                    return s.try(function() {
                      var he = Re.timeout;
                      if (he)
                        return pe.timeout(he, new Error("Loading component timed out after " + he + " milliseconds"));
                    });
                  }), On = pe.then(function() {
                    return ve.trigger(yr.RENDERED);
                  });
                  return s.hash({ initPromise: pe, buildUrlPromise: $e, onRenderPromise: Zr, getProxyContainerPromise: Or, openFramePromise: lr, openPrerenderFramePromise: jr, renderContainerPromise: sn, openPromise: nr, openPrerenderPromise: cn, setStatePromise: Xr, prerenderPromise: br, loadUrlPromise: pn, buildWindowNamePromise: Br, setWindowNamePromise: Ur, watchForClosePromise: fi, onDisplayPromise: zn, openBridgePromise: Dn, runTimeoutPromise: to, onRenderedPromise: On, delegatePromise: Ze, watchForUnloadPromise: hr });
                }).catch(function(ee) {
                  return s.all([li(ee), ci(ee)]).then(function() {
                    throw ee;
                  }, function() {
                    throw ee;
                  });
                }).then(Ce);
              }, destroy: ci, setProps: ka, getHelpers: Di, getDelegateOverrides: function() {
                return s.try(function() {
                  return { getProxyContainer: Sr, show: Gr, hide: bn, renderContainer: zi, getProxyWindow: Ee, watchForUnload: ra, openFrame: Qn, openPrerenderFrame: si, prerender: Sa, open: Mi, openPrerender: Vo, setProxyWin: En };
                });
              } };
            }
            var Ie = { register: function(p, C, I, B) {
              var q = B.React, X = B.ReactDOM;
              return function(J) {
                function rt() {
                  return J.apply(this, arguments) || this;
                }
                v(rt, J);
                var ut = rt.prototype;
                return ut.render = function() {
                  return q.createElement("div", null);
                }, ut.componentDidMount = function() {
                  var st = X.findDOMNode(this), ft = I(dr({}, this.props));
                  ft.render(st, Ir.IFRAME), this.setState({ parent: ft });
                }, ut.componentDidUpdate = function() {
                  this.state && this.state.parent && this.state.parent.updateProps(dr({}, this.props)).catch(Ce);
                }, rt;
              }(q.Component);
            } }, Ma = { register: function(p, C, I, B) {
              return B.component(p, { render: function(q) {
                return q("div");
              }, inheritAttrs: !1, mounted: function() {
                var q = this.$el;
                this.parent = I(u({}, this.$attrs)), this.parent.render(q, Ir.IFRAME);
              }, watch: { $attrs: { handler: function() {
                this.parent && this.$attrs && this.parent.updateProps(u({}, this.$attrs)).catch(Ce);
              }, deep: !0 } } });
            } }, za = { register: function(p, C, I, B) {
              return B.module(p, []).directive(p.replace(/-([a-z])/g, function(q) {
                return q[1].toUpperCase();
              }), function() {
                for (var q = {}, X = 0, J = Object.keys(C); X < J.length; X++)
                  q[J[X]] = "=";
                return q.props = "=", { scope: q, restrict: "E", controller: ["$scope", "$element", function(rt, ut) {
                  function st() {
                    if (rt.$root.$$phase !== "$apply" && rt.$root.$$phase !== "$digest")
                      try {
                        rt.$apply();
                      } catch {
                      }
                  }
                  var ft = function() {
                    return Dt(rt.props, function(gt) {
                      return typeof gt == "function" ? function() {
                        var bt = gt.apply(this, arguments);
                        return st(), bt;
                      } : gt;
                    });
                  }, ht = I(ft());
                  ht.render(ut[0], Ir.IFRAME), rt.$watch(function() {
                    ht.updateProps(ft()).catch(Ce);
                  });
                }] };
              });
            } }, po = { register: function(p, C, I, B) {
              var q = B.NgModule, X = B.ElementRef, J = B.NgZone, rt = function(st) {
                return Dt(u({}, st.internalProps, st.props), function(ft) {
                  return typeof ft == "function" ? function() {
                    var ht = arguments, gt = this;
                    return st.zone.run(function() {
                      return ft.apply(gt, ht);
                    });
                  } : ft;
                });
              }, ut = (0, B.Component)({ selector: p, template: "<div></div>", inputs: ["props"] }).Class({ constructor: [X, J, function(st, ft) {
                this._props = {}, this.elementRef = st, this.zone = ft;
              }], ngOnInit: function() {
                var st = this.elementRef.nativeElement;
                this.parent = I(rt(this)), this.parent.render(st, Ir.IFRAME);
              }, ngDoCheck: function() {
                this.parent && !function(st, ft) {
                  var ht = {};
                  for (var gt in st)
                    if (st.hasOwnProperty(gt) && (ht[gt] = !0, st[gt] !== ft[gt]))
                      return !1;
                  for (var bt in ft)
                    if (!ht[bt])
                      return !1;
                  return !0;
                }(this._props, this.props) && (this._props = u({}, this.props), this.parent.updateProps(rt(this)));
              } });
              return q({ declarations: [ut], exports: [ut] }).Class({ constructor: function() {
              } });
            } };
            function Da(p) {
              var C = p.uid, I = p.frame, B = p.prerenderFrame, q = p.doc, X = p.props, J = p.event, rt = p.dimensions, ut = rt.width, st = rt.height;
              if (I && B) {
                var ft = q.createElement("div");
                ft.setAttribute("id", C);
                var ht = q.createElement("style");
                return X.cspNonce && ht.setAttribute("nonce", X.cspNonce), ht.appendChild(q.createTextNode(`
            #` + C + ` {
                display: inline-block;
                position: relative;
                width: ` + ut + `;
                height: ` + st + `;
            }

            #` + C + ` > iframe {
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                transition: opacity .2s ease-in-out;
            }

            #` + C + ` > iframe.zoid-invisible {
                opacity: 0;
            }

            #` + C + ` > iframe.zoid-visible {
                opacity: 1;
        }
        `)), ft.appendChild(I), ft.appendChild(B), ft.appendChild(ht), B.classList.add("zoid-visible"), I.classList.add("zoid-invisible"), J.on(yr.RENDERED, function() {
                  B.classList.remove("zoid-visible"), B.classList.add("zoid-invisible"), I.classList.remove("zoid-invisible"), I.classList.add("zoid-visible"), setTimeout(function() {
                    Zo(B);
                  }, 1);
                }), J.on(yr.RESIZE, function(gt) {
                  var bt = gt.width, Ct = gt.height;
                  typeof bt == "number" && (ft.style.width = An(bt)), typeof Ct == "number" && (ft.style.height = An(Ct));
                }), ft;
              }
            }
            function Ti(p) {
              var C = p.doc, I = p.props, B = C.createElement("html"), q = C.createElement("body"), X = C.createElement("style"), J = C.createElement("div");
              return J.classList.add("spinner"), I.cspNonce && X.setAttribute("nonce", I.cspNonce), B.appendChild(q), q.appendChild(J), q.appendChild(X), X.appendChild(C.createTextNode(`
            html, body {
                width: 100%;
                height: 100%;
            }

            .spinner {
                position: fixed;
                max-height: 60vmin;
                max-width: 60vmin;
                height: 40px;
                width: 40px;
                top: 50%;
                left: 50%;
                box-sizing: border-box;
                border: 3px solid rgba(0, 0, 0, .2);
                border-top-color: rgba(33, 128, 192, 0.8);
                border-radius: 100%;
                animation: rotation .7s infinite linear;
            }

            @keyframes rotation {
                from {
                    transform: translateX(-50%) translateY(-50%) rotate(0deg);
                }
                to {
                    transform: translateX(-50%) translateY(-50%) rotate(359deg);
                }
            }
        `)), B;
            }
            var Kn = function() {
              return Ce;
            }, yn = function(p) {
              return kr(p.value);
            }, qo = Ke(), Xi = Ke();
            function wa(p) {
              var C = function(bt) {
                var Ct = bt.tag, Bt = bt.url, re = bt.domain, Xt = bt.bridgeUrl, pe = bt.props, ge = pe === void 0 ? {} : pe, Ft = bt.dimensions, Ue = Ft === void 0 ? {} : Ft, me = bt.autoResize, ve = me === void 0 ? {} : me, Re = bt.allowedParentDomains, pr = Re === void 0 ? "*" : Re, Dr = bt.attributes, Je = Dr === void 0 ? {} : Dr, Jn = bt.defaultContext, ho = Jn === void 0 ? Ir.IFRAME : Jn, mo = bt.containerTemplate, Zn = mo === void 0 ? Da : mo, In = bt.prerenderTemplate, Oo = In === void 0 ? Ti : In, vo = bt.validate, Xn = bt.eligible, go = Xn === void 0 ? function() {
                  return { eligible: !0 };
                } : Xn, Tn = bt.logger, Me = Tn === void 0 ? { info: Ce } : Tn, Ae = Ct.replace(/-/g, "_"), Ar = Ue.width, Lr = Ar === void 0 ? "300px" : Ar, Er = Ue.height, Nr = Er === void 0 ? "150px" : Er;
                if (ge = u({}, { window: { type: "object", sendToChild: !1, required: !1, allowDelegate: !0, validate: function(Ee) {
                  var Sr = Ee.value;
                  if (!ar(Sr) && !mn.isProxyWindow(Sr))
                    throw new Error("Expected Window or ProxyWindow");
                  if (ar(Sr)) {
                    if (mt(Sr))
                      throw new Error("Window is closed");
                    if (!N(Sr))
                      throw new Error("Window is not same domain");
                  }
                }, decorate: function(Ee) {
                  return Ri(Ee.value);
                } }, timeout: { type: "number", required: !1, sendToChild: !1 }, close: { type: "function", required: !1, sendToChild: !1, childDecorate: function(Ee) {
                  return Ee.close;
                } }, focus: { type: "function", required: !1, sendToChild: !1, childDecorate: function(Ee) {
                  return Ee.focus;
                } }, resize: { type: "function", required: !1, sendToChild: !1, childDecorate: function(Ee) {
                  return Ee.resize;
                } }, uid: { type: "string", required: !1, sendToChild: !1, childDecorate: function(Ee) {
                  return Ee.uid;
                } }, cspNonce: { type: "string", required: !1 }, getParent: { type: "function", required: !1, sendToChild: !1, childDecorate: function(Ee) {
                  return Ee.getParent;
                } }, getParentDomain: { type: "function", required: !1, sendToChild: !1, childDecorate: function(Ee) {
                  return Ee.getParentDomain;
                } }, show: { type: "function", required: !1, sendToChild: !1, childDecorate: function(Ee) {
                  return Ee.show;
                } }, hide: { type: "function", required: !1, sendToChild: !1, childDecorate: function(Ee) {
                  return Ee.hide;
                } }, onDisplay: { type: "function", required: !1, sendToChild: !1, allowDelegate: !0, default: Kn, decorate: yn }, onRendered: { type: "function", required: !1, sendToChild: !1, default: Kn, decorate: yn }, onRender: { type: "function", required: !1, sendToChild: !1, default: Kn, decorate: yn }, onClose: { type: "function", required: !1, sendToChild: !1, allowDelegate: !0, default: Kn, decorate: yn }, onDestroy: { type: "function", required: !1, sendToChild: !1, allowDelegate: !0, default: Kn, decorate: yn }, onResize: { type: "function", required: !1, sendToChild: !1, allowDelegate: !0, default: Kn }, onFocus: { type: "function", required: !1, sendToChild: !1, allowDelegate: !0, default: Kn }, onError: { type: "function", required: !1, sendToChild: !1, childDecorate: function(Ee) {
                  return Ee.onError;
                } }, onProps: { type: "function", required: !1, sendToChild: !1, default: Kn, childDecorate: function(Ee) {
                  return Ee.onProps;
                } } }, ge), !Zn)
                  throw new Error("Container template required");
                return { name: Ae, tag: Ct, url: Bt, domain: re, bridgeUrl: Xt, propsDef: ge, dimensions: { width: Lr, height: Nr }, autoResize: ve, allowedParentDomains: pr, attributes: Je, defaultContext: ho, containerTemplate: Zn, prerenderTemplate: Oo, validate: vo, logger: Me, eligible: go };
              }(p), I = C.name, B = C.tag, q = C.defaultContext, X = C.propsDef, J = C.eligible, rt = Uo(), ut = {}, st = [], ft = function() {
                var bt = Wo();
                return Boolean(bt && bt.tag === B && bt.childDomain === T());
              }, ht = we(function() {
                if (ft()) {
                  if (window.xprops)
                    throw delete rt.components[B], new Error("Can not register " + I + " as child - child already registered");
                  var bt = function(Ct) {
                    var Bt, re = Ct.propsDef, Xt = Ct.autoResize, pe = Ct.allowedParentDomains, ge = [], Ft = Wo();
                    if (!Ft)
                      throw new Error("No child payload found");
                    if (Ft.version !== "9_0_63")
                      throw new Error("Parent window has zoid version " + Ft.version + ", child window has version 9_0_63");
                    var Ue = Ft.uid, me = Ft.parentDomain, ve = Ft.exports, Re = Ft.context, pr = Ft.props, Dr = function(Me) {
                      var Ae = Me.type;
                      if (Ae === "opener")
                        return xn("opener", M(window));
                      if (Ae === "parent" && typeof Me.distance == "number")
                        return xn("parent", function(En, Gr) {
                          return Gr === void 0 && (Gr = 1), function(bn, an) {
                            an === void 0 && (an = 1);
                            for (var dn = bn, yo = 0; yo < an; yo++) {
                              if (!dn)
                                return;
                              dn = O(dn);
                            }
                            return dn;
                          }(En, ce(En) - Gr);
                        }(window, Me.distance));
                      if (Ae === "global" && Me.uid && typeof Me.uid == "string") {
                        var Ar = Me.uid, Lr = xt(window);
                        if (!Lr)
                          throw new Error("Can not find ancestor window");
                        for (var Er = 0, Nr = Nt(Lr); Er < Nr.length; Er++) {
                          var Ee = Nr[Er];
                          if (N(Ee)) {
                            var Sr = Uo(Ee);
                            if (Sr && Sr.windows && Sr.windows[Ar])
                              return Sr.windows[Ar];
                          }
                        }
                      }
                      throw new Error("Unable to find " + Ae + " parent component window");
                    }(Ft.parent), Je = va(Dr, me, ve), Jn = Je.show, ho = Je.hide, mo = Je.close, Zn = function() {
                      return Dr;
                    }, In = function() {
                      return me;
                    }, Oo = function(Me) {
                      ge.push(Me);
                    }, vo = function(Me) {
                      return s.try(function() {
                        if (Je && Je.onError)
                          return Je.onError(Me);
                        throw Me;
                      });
                    }, Xn = function(Me) {
                      return Je.resize.fireAndForget({ width: Me.width, height: Me.height });
                    }, go = function(Me, Ae, Ar) {
                      Ar === void 0 && (Ar = !1);
                      var Lr = function(Nr, Ee, Sr, En, Gr, bn) {
                        bn === void 0 && (bn = !1);
                        for (var an = {}, dn = 0, yo = Object.keys(Sr); dn < yo.length; dn++) {
                          var jo = yo[dn], Qn = Ee[jo];
                          if (!Qn || !Qn.sameDomain || En === T(window) && N(Nr)) {
                            var si = ya(Ee, 0, jo, Sr[jo], Gr);
                            an[jo] = si, Qn && Qn.alias && !an[Qn.alias] && (an[Qn.alias] = si);
                          }
                        }
                        if (!bn)
                          for (var Vo = 0, Ho = Object.keys(Ee); Vo < Ho.length; Vo++) {
                            var Yo = Ho[Vo];
                            Sr.hasOwnProperty(Yo) || (an[Yo] = ya(Ee, 0, Yo, void 0, Gr));
                          }
                        return an;
                      }(Dr, re, Me, Ae, { show: Jn, hide: ho, close: mo, focus: Ki, onError: vo, resize: Xn, onProps: Oo, getParent: Zn, getParentDomain: In, uid: Ue }, Ar);
                      Bt ? dr(Bt, Lr) : Bt = Lr;
                      for (var Er = 0; Er < ge.length; Er++)
                        (0, ge[Er])(Bt);
                    }, Tn = function(Me) {
                      return s.try(function() {
                        return go(Me, me, !0);
                      });
                    };
                    return { init: function() {
                      return s.try(function() {
                        return function(Me, Ae) {
                          if (!fe(Me, Ae))
                            throw new Error("Can not be rendered by domain: " + Ae);
                        }(pe, me), ao(Dr), function() {
                          window.addEventListener("beforeunload", function() {
                            Je.checkClose.fireAndForget();
                          }), window.addEventListener("unload", function() {
                            Je.checkClose.fireAndForget();
                          }), be(Dr, function() {
                            Ji();
                          });
                        }(), Je.init({ updateProps: Tn, close: Ji });
                      }).then(function() {
                        return (Me = Xt.width, Ae = Me !== void 0 && Me, Ar = Xt.height, Lr = Ar !== void 0 && Ar, Er = Xt.element, xi(Er === void 0 ? "body" : Er).catch(Ce).then(function(Nr) {
                          return { width: Ae, height: Lr, element: Nr };
                        })).then(function(Nr) {
                          var Ee = Nr.width, Sr = Nr.height, En = Nr.element;
                          En && (Ee || Sr) && Re !== Ir.POPUP && io(En, function(Gr) {
                            Xn({ width: Ee ? Gr.width : void 0, height: Sr ? Gr.height : void 0 });
                          }, { width: Ee, height: Sr });
                        });
                        var Me, Ae, Ar, Lr, Er;
                      }).catch(function(Me) {
                        vo(Me);
                      });
                    }, getProps: function() {
                      return Bt || (go(function(Me, Ae, Ar) {
                        var Lr, Er = Ar.type, Nr = Ar.uid;
                        if (Er === "raw")
                          Lr = Ar.value;
                        else if (Er === "uid") {
                          if (!N(Me))
                            throw new Error("Parent component window is on a different domain - expected " + T() + " - can not retrieve props");
                          var Ee = Uo(Me);
                          Lr = xn("props", Ee && Ee.props[Nr]);
                        }
                        if (!Lr)
                          throw new Error("Could not find props");
                        return va(Me, Ae, Lr);
                      }(Dr, me, pr), me), Bt);
                    } };
                  }(C);
                  return bt.init(), bt;
                }
              }), gt = function bt(Ct) {
                var Bt, re = J({ props: Ct = Ct || {} }), Xt = re.eligible, pe = re.reason, ge = Ct.onDestroy;
                Ct.onDestroy = function() {
                  if (Bt && Xt && st.splice(st.indexOf(Bt), 1), ge)
                    return ge.apply(void 0, arguments);
                };
                var Ft = Eo(C);
                Ft.init(), Xt ? Ft.setProps(Ct) : Ct.onDestroy && Ct.onDestroy(), qo.register(function(me) {
                  Ft.destroy(me || new Error("zoid destroyed all components"));
                });
                var Ue = function(me, ve, Re) {
                  return s.try(function() {
                    if (!Xt) {
                      var pr = new Error(pe || I + " component is not eligible");
                      return Ft.destroy(pr).then(function() {
                        throw pr;
                      });
                    }
                    if (!ar(me))
                      throw new Error("Must pass window to renderTo");
                    return function(Dr, Je) {
                      return s.try(function() {
                        if (Dr.window)
                          return Ri(Dr.window).getType();
                        if (Je) {
                          if (Je !== Ir.IFRAME && Je !== Ir.POPUP)
                            throw new Error("Unrecognized context: " + Je);
                          return Je;
                        }
                        return q;
                      });
                    }(Ct, Re);
                  }).then(function(pr) {
                    return ve = function(Dr, Je) {
                      if (Je) {
                        if (typeof Je != "string" && !_i(Je))
                          throw new TypeError("Expected string or element selector to be passed");
                        return Je;
                      }
                      if (Dr === Ir.POPUP)
                        return "body";
                      throw new Error("Expected element to be passed to render iframe");
                    }(pr, ve), Ft.render(me, ve, pr);
                  }).catch(function(pr) {
                    return Ft.destroy(pr).then(function() {
                      throw pr;
                    });
                  });
                };
                return Bt = u({}, Ft.getHelpers(), { isEligible: function() {
                  return Xt;
                }, clone: function(me) {
                  var ve = (me === void 0 ? {} : me).decorate;
                  return bt((ve === void 0 ? Pt : ve)(Ct));
                }, render: function(me, ve) {
                  return Ue(window, me, ve);
                }, renderTo: function(me, ve, Re) {
                  return Ue(me, ve, Re);
                } }), Xt && st.push(Bt), Bt;
              };
              if (ht(), function() {
                var bt = Rn("zoid_allow_delegate_" + I, function() {
                  return !0;
                }), Ct = Rn("zoid_delegate_" + I, function(Bt) {
                  return { parent: Eo(C, Bt.data.overrides, Bt.source) };
                });
                Xi.register(bt.cancel), Xi.register(Ct.cancel);
              }(), rt.components = rt.components || {}, rt.components[B])
                throw new Error("Can not register multiple components with the same tag: " + B);
              return rt.components[B] = !0, { init: gt, instances: st, driver: function(bt, Ct) {
                var Bt = { react: Ie, angular: za, vue: Ma, angular2: po };
                if (!Bt[bt])
                  throw new Error("Could not find driver for framework: " + bt);
                return ut[bt] || (ut[bt] = Bt[bt].register(B, X, gt, Ct)), ut[bt];
              }, isChild: ft, canRenderTo: function(bt) {
                return gn(bt, "zoid_allow_delegate_" + I).then(function(Ct) {
                  return Ct.data;
                }).catch(function() {
                  return !1;
                });
              }, registerChild: ht };
            }
            function La(p) {
              (function() {
                var q, X, J, rt;
                hn().initialized || (hn().initialized = !0, X = (q = { on: Rn, send: gn }).on, J = q.send, (rt = hn()).receiveMessage = rt.receiveMessage || function(ut) {
                  return Ci(ut, { on: X, send: J });
                }, function(ut) {
                  var st = ut.on, ft = ut.send;
                  Be().getOrSet("postMessageListener", function() {
                    return $n(window, "message", function(ht) {
                      (function(gt, bt) {
                        var Ct = bt.on, Bt = bt.send;
                        s.try(function() {
                          var re = gt.source || gt.sourceElement, Xt = gt.origin || gt.originalEvent && gt.originalEvent.origin, pe = gt.data;
                          if (Xt === "null" && (Xt = "file://"), re) {
                            if (!Xt)
                              throw new Error("Post message did not have origin domain");
                            Ci({ source: re, origin: Xt, data: pe }, { on: Ct, send: Bt });
                          }
                        });
                      })(ht, { on: st, send: ft });
                    });
                  });
                }({ on: Rn, send: gn }), So({ on: Rn, send: gn, receiveMessage: Ci }), function(ut) {
                  var st = ut.on, ft = ut.send;
                  Be("builtinListeners").getOrSet("helloListener", function() {
                    var ht = st("postrobot_hello", { domain: "*" }, function(bt) {
                      return Qo(bt.source, { domain: bt.origin }), { instanceID: Wi() };
                    }), gt = xt();
                    return gt && ti(gt, { send: ft }).catch(function(bt) {
                    }), ht;
                  });
                }({ on: Rn, send: gn }));
              })();
              var C = wa(p), I = function(q) {
                return C.init(q);
              };
              I.driver = function(q, X) {
                return C.driver(q, X);
              }, I.isChild = function() {
                return C.isChild();
              }, I.canRenderTo = function(q) {
                return C.canRenderTo(q);
              }, I.instances = C.instances;
              var B = C.registerChild();
              return B && (window.xprops = I.xprops = B.getProps()), I;
            }
            function Qi(p) {
              vn && vn.destroyBridges();
              var C = qo.all(p);
              return qo = Ke(), C;
            }
            var _a = Qi;
            function ta(p) {
              return _a(), delete window.__zoid_9_0_63__, function() {
                var C;
                (function() {
                  for (var I = Be("responseListeners"), B = 0, q = I.keys(); B < q.length; B++) {
                    var X = q[B], J = I.get(X);
                    J && (J.cancelled = !0), I.del(X);
                  }
                })(), (C = Be().get("postMessageListener")) && C.cancel(), delete window.__post_robot_10_0_42__;
              }(), Xi.all(p);
            }
          }]);
        });
      }).call(this, o("b639").Buffer);
    }, bf9f: function(F, G, o) {
      var j = o("b4b5");
      j.__esModule && (j = j.default), typeof j == "string" && (j = [[F.i, j, ""]]), j.locals && (F.exports = j.locals);
      var z = o("499e").default;
      z("64a9cc6f", j, !0, { sourceMap: !1, shadowMode: !1 });
    }, c04e: function(F, G, o) {
      var j = o("da84"), z = o("c65b"), $ = o("861d"), m = o("d9b5"), v = o("dc4a"), u = o("485a"), S = o("b622"), g = j.TypeError, w = S("toPrimitive");
      F.exports = function(a, f) {
        if (!$(a) || m(a))
          return a;
        var y, l = v(a, w);
        if (l) {
          if (f === void 0 && (f = "default"), y = z(l, a, f), !$(y) || m(y))
            return y;
          throw g("Can't convert object to primitive value");
        }
        return f === void 0 && (f = "number"), u(a, f);
      };
    }, c28b: function(F, G, o) {
      (function(j, z) {
        F.exports = z();
      })(0, function() {
        var j = typeof window < "u", z = typeof navigator < "u", $ = j && ("ontouchstart" in window || z && navigator.msMaxTouchPoints > 0) ? ["touchstart"] : ["click"];
        function m(g) {
          var w = g.event, a = g.handler;
          (0, g.middleware)(w) && a(w);
        }
        function v(g, w) {
          var a = function(s) {
            var b = typeof s == "function";
            if (!b && typeof s != "object")
              throw new Error("v-click-outside: Binding value must be a function or an object");
            return { handler: b ? s : s.handler, middleware: s.middleware || function(h) {
              return h;
            }, events: s.events || $, isActive: s.isActive !== !1, detectIframe: s.detectIframe !== !1 };
          }(w.value), f = a.handler, y = a.middleware, l = a.detectIframe;
          if (a.isActive) {
            if (g["__v-click-outside"] = a.events.map(function(s) {
              return { event: s, srcTarget: document.documentElement, handler: function(b) {
                return function(h) {
                  var k = h.el, d = h.event, O = h.handler, M = h.middleware, L = d.path || d.composedPath && d.composedPath();
                  (L ? L.indexOf(k) < 0 : !k.contains(d.target)) && m({ event: d, handler: O, middleware: M });
                }({ el: g, event: b, handler: f, middleware: y });
              } };
            }), l) {
              var c = { event: "blur", srcTarget: window, handler: function(s) {
                return function(b) {
                  var h = b.el, k = b.event, d = b.handler, O = b.middleware;
                  setTimeout(function() {
                    var M = document.activeElement;
                    M && M.tagName === "IFRAME" && !h.contains(M) && m({ event: k, handler: d, middleware: O });
                  }, 0);
                }({ el: g, event: s, handler: f, middleware: y });
              } };
              g["__v-click-outside"] = [].concat(g["__v-click-outside"], [c]);
            }
            g["__v-click-outside"].forEach(function(s) {
              var b = s.event, h = s.srcTarget, k = s.handler;
              return setTimeout(function() {
                g["__v-click-outside"] && h.addEventListener(b, k, !1);
              }, 0);
            });
          }
        }
        function u(g) {
          (g["__v-click-outside"] || []).forEach(function(w) {
            return w.srcTarget.removeEventListener(w.event, w.handler, !1);
          }), delete g["__v-click-outside"];
        }
        var S = j ? { bind: v, update: function(g, w) {
          var a = w.value, f = w.oldValue;
          JSON.stringify(a) !== JSON.stringify(f) && (u(g), v(g, { value: a }));
        }, unbind: u } : {};
        return { install: function(g) {
          g.directive("click-outside", S);
        }, directive: S };
      });
    }, c430: function(F, G) {
      F.exports = !1;
    }, c65b: function(F, G) {
      var o = Function.prototype.call;
      F.exports = o.bind ? o.bind(o) : function() {
        return o.apply(o, arguments);
      };
    }, c6b6: function(F, G, o) {
      var j = o("e330"), z = j({}.toString), $ = j("".slice);
      F.exports = function(m) {
        return $(z(m), 8, -1);
      };
    }, c6cd: function(F, G, o) {
      var j = o("da84"), z = o("ce4e"), $ = "__core-js_shared__", m = j[$] || z($, {});
      F.exports = m;
    }, c8ba: function(F, G) {
      var o;
      o = function() {
        return this;
      }();
      try {
        o = o || new Function("return this")();
      } catch {
        typeof window == "object" && (o = window);
      }
      F.exports = o;
    }, ca84: function(F, G, o) {
      var j = o("e330"), z = o("1a2d"), $ = o("fc6a"), m = o("4d64").indexOf, v = o("d012"), u = j([].push);
      F.exports = function(S, g) {
        var w, a = $(S), f = 0, y = [];
        for (w in a)
          !z(v, w) && z(a, w) && u(y, w);
        for (; g.length > f; )
          z(a, w = g[f++]) && (~m(y, w) || u(y, w));
        return y;
      };
    }, caad: function(F, G, o) {
      var j = o("23e7"), z = o("4d64").includes, $ = o("44d2");
      j({ target: "Array", proto: !0 }, { includes: function(m) {
        return z(this, m, arguments.length > 1 ? arguments[1] : void 0);
      } }), $("includes");
    }, cc12: function(F, G, o) {
      var j = o("da84"), z = o("861d"), $ = j.document, m = z($) && z($.createElement);
      F.exports = function(v) {
        return m ? $.createElement(v) : {};
      };
    }, cca6: function(F, G, o) {
      var j = o("23e7"), z = o("60da");
      j({ target: "Object", stat: !0, forced: Object.assign !== z }, { assign: z });
    }, cdf9: function(F, G, o) {
      var j = o("825a"), z = o("861d"), $ = o("f069");
      F.exports = function(m, v) {
        if (j(m), z(v) && v.constructor === m)
          return v;
        var u = $.f(m), S = u.resolve;
        return S(v), u.promise;
      };
    }, ce4e: function(F, G, o) {
      var j = o("da84"), z = Object.defineProperty;
      F.exports = function($, m) {
        try {
          z(j, $, { value: m, configurable: !0, writable: !0 });
        } catch {
          j[$] = m;
        }
        return m;
      };
    }, d012: function(F, G) {
      F.exports = {};
    }, d039: function(F, G) {
      F.exports = function(o) {
        try {
          return !!o();
        } catch {
          return !0;
        }
      };
    }, d066: function(F, G, o) {
      var j = o("da84"), z = o("1626"), $ = function(m) {
        return z(m) ? m : void 0;
      };
      F.exports = function(m, v) {
        return arguments.length < 2 ? $(j[m]) : j[m] && j[m][v];
      };
    }, d1e7: function(F, G, o) {
      var j = {}.propertyIsEnumerable, z = Object.getOwnPropertyDescriptor, $ = z && !j.call({ 1: 2 }, 1);
      G.f = $ ? function(m) {
        var v = z(this, m);
        return !!v && v.enumerable;
      } : j;
    }, d28b: function(F, G, o) {
      var j = o("746f");
      j("iterator");
    }, d2bb: function(F, G, o) {
      var j = o("e330"), z = o("825a"), $ = o("3bbe");
      F.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var m, v = !1, u = {};
        try {
          m = j(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set), m(u, []), v = u instanceof Array;
        } catch {
        }
        return function(S, g) {
          return z(S), $(g), v ? m(S, g) : S.__proto__ = g, S;
        };
      }() : void 0);
    }, d370: function(F, G, o) {
      (function(j, z) {
        F.exports = z();
      })(self, function() {
        return j = { 1238: ($) => {
          $.exports = { version: "17.5.0" };
        }, 7629: ($, m, v) => {
          const u = v(375), S = v(8571), g = v(9474), w = v(1687), a = v(8652), f = v(8160), y = v(3292), l = v(6354), c = v(8901), s = v(9708), b = v(6914), h = v(2294), k = v(6133), d = v(1152), O = v(8863), M = v(2036), L = { Base: class {
            constructor(x) {
              this.type = x, this.$_root = null, this._definition = {}, this._reset();
            }
            _reset() {
              this._ids = new h.Ids(), this._preferences = null, this._refs = new k.Manager(), this._cache = null, this._valids = null, this._invalids = null, this._flags = {}, this._rules = [], this._singleRules = /* @__PURE__ */ new Map(), this.$_terms = {}, this.$_temp = { ruleset: null, whens: {} };
            }
            describe() {
              return u(typeof s.describe == "function", "Manifest functionality disabled"), s.describe(this);
            }
            allow(...x) {
              return f.verifyFlat(x, "allow"), this._values(x, "_valids");
            }
            alter(x) {
              u(x && typeof x == "object" && !Array.isArray(x), "Invalid targets argument"), u(!this._inRuleset(), "Cannot set alterations inside a ruleset");
              const T = this.clone();
              T.$_terms.alterations = T.$_terms.alterations || [];
              for (const N in x) {
                const Y = x[N];
                u(typeof Y == "function", "Alteration adjuster for", N, "must be a function"), T.$_terms.alterations.push({ target: N, adjuster: Y });
              }
              return T.$_temp.ruleset = !1, T;
            }
            artifact(x) {
              return u(x !== void 0, "Artifact cannot be undefined"), u(!this._cache, "Cannot set an artifact with a rule cache"), this.$_setFlag("artifact", x);
            }
            cast(x) {
              return u(x === !1 || typeof x == "string", "Invalid to value"), u(x === !1 || this._definition.cast[x], "Type", this.type, "does not support casting to", x), this.$_setFlag("cast", x === !1 ? void 0 : x);
            }
            default(x, T) {
              return this._default("default", x, T);
            }
            description(x) {
              return u(x && typeof x == "string", "Description must be a non-empty string"), this.$_setFlag("description", x);
            }
            empty(x) {
              const T = this.clone();
              return x !== void 0 && (x = T.$_compile(x, { override: !1 })), T.$_setFlag("empty", x, { clone: !1 });
            }
            error(x) {
              return u(x, "Missing error"), u(x instanceof Error || typeof x == "function", "Must provide a valid Error object or a function"), this.$_setFlag("error", x);
            }
            example(x, T = {}) {
              return u(x !== void 0, "Missing example"), f.assertOptions(T, ["override"]), this._inner("examples", x, { single: !0, override: T.override });
            }
            external(x, T) {
              return typeof x == "object" && (u(!T, "Cannot combine options with description"), T = x.description, x = x.method), u(typeof x == "function", "Method must be a function"), u(T === void 0 || T && typeof T == "string", "Description must be a non-empty string"), this._inner("externals", { method: x, description: T }, { single: !0 });
            }
            failover(x, T) {
              return this._default("failover", x, T);
            }
            forbidden() {
              return this.presence("forbidden");
            }
            id(x) {
              return x ? (u(typeof x == "string", "id must be a non-empty string"), u(/^[^\.]+$/.test(x), "id cannot contain period character"), this.$_setFlag("id", x)) : this.$_setFlag("id", void 0);
            }
            invalid(...x) {
              return this._values(x, "_invalids");
            }
            label(x) {
              return u(x && typeof x == "string", "Label name must be a non-empty string"), this.$_setFlag("label", x);
            }
            meta(x) {
              return u(x !== void 0, "Meta cannot be undefined"), this._inner("metas", x, { single: !0 });
            }
            note(...x) {
              u(x.length, "Missing notes");
              for (const T of x)
                u(T && typeof T == "string", "Notes must be non-empty strings");
              return this._inner("notes", x);
            }
            only(x = !0) {
              return u(typeof x == "boolean", "Invalid mode:", x), this.$_setFlag("only", x);
            }
            optional() {
              return this.presence("optional");
            }
            prefs(x) {
              u(x, "Missing preferences"), u(x.context === void 0, "Cannot override context"), u(x.externals === void 0, "Cannot override externals"), u(x.warnings === void 0, "Cannot override warnings"), u(x.debug === void 0, "Cannot override debug"), f.checkPreferences(x);
              const T = this.clone();
              return T._preferences = f.preferences(T._preferences, x), T;
            }
            presence(x) {
              return u(["optional", "required", "forbidden"].includes(x), "Unknown presence mode", x), this.$_setFlag("presence", x);
            }
            raw(x = !0) {
              return this.$_setFlag("result", x ? "raw" : void 0);
            }
            result(x) {
              return u(["raw", "strip"].includes(x), "Unknown result mode", x), this.$_setFlag("result", x);
            }
            required() {
              return this.presence("required");
            }
            strict(x) {
              const T = this.clone(), N = x !== void 0 && !x;
              return T._preferences = f.preferences(T._preferences, { convert: N }), T;
            }
            strip(x = !0) {
              return this.$_setFlag("result", x ? "strip" : void 0);
            }
            tag(...x) {
              u(x.length, "Missing tags");
              for (const T of x)
                u(T && typeof T == "string", "Tags must be non-empty strings");
              return this._inner("tags", x);
            }
            unit(x) {
              return u(x && typeof x == "string", "Unit name must be a non-empty string"), this.$_setFlag("unit", x);
            }
            valid(...x) {
              f.verifyFlat(x, "valid");
              const T = this.allow(...x);
              return T.$_setFlag("only", !!T._valids, { clone: !1 }), T;
            }
            when(x, T) {
              const N = this.clone();
              N.$_terms.whens || (N.$_terms.whens = []);
              const Y = y.when(N, x, T);
              if (!["any", "link"].includes(N.type)) {
                const ot = Y.is ? [Y] : Y.switch;
                for (const at of ot)
                  u(!at.then || at.then.type === "any" || at.then.type === N.type, "Cannot combine", N.type, "with", at.then && at.then.type), u(!at.otherwise || at.otherwise.type === "any" || at.otherwise.type === N.type, "Cannot combine", N.type, "with", at.otherwise && at.otherwise.type);
              }
              return N.$_terms.whens.push(Y), N.$_mutateRebuild();
            }
            cache(x) {
              u(!this._inRuleset(), "Cannot set caching inside a ruleset"), u(!this._cache, "Cannot override schema cache"), u(this._flags.artifact === void 0, "Cannot cache a rule with an artifact");
              const T = this.clone();
              return T._cache = x || a.provider.provision(), T.$_temp.ruleset = !1, T;
            }
            clone() {
              const x = Object.create(Object.getPrototypeOf(this));
              return this._assign(x);
            }
            concat(x) {
              u(f.isSchema(x), "Invalid schema object"), u(this.type === "any" || x.type === "any" || x.type === this.type, "Cannot merge type", this.type, "with another type:", x.type), u(!this._inRuleset(), "Cannot concatenate onto a schema with open ruleset"), u(!x._inRuleset(), "Cannot concatenate a schema with open ruleset");
              let T = this.clone();
              if (this.type === "any" && x.type !== "any") {
                const N = x.clone();
                for (const Y of Object.keys(T))
                  Y !== "type" && (N[Y] = T[Y]);
                T = N;
              }
              T._ids.concat(x._ids), T._refs.register(x, k.toSibling), T._preferences = T._preferences ? f.preferences(T._preferences, x._preferences) : x._preferences, T._valids = M.merge(T._valids, x._valids, x._invalids), T._invalids = M.merge(T._invalids, x._invalids, x._valids);
              for (const N of x._singleRules.keys())
                T._singleRules.has(N) && (T._rules = T._rules.filter((Y) => Y.keep || Y.name !== N), T._singleRules.delete(N));
              for (const N of x._rules)
                x._definition.rules[N.method].multi || T._singleRules.set(N.name, N), T._rules.push(N);
              if (T._flags.empty && x._flags.empty) {
                T._flags.empty = T._flags.empty.concat(x._flags.empty);
                const N = Object.assign({}, x._flags);
                delete N.empty, w(T._flags, N);
              } else if (x._flags.empty) {
                T._flags.empty = x._flags.empty;
                const N = Object.assign({}, x._flags);
                delete N.empty, w(T._flags, N);
              } else
                w(T._flags, x._flags);
              for (const N in x.$_terms) {
                const Y = x.$_terms[N];
                Y ? T.$_terms[N] ? T.$_terms[N] = T.$_terms[N].concat(Y) : T.$_terms[N] = Y.slice() : T.$_terms[N] || (T.$_terms[N] = Y);
              }
              return this.$_root._tracer && this.$_root._tracer._combine(T, [this, x]), T.$_mutateRebuild();
            }
            extend(x) {
              return u(!x.base, "Cannot extend type with another base"), c.type(this, x);
            }
            extract(x) {
              return x = Array.isArray(x) ? x : x.split("."), this._ids.reach(x);
            }
            fork(x, T) {
              u(!this._inRuleset(), "Cannot fork inside a ruleset");
              let N = this;
              for (let Y of [].concat(x))
                Y = Array.isArray(Y) ? Y : Y.split("."), N = N._ids.fork(Y, T, N);
              return N.$_temp.ruleset = !1, N;
            }
            rule(x) {
              const T = this._definition;
              f.assertOptions(x, Object.keys(T.modifiers)), u(this.$_temp.ruleset !== !1, "Cannot apply rules to empty ruleset or the last rule added does not support rule properties");
              const N = this.$_temp.ruleset === null ? this._rules.length - 1 : this.$_temp.ruleset;
              u(N >= 0 && N < this._rules.length, "Cannot apply rules to empty ruleset");
              const Y = this.clone();
              for (let ot = N; ot < Y._rules.length; ++ot) {
                const at = Y._rules[ot], St = S(at);
                for (const wt in x)
                  T.modifiers[wt](St, x[wt]), u(St.name === at.name, "Cannot change rule name");
                Y._rules[ot] = St, Y._singleRules.get(St.name) === at && Y._singleRules.set(St.name, St);
              }
              return Y.$_temp.ruleset = !1, Y.$_mutateRebuild();
            }
            get ruleset() {
              u(!this._inRuleset(), "Cannot start a new ruleset without closing the previous one");
              const x = this.clone();
              return x.$_temp.ruleset = x._rules.length, x;
            }
            get $() {
              return this.ruleset;
            }
            tailor(x) {
              x = [].concat(x), u(!this._inRuleset(), "Cannot tailor inside a ruleset");
              let T = this;
              if (this.$_terms.alterations)
                for (const { target: N, adjuster: Y } of this.$_terms.alterations)
                  x.includes(N) && (T = Y(T), u(f.isSchema(T), "Alteration adjuster for", N, "failed to return a schema object"));
              return T = T.$_modify({ each: (N) => N.tailor(x), ref: !1 }), T.$_temp.ruleset = !1, T.$_mutateRebuild();
            }
            tracer() {
              return d.location ? d.location(this) : this;
            }
            validate(x, T) {
              return O.entry(x, this, T);
            }
            validateAsync(x, T) {
              return O.entryAsync(x, this, T);
            }
            $_addRule(x) {
              typeof x == "string" && (x = { name: x }), u(x && typeof x == "object", "Invalid options"), u(x.name && typeof x.name == "string", "Invalid rule name");
              for (const at in x)
                u(at[0] !== "_", "Cannot set private rule properties");
              const T = Object.assign({}, x);
              T._resolve = [], T.method = T.method || T.name;
              const N = this._definition.rules[T.method], Y = T.args;
              u(N, "Unknown rule", T.method);
              const ot = this.clone();
              if (Y) {
                u(Object.keys(Y).length === 1 || Object.keys(Y).length === this._definition.rules[T.name].args.length, "Invalid rule definition for", this.type, T.name);
                for (const at in Y) {
                  let St = Y[at];
                  if (St !== void 0) {
                    if (N.argsByName) {
                      const wt = N.argsByName.get(at);
                      if (wt.ref && f.isResolvable(St))
                        T._resolve.push(at), ot.$_mutateRegister(St);
                      else if (wt.normalize && (St = wt.normalize(St), Y[at] = St), wt.assert) {
                        const Nt = f.validateArg(St, at, wt);
                        u(!Nt, Nt, "or reference");
                      }
                    }
                    Y[at] = St;
                  } else
                    delete Y[at];
                }
              }
              return N.multi || (ot._ruleRemove(T.name, { clone: !1 }), ot._singleRules.set(T.name, T)), ot.$_temp.ruleset === !1 && (ot.$_temp.ruleset = null), N.priority ? ot._rules.unshift(T) : ot._rules.push(T), ot;
            }
            $_compile(x, T) {
              return y.schema(this.$_root, x, T);
            }
            $_createError(x, T, N, Y, ot, at = {}) {
              const St = at.flags !== !1 ? this._flags : {}, wt = at.messages ? b.merge(this._definition.messages, at.messages) : this._definition.messages;
              return new l.Report(x, T, N, St, wt, Y, ot);
            }
            $_getFlag(x) {
              return this._flags[x];
            }
            $_getRule(x) {
              return this._singleRules.get(x);
            }
            $_mapLabels(x) {
              return x = Array.isArray(x) ? x : x.split("."), this._ids.labels(x);
            }
            $_match(x, T, N, Y) {
              (N = Object.assign({}, N)).abortEarly = !0, N._externals = !1, T.snapshot();
              const ot = !O.validate(x, this, T, N, Y).errors;
              return T.restore(), ot;
            }
            $_modify(x) {
              return f.assertOptions(x, ["each", "once", "ref", "schema"]), h.schema(this, x) || this;
            }
            $_mutateRebuild() {
              return u(!this._inRuleset(), "Cannot add this rule inside a ruleset"), this._refs.reset(), this._ids.reset(), this.$_modify({ each: (x, { source: T, name: N, path: Y, key: ot }) => {
                const at = this._definition[T][N] && this._definition[T][N].register;
                at !== !1 && this.$_mutateRegister(x, { family: at, key: ot });
              } }), this._definition.rebuild && this._definition.rebuild(this), this.$_temp.ruleset = !1, this;
            }
            $_mutateRegister(x, { family: T, key: N } = {}) {
              this._refs.register(x, T), this._ids.register(x, { key: N });
            }
            $_property(x) {
              return this._definition.properties[x];
            }
            $_reach(x) {
              return this._ids.reach(x);
            }
            $_rootReferences() {
              return this._refs.roots();
            }
            $_setFlag(x, T, N = {}) {
              u(x[0] === "_" || !this._inRuleset(), "Cannot set flag inside a ruleset");
              const Y = this._definition.flags[x] || {};
              if (g(T, Y.default) && (T = void 0), g(T, this._flags[x]))
                return this;
              const ot = N.clone !== !1 ? this.clone() : this;
              return T !== void 0 ? (ot._flags[x] = T, ot.$_mutateRegister(T)) : delete ot._flags[x], x[0] !== "_" && (ot.$_temp.ruleset = !1), ot;
            }
            $_parent(x, ...T) {
              return this[x][f.symbols.parent].call(this, ...T);
            }
            $_validate(x, T, N) {
              return O.validate(x, this, T, N);
            }
            _assign(x) {
              x.type = this.type, x.$_root = this.$_root, x.$_temp = Object.assign({}, this.$_temp), x.$_temp.whens = {}, x._ids = this._ids.clone(), x._preferences = this._preferences, x._valids = this._valids && this._valids.clone(), x._invalids = this._invalids && this._invalids.clone(), x._rules = this._rules.slice(), x._singleRules = S(this._singleRules, { shallow: !0 }), x._refs = this._refs.clone(), x._flags = Object.assign({}, this._flags), x._cache = null, x.$_terms = {};
              for (const T in this.$_terms)
                x.$_terms[T] = this.$_terms[T] ? this.$_terms[T].slice() : null;
              x.$_super = {};
              for (const T in this.$_super)
                x.$_super[T] = this._super[T].bind(x);
              return x;
            }
            _bare() {
              const x = this.clone();
              x._reset();
              const T = x._definition.terms;
              for (const N in T) {
                const Y = T[N];
                x.$_terms[N] = Y.init;
              }
              return x.$_mutateRebuild();
            }
            _default(x, T, N = {}) {
              return f.assertOptions(N, "literal"), u(T !== void 0, "Missing", x, "value"), u(typeof T == "function" || !N.literal, "Only function value supports literal option"), typeof T == "function" && N.literal && (T = { [f.symbols.literal]: !0, literal: T }), this.$_setFlag(x, T);
            }
            _generate(x, T, N) {
              if (!this.$_terms.whens)
                return { schema: this };
              const Y = [], ot = [];
              for (let wt = 0; wt < this.$_terms.whens.length; ++wt) {
                const Nt = this.$_terms.whens[wt];
                if (Nt.concat) {
                  Y.push(Nt.concat), ot.push("".concat(wt, ".concat"));
                  continue;
                }
                const It = Nt.ref ? Nt.ref.resolve(x, T, N) : x, xe = Nt.is ? [Nt] : Nt.switch, mt = ot.length;
                for (let pt = 0; pt < xe.length; ++pt) {
                  const { is: Et, then: Mt, otherwise: xt } = xe[pt], Yt = "".concat(wt).concat(Nt.switch ? "." + pt : "");
                  if (Et.$_match(It, T.nest(Et, "".concat(Yt, ".is")), N)) {
                    if (Mt) {
                      const ce = T.localize([...T.path, "".concat(Yt, ".then")], T.ancestors, T.schemas), { schema: ye, id: fe } = Mt._generate(x, ce, N);
                      Y.push(ye), ot.push("".concat(Yt, ".then").concat(fe ? "(".concat(fe, ")") : ""));
                      break;
                    }
                  } else if (xt) {
                    const ce = T.localize([...T.path, "".concat(Yt, ".otherwise")], T.ancestors, T.schemas), { schema: ye, id: fe } = xt._generate(x, ce, N);
                    Y.push(ye), ot.push("".concat(Yt, ".otherwise").concat(fe ? "(".concat(fe, ")") : ""));
                    break;
                  }
                }
                if (Nt.break && ot.length > mt)
                  break;
              }
              const at = ot.join(", ");
              if (T.mainstay.tracer.debug(T, "rule", "when", at), !at)
                return { schema: this };
              if (!T.mainstay.tracer.active && this.$_temp.whens[at])
                return { schema: this.$_temp.whens[at], id: at };
              let St = this;
              this._definition.generate && (St = this._definition.generate(this, x, T, N));
              for (const wt of Y)
                St = St.concat(wt);
              return this.$_root._tracer && this.$_root._tracer._combine(St, [this, ...Y]), this.$_temp.whens[at] = St, { schema: St, id: at };
            }
            _inner(x, T, N = {}) {
              u(!this._inRuleset(), "Cannot set ".concat(x, " inside a ruleset"));
              const Y = this.clone();
              return Y.$_terms[x] && !N.override || (Y.$_terms[x] = []), N.single ? Y.$_terms[x].push(T) : Y.$_terms[x].push(...T), Y.$_temp.ruleset = !1, Y;
            }
            _inRuleset() {
              return this.$_temp.ruleset !== null && this.$_temp.ruleset !== !1;
            }
            _ruleRemove(x, T = {}) {
              if (!this._singleRules.has(x))
                return this;
              const N = T.clone !== !1 ? this.clone() : this;
              N._singleRules.delete(x);
              const Y = [];
              for (let ot = 0; ot < N._rules.length; ++ot) {
                const at = N._rules[ot];
                at.name !== x || at.keep ? Y.push(at) : N._inRuleset() && ot < N.$_temp.ruleset && --N.$_temp.ruleset;
              }
              return N._rules = Y, N;
            }
            _values(x, T) {
              f.verifyFlat(x, T.slice(1, -1));
              const N = this.clone(), Y = x[0] === f.symbols.override;
              if (Y && (x = x.slice(1)), !N[T] && x.length ? N[T] = new M() : Y && (N[T] = x.length ? new M() : null, N.$_mutateRebuild()), !N[T])
                return N;
              Y && N[T].override();
              for (const ot of x) {
                u(ot !== void 0, "Cannot call allow/valid/invalid with undefined"), u(ot !== f.symbols.override, "Override must be the first value");
                const at = T === "_invalids" ? "_valids" : "_invalids";
                N[at] && (N[at].remove(ot), N[at].length || (u(T === "_valids" || !N._flags.only, "Setting invalid value", ot, "leaves schema rejecting all values due to previous valid rule"), N[at] = null)), N[T].add(ot, N._refs);
              }
              return N;
            }
          } };
          L.Base.prototype[f.symbols.any] = { version: f.version, compile: y.compile, root: "$_root" }, L.Base.prototype.isImmutable = !0, L.Base.prototype.deny = L.Base.prototype.invalid, L.Base.prototype.disallow = L.Base.prototype.invalid, L.Base.prototype.equal = L.Base.prototype.valid, L.Base.prototype.exist = L.Base.prototype.required, L.Base.prototype.not = L.Base.prototype.invalid, L.Base.prototype.options = L.Base.prototype.prefs, L.Base.prototype.preferences = L.Base.prototype.prefs, $.exports = new L.Base();
        }, 8652: ($, m, v) => {
          const u = v(375), S = v(8571), g = v(8160), w = { max: 1e3, supported: /* @__PURE__ */ new Set(["undefined", "boolean", "number", "string"]) };
          m.provider = { provision: (a) => new w.Cache(a) }, w.Cache = class {
            constructor(a = {}) {
              g.assertOptions(a, ["max"]), u(a.max === void 0 || a.max && a.max > 0 && isFinite(a.max), "Invalid max cache size"), this._max = a.max || w.max, this._map = /* @__PURE__ */ new Map(), this._list = new w.List();
            }
            get length() {
              return this._map.size;
            }
            set(a, f) {
              if (a !== null && !w.supported.has(typeof a))
                return;
              let y = this._map.get(a);
              if (y)
                return y.value = f, void this._list.first(y);
              y = this._list.unshift({ key: a, value: f }), this._map.set(a, y), this._compact();
            }
            get(a) {
              const f = this._map.get(a);
              if (f)
                return this._list.first(f), S(f.value);
            }
            _compact() {
              if (this._map.size > this._max) {
                const a = this._list.pop();
                this._map.delete(a.key);
              }
            }
          }, w.List = class {
            constructor() {
              this.tail = null, this.head = null;
            }
            unshift(a) {
              return a.next = null, a.prev = this.head, this.head && (this.head.next = a), this.head = a, this.tail || (this.tail = a), a;
            }
            first(a) {
              a !== this.head && (this._remove(a), this.unshift(a));
            }
            pop() {
              return this._remove(this.tail);
            }
            _remove(a) {
              const { next: f, prev: y } = a;
              return f.prev = y, y && (y.next = f), a === this.tail && (this.tail = f), a.prev = null, a.next = null, a;
            }
          };
        }, 8160: ($, m, v) => {
          const u = v(375), S = v(7916), g = v(1238);
          let w, a;
          const f = { isoDate: /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/ };
          m.version = g.version, m.defaults = { abortEarly: !0, allowUnknown: !1, artifacts: !1, cache: !0, context: null, convert: !0, dateFormat: "iso", errors: { escapeHtml: !1, label: "path", language: null, render: !0, stack: !1, wrap: { label: '"', array: "[]" } }, externals: !0, messages: {}, nonEnumerables: !1, noDefaults: !1, presence: "optional", skipFunctions: !1, stripUnknown: !1, warnings: !1 }, m.symbols = { any: Symbol.for("@hapi/joi/schema"), arraySingle: Symbol("arraySingle"), deepDefault: Symbol("deepDefault"), errors: Symbol("errors"), literal: Symbol("literal"), override: Symbol("override"), parent: Symbol("parent"), prefs: Symbol("prefs"), ref: Symbol("ref"), template: Symbol("template"), values: Symbol("values") }, m.assertOptions = function(y, l, c = "Options") {
            u(y && typeof y == "object" && !Array.isArray(y), "Options must be of type object");
            const s = Object.keys(y).filter((b) => !l.includes(b));
            u(s.length === 0, "".concat(c, " contain unknown keys: ").concat(s));
          }, m.checkPreferences = function(y) {
            a = a || v(3378);
            const l = a.preferences.validate(y);
            if (l.error)
              throw new S([l.error.details[0].message]);
          }, m.compare = function(y, l, c) {
            switch (c) {
              case "=":
                return y === l;
              case ">":
                return y > l;
              case "<":
                return y < l;
              case ">=":
                return y >= l;
              case "<=":
                return y <= l;
            }
          }, m.default = function(y, l) {
            return y === void 0 ? l : y;
          }, m.isIsoDate = function(y) {
            return f.isoDate.test(y);
          }, m.isNumber = function(y) {
            return typeof y == "number" && !isNaN(y);
          }, m.isResolvable = function(y) {
            return !!y && (y[m.symbols.ref] || y[m.symbols.template]);
          }, m.isSchema = function(y, l = {}) {
            const c = y && y[m.symbols.any];
            return !!c && (u(l.legacy || c.version === m.version, "Cannot mix different versions of joi schemas"), !0);
          }, m.isValues = function(y) {
            return y[m.symbols.values];
          }, m.limit = function(y) {
            return Number.isSafeInteger(y) && y >= 0;
          }, m.preferences = function(y, l) {
            w = w || v(6914), y = y || {}, l = l || {};
            const c = Object.assign({}, y, l);
            return l.errors && y.errors && (c.errors = Object.assign({}, y.errors, l.errors), c.errors.wrap = Object.assign({}, y.errors.wrap, l.errors.wrap)), l.messages && (c.messages = w.compile(l.messages, y.messages)), delete c[m.symbols.prefs], c;
          }, m.tryWithPath = function(y, l, c = {}) {
            try {
              return y();
            } catch (s) {
              throw s.path !== void 0 ? s.path = l + "." + s.path : s.path = l, c.append && (s.message = "".concat(s.message, " (").concat(s.path, ")")), s;
            }
          }, m.validateArg = function(y, l, { assert: c, message: s }) {
            if (m.isSchema(c)) {
              const b = c.validate(y);
              return b.error ? b.error.message : void 0;
            }
            if (!c(y))
              return l ? "".concat(l, " ").concat(s) : s;
          }, m.verifyFlat = function(y, l) {
            for (const c of y)
              u(!Array.isArray(c), "Method no longer accepts array arguments:", l);
          };
        }, 3292: ($, m, v) => {
          const u = v(375), S = v(8160), g = v(6133), w = {};
          m.schema = function(a, f, y = {}) {
            S.assertOptions(y, ["appendPath", "override"]);
            try {
              return w.schema(a, f, y);
            } catch (l) {
              throw y.appendPath && l.path !== void 0 && (l.message = "".concat(l.message, " (").concat(l.path, ")")), l;
            }
          }, w.schema = function(a, f, y) {
            u(f !== void 0, "Invalid undefined schema"), Array.isArray(f) && (u(f.length, "Invalid empty array schema"), f.length === 1 && (f = f[0]));
            const l = (c, ...s) => y.override !== !1 ? c.valid(a.override, ...s) : c.valid(...s);
            if (w.simple(f))
              return l(a, f);
            if (typeof f == "function")
              return a.custom(f);
            if (u(typeof f == "object", "Invalid schema content:", typeof f), S.isResolvable(f))
              return l(a, f);
            if (S.isSchema(f))
              return f;
            if (Array.isArray(f)) {
              for (const c of f)
                if (!w.simple(c))
                  return a.alternatives().try(...f);
              return l(a, ...f);
            }
            return f instanceof RegExp ? a.string().regex(f) : f instanceof Date ? l(a.date(), f) : (u(Object.getPrototypeOf(f) === Object.getPrototypeOf({}), "Schema can only contain plain objects"), a.object().keys(f));
          }, m.ref = function(a, f) {
            return g.isRef(a) ? a : g.create(a, f);
          }, m.compile = function(a, f, y = {}) {
            S.assertOptions(y, ["legacy"]);
            const l = f && f[S.symbols.any];
            if (l)
              return u(y.legacy || l.version === S.version, "Cannot mix different versions of joi schemas:", l.version, S.version), f;
            if (typeof f != "object" || !y.legacy)
              return m.schema(a, f, { appendPath: !0 });
            const c = w.walk(f);
            return c ? c.compile(c.root, f) : m.schema(a, f, { appendPath: !0 });
          }, w.walk = function(a) {
            if (typeof a != "object")
              return null;
            if (Array.isArray(a)) {
              for (const y of a) {
                const l = w.walk(y);
                if (l)
                  return l;
              }
              return null;
            }
            const f = a[S.symbols.any];
            if (f)
              return { root: a[f.root], compile: f.compile };
            u(Object.getPrototypeOf(a) === Object.getPrototypeOf({}), "Schema can only contain plain objects");
            for (const y in a) {
              const l = w.walk(a[y]);
              if (l)
                return l;
            }
            return null;
          }, w.simple = function(a) {
            return a === null || ["boolean", "string", "number"].includes(typeof a);
          }, m.when = function(a, f, y) {
            if (y === void 0 && (u(f && typeof f == "object", "Missing options"), y = f, f = g.create(".")), Array.isArray(y) && (y = { switch: y }), S.assertOptions(y, ["is", "not", "then", "otherwise", "switch", "break"]), S.isSchema(f))
              return u(y.is === void 0, '"is" can not be used with a schema condition'), u(y.not === void 0, '"not" can not be used with a schema condition'), u(y.switch === void 0, '"switch" can not be used with a schema condition'), w.condition(a, { is: f, then: y.then, otherwise: y.otherwise, break: y.break });
            if (u(g.isRef(f) || typeof f == "string", "Invalid condition:", f), u(y.not === void 0 || y.is === void 0, 'Cannot combine "is" with "not"'), y.switch === void 0) {
              let c = y;
              y.not !== void 0 && (c = { is: y.not, then: y.otherwise, otherwise: y.then, break: y.break });
              let s = c.is !== void 0 ? a.$_compile(c.is) : a.$_root.invalid(null, !1, 0, "").required();
              return u(c.then !== void 0 || c.otherwise !== void 0, 'options must have at least one of "then", "otherwise", or "switch"'), u(c.break === void 0 || c.then === void 0 || c.otherwise === void 0, "Cannot specify then, otherwise, and break all together"), y.is === void 0 || g.isRef(y.is) || S.isSchema(y.is) || (s = s.required()), w.condition(a, { ref: m.ref(f), is: s, then: c.then, otherwise: c.otherwise, break: c.break });
            }
            u(Array.isArray(y.switch), '"switch" must be an array'), u(y.is === void 0, 'Cannot combine "switch" with "is"'), u(y.not === void 0, 'Cannot combine "switch" with "not"'), u(y.then === void 0, 'Cannot combine "switch" with "then"');
            const l = { ref: m.ref(f), switch: [], break: y.break };
            for (let c = 0; c < y.switch.length; ++c) {
              const s = y.switch[c], b = c === y.switch.length - 1;
              S.assertOptions(s, b ? ["is", "then", "otherwise"] : ["is", "then"]), u(s.is !== void 0, 'Switch statement missing "is"'), u(s.then !== void 0, 'Switch statement missing "then"');
              const h = { is: a.$_compile(s.is), then: a.$_compile(s.then) };
              if (g.isRef(s.is) || S.isSchema(s.is) || (h.is = h.is.required()), b) {
                u(y.otherwise === void 0 || s.otherwise === void 0, 'Cannot specify "otherwise" inside and outside a "switch"');
                const k = y.otherwise !== void 0 ? y.otherwise : s.otherwise;
                k !== void 0 && (u(l.break === void 0, "Cannot specify both otherwise and break"), h.otherwise = a.$_compile(k));
              }
              l.switch.push(h);
            }
            return l;
          }, w.condition = function(a, f) {
            for (const y of ["then", "otherwise"])
              f[y] === void 0 ? delete f[y] : f[y] = a.$_compile(f[y]);
            return f;
          };
        }, 6354: ($, m, v) => {
          const u = v(5688), S = v(8160), g = v(3328);
          m.Report = class {
            constructor(w, a, f, y, l, c, s) {
              if (this.code = w, this.flags = y, this.messages = l, this.path = c.path, this.prefs = s, this.state = c, this.value = a, this.message = null, this.template = null, this.local = f || {}, this.local.label = m.label(this.flags, this.state, this.prefs, this.messages), this.value === void 0 || this.local.hasOwnProperty("value") || (this.local.value = this.value), this.path.length) {
                const b = this.path[this.path.length - 1];
                typeof b != "object" && (this.local.key = b);
              }
            }
            _setTemplate(w) {
              if (this.template = w, !this.flags.label && this.path.length === 0) {
                const a = this._template(this.template, "root");
                a && (this.local.label = a);
              }
            }
            toString() {
              if (this.message)
                return this.message;
              const w = this.code;
              if (!this.prefs.errors.render)
                return this.code;
              const a = this._template(this.template) || this._template(this.prefs.messages) || this._template(this.messages);
              return a === void 0 ? 'Error code "'.concat(w, '" is not defined, your custom type is missing the correct messages definition') : (this.message = a.render(this.value, this.state, this.prefs, this.local, { errors: this.prefs.errors, messages: [this.prefs.messages, this.messages] }), this.prefs.errors.label || (this.message = this.message.replace(/^"" /, "").trim()), this.message);
            }
            _template(w, a) {
              return m.template(this.value, w, a || this.code, this.state, this.prefs);
            }
          }, m.path = function(w) {
            let a = "";
            for (const f of w)
              typeof f != "object" && (typeof f == "string" ? (a && (a += "."), a += f) : a += "[".concat(f, "]"));
            return a;
          }, m.template = function(w, a, f, y, l) {
            if (!a)
              return;
            if (g.isTemplate(a))
              return f !== "root" ? a : null;
            let c = l.errors.language;
            if (S.isResolvable(c) && (c = c.resolve(w, y, l)), c && a[c]) {
              if (a[c][f] !== void 0)
                return a[c][f];
              if (a[c]["*"] !== void 0)
                return a[c]["*"];
            }
            return a[f] ? a[f] : a["*"];
          }, m.label = function(w, a, f, y) {
            if (w.label)
              return w.label;
            if (!f.errors.label)
              return "";
            let l = a.path;
            return f.errors.label === "key" && a.path.length > 1 && (l = a.path.slice(-1)), m.path(l) || m.template(null, f.messages, "root", a, f) || y && m.template(null, y, "root", a, f) || "value";
          }, m.process = function(w, a, f) {
            if (!w)
              return null;
            const { override: y, message: l, details: c } = m.details(w);
            if (y)
              return y;
            if (f.errors.stack)
              return new m.ValidationError(l, c, a);
            const s = Error.stackTraceLimit;
            Error.stackTraceLimit = 0;
            const b = new m.ValidationError(l, c, a);
            return Error.stackTraceLimit = s, b;
          }, m.details = function(w, a = {}) {
            let f = [];
            const y = [];
            for (const l of w) {
              if (l instanceof Error) {
                if (a.override !== !1)
                  return { override: l };
                const s = l.toString();
                f.push(s), y.push({ message: s, type: "override", context: { error: l } });
                continue;
              }
              const c = l.toString();
              f.push(c), y.push({ message: c, path: l.path.filter((s) => typeof s != "object"), type: l.code, context: l.local });
            }
            return f.length > 1 && (f = [...new Set(f)]), { message: f.join(". "), details: y };
          }, m.ValidationError = class extends Error {
            constructor(w, a, f) {
              super(w), this._original = f, this.details = a;
            }
            static isError(w) {
              return w instanceof m.ValidationError;
            }
          }, m.ValidationError.prototype.isJoi = !0, m.ValidationError.prototype.name = "ValidationError", m.ValidationError.prototype.annotate = u.error;
        }, 8901: ($, m, v) => {
          const u = v(375), S = v(8571), g = v(8160), w = v(6914), a = {};
          m.type = function(f, y) {
            const l = Object.getPrototypeOf(f), c = S(l), s = f._assign(Object.create(c)), b = Object.assign({}, y);
            delete b.base, c._definition = b;
            const h = l._definition || {};
            b.messages = w.merge(h.messages, b.messages), b.properties = Object.assign({}, h.properties, b.properties), s.type = b.type, b.flags = Object.assign({}, h.flags, b.flags);
            const k = Object.assign({}, h.terms);
            if (b.terms)
              for (const L in b.terms) {
                const x = b.terms[L];
                u(s.$_terms[L] === void 0, "Invalid term override for", b.type, L), s.$_terms[L] = x.init, k[L] = x;
              }
            b.terms = k, b.args || (b.args = h.args), b.prepare = a.prepare(b.prepare, h.prepare), b.coerce && (typeof b.coerce == "function" && (b.coerce = { method: b.coerce }), b.coerce.from && !Array.isArray(b.coerce.from) && (b.coerce = { method: b.coerce.method, from: [].concat(b.coerce.from) })), b.coerce = a.coerce(b.coerce, h.coerce), b.validate = a.validate(b.validate, h.validate);
            const d = Object.assign({}, h.rules);
            if (b.rules)
              for (const L in b.rules) {
                const x = b.rules[L];
                u(typeof x == "object", "Invalid rule definition for", b.type, L);
                let T = x.method;
                if (T === void 0 && (T = function() {
                  return this.$_addRule(L);
                }), T && (u(!c[L], "Rule conflict in", b.type, L), c[L] = T), u(!d[L], "Rule conflict in", b.type, L), d[L] = x, x.alias) {
                  const N = [].concat(x.alias);
                  for (const Y of N)
                    c[Y] = x.method;
                }
                x.args && (x.argsByName = /* @__PURE__ */ new Map(), x.args = x.args.map((N) => (typeof N == "string" && (N = { name: N }), u(!x.argsByName.has(N.name), "Duplicated argument name", N.name), g.isSchema(N.assert) && (N.assert = N.assert.strict().label(N.name)), x.argsByName.set(N.name, N), N)));
              }
            b.rules = d;
            const O = Object.assign({}, h.modifiers);
            if (b.modifiers)
              for (const L in b.modifiers) {
                u(!c[L], "Rule conflict in", b.type, L);
                const x = b.modifiers[L];
                u(typeof x == "function", "Invalid modifier definition for", b.type, L);
                const T = function(N) {
                  return this.rule({ [L]: N });
                };
                c[L] = T, O[L] = x;
              }
            if (b.modifiers = O, b.overrides) {
              c._super = l, s.$_super = {};
              for (const L in b.overrides)
                u(l[L], "Cannot override missing", L), b.overrides[L][g.symbols.parent] = l[L], s.$_super[L] = l[L].bind(s);
              Object.assign(c, b.overrides);
            }
            b.cast = Object.assign({}, h.cast, b.cast);
            const M = Object.assign({}, h.manifest, b.manifest);
            return M.build = a.build(b.manifest && b.manifest.build, h.manifest && h.manifest.build), b.manifest = M, b.rebuild = a.rebuild(b.rebuild, h.rebuild), s;
          }, a.build = function(f, y) {
            return f && y ? function(l, c) {
              return y(f(l, c), c);
            } : f || y;
          }, a.coerce = function(f, y) {
            return f && y ? { from: f.from && y.from ? [.../* @__PURE__ */ new Set([...f.from, ...y.from])] : null, method(l, c) {
              let s;
              if ((!y.from || y.from.includes(typeof l)) && (s = y.method(l, c), s)) {
                if (s.errors || s.value === void 0)
                  return s;
                l = s.value;
              }
              if (!f.from || f.from.includes(typeof l)) {
                const b = f.method(l, c);
                if (b)
                  return b;
              }
              return s;
            } } : f || y;
          }, a.prepare = function(f, y) {
            return f && y ? function(l, c) {
              const s = f(l, c);
              if (s) {
                if (s.errors || s.value === void 0)
                  return s;
                l = s.value;
              }
              return y(l, c) || s;
            } : f || y;
          }, a.rebuild = function(f, y) {
            return f && y ? function(l) {
              y(l), f(l);
            } : f || y;
          }, a.validate = function(f, y) {
            return f && y ? function(l, c) {
              const s = y(l, c);
              if (s) {
                if (s.errors && (!Array.isArray(s.errors) || s.errors.length))
                  return s;
                l = s.value;
              }
              return f(l, c) || s;
            } : f || y;
          };
        }, 5107: ($, m, v) => {
          const u = v(375), S = v(8571), g = v(8652), w = v(8160), a = v(3292), f = v(6354), y = v(8901), l = v(9708), c = v(6133), s = v(3328), b = v(1152);
          let h;
          const k = { types: { alternatives: v(4946), any: v(8068), array: v(546), boolean: v(4937), date: v(7500), function: v(390), link: v(8785), number: v(3832), object: v(8966), string: v(7417), symbol: v(8826) }, aliases: { alt: "alternatives", bool: "boolean", func: "function" }, root: function() {
            const d = { _types: new Set(Object.keys(k.types)) };
            for (const O of d._types)
              d[O] = function(...M) {
                return u(!M.length || ["alternatives", "link", "object"].includes(O), "The", O, "type does not allow arguments"), k.generate(this, k.types[O], M);
              };
            for (const O of ["allow", "custom", "disallow", "equal", "exist", "forbidden", "invalid", "not", "only", "optional", "options", "prefs", "preferences", "required", "strip", "valid", "when"])
              d[O] = function(...M) {
                return this.any()[O](...M);
              };
            Object.assign(d, k.methods);
            for (const O in k.aliases) {
              const M = k.aliases[O];
              d[O] = d[M];
            }
            return d.x = d.expression, b.setup && b.setup(d), d;
          } };
          k.methods = { ValidationError: f.ValidationError, version: w.version, cache: g.provider, assert(d, O, ...M) {
            k.assert(d, O, !0, M);
          }, attempt: (d, O, ...M) => k.assert(d, O, !1, M), build(d) {
            return u(typeof l.build == "function", "Manifest functionality disabled"), l.build(this, d);
          }, checkPreferences(d) {
            w.checkPreferences(d);
          }, compile(d, O) {
            return a.compile(this, d, O);
          }, defaults(d) {
            u(typeof d == "function", "modifier must be a function");
            const O = Object.assign({}, this);
            for (const M of O._types) {
              const L = d(O[M]());
              u(w.isSchema(L), "modifier must return a valid schema object"), O[M] = function(...x) {
                return k.generate(this, L, x);
              };
            }
            return O;
          }, expression: (...d) => new s(...d), extend(...d) {
            w.verifyFlat(d, "extend"), h = h || v(3378), u(d.length, "You need to provide at least one extension"), this.assert(d, h.extensions);
            const O = Object.assign({}, this);
            O._types = new Set(O._types);
            for (let M of d) {
              typeof M == "function" && (M = M(O)), this.assert(M, h.extension);
              const L = k.expandExtension(M, O);
              for (const x of L) {
                u(O[x.type] === void 0 || O._types.has(x.type), "Cannot override name", x.type);
                const T = x.base || this.any(), N = y.type(T, x);
                O._types.add(x.type), O[x.type] = function(...Y) {
                  return k.generate(this, N, Y);
                };
              }
            }
            return O;
          }, isError: f.ValidationError.isError, isExpression: s.isTemplate, isRef: c.isRef, isSchema: w.isSchema, in: (...d) => c.in(...d), override: w.symbols.override, ref: (...d) => c.create(...d), types() {
            const d = {};
            for (const O of this._types)
              d[O] = this[O]();
            for (const O in k.aliases)
              d[O] = this[O]();
            return d;
          } }, k.assert = function(d, O, M, L) {
            const x = L[0] instanceof Error || typeof L[0] == "string" ? L[0] : null, T = x ? L[1] : L[0], N = O.validate(d, w.preferences({ errors: { stack: !0 } }, T || {}));
            let Y = N.error;
            if (!Y)
              return N.value;
            if (x instanceof Error)
              throw x;
            const ot = M && typeof Y.annotate == "function" ? Y.annotate() : Y.message;
            throw Y instanceof f.ValidationError == 0 && (Y = S(Y)), Y.message = x ? "".concat(x, " ").concat(ot) : ot, Y;
          }, k.generate = function(d, O, M) {
            return u(d, "Must be invoked on a Joi instance."), O.$_root = d, O._definition.args && M.length ? O._definition.args(O, ...M) : O;
          }, k.expandExtension = function(d, O) {
            if (typeof d.type == "string")
              return [d];
            const M = [];
            for (const L of O._types)
              if (d.type.test(L)) {
                const x = Object.assign({}, d);
                x.type = L, x.base = O[L](), M.push(x);
              }
            return M;
          }, $.exports = k.root();
        }, 6914: ($, m, v) => {
          const u = v(375), S = v(8571), g = v(3328);
          m.compile = function(w, a) {
            if (typeof w == "string")
              return u(!a, "Cannot set single message string"), new g(w);
            if (g.isTemplate(w))
              return u(!a, "Cannot set single message template"), w;
            u(typeof w == "object" && !Array.isArray(w), "Invalid message options"), a = a ? S(a) : {};
            for (let f in w) {
              const y = w[f];
              if (f === "root" || g.isTemplate(y)) {
                a[f] = y;
                continue;
              }
              if (typeof y == "string") {
                a[f] = new g(y);
                continue;
              }
              u(typeof y == "object" && !Array.isArray(y), "Invalid message for", f);
              const l = f;
              for (f in a[l] = a[l] || {}, y) {
                const c = y[f];
                f === "root" || g.isTemplate(c) ? a[l][f] = c : (u(typeof c == "string", "Invalid message for", f, "in", l), a[l][f] = new g(c));
              }
            }
            return a;
          }, m.decompile = function(w) {
            const a = {};
            for (let f in w) {
              const y = w[f];
              if (f === "root") {
                a.root = y;
                continue;
              }
              if (g.isTemplate(y)) {
                a[f] = y.describe({ compact: !0 });
                continue;
              }
              const l = f;
              for (f in a[l] = {}, y) {
                const c = y[f];
                f !== "root" ? a[l][f] = c.describe({ compact: !0 }) : a[l].root = c;
              }
            }
            return a;
          }, m.merge = function(w, a) {
            if (!w)
              return m.compile(a);
            if (!a)
              return w;
            if (typeof a == "string")
              return new g(a);
            if (g.isTemplate(a))
              return a;
            const f = S(w);
            for (let y in a) {
              const l = a[y];
              if (y === "root" || g.isTemplate(l)) {
                f[y] = l;
                continue;
              }
              if (typeof l == "string") {
                f[y] = new g(l);
                continue;
              }
              u(typeof l == "object" && !Array.isArray(l), "Invalid message for", y);
              const c = y;
              for (y in f[c] = f[c] || {}, l) {
                const s = l[y];
                y === "root" || g.isTemplate(s) ? f[c][y] = s : (u(typeof s == "string", "Invalid message for", y, "in", c), f[c][y] = new g(s));
              }
            }
            return f;
          };
        }, 2294: ($, m, v) => {
          function u(l, c) {
            var s = Object.keys(l);
            if (Object.getOwnPropertySymbols) {
              var b = Object.getOwnPropertySymbols(l);
              c && (b = b.filter(function(h) {
                return Object.getOwnPropertyDescriptor(l, h).enumerable;
              })), s.push.apply(s, b);
            }
            return s;
          }
          function S(l) {
            for (var c = 1; c < arguments.length; c++) {
              var s = arguments[c] != null ? arguments[c] : {};
              c % 2 ? u(Object(s), !0).forEach(function(b) {
                g(l, b, s[b]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(l, Object.getOwnPropertyDescriptors(s)) : u(Object(s)).forEach(function(b) {
                Object.defineProperty(l, b, Object.getOwnPropertyDescriptor(s, b));
              });
            }
            return l;
          }
          function g(l, c, s) {
            return c in l ? Object.defineProperty(l, c, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : l[c] = s, l;
          }
          const w = v(375), a = v(8160), f = v(6133), y = {};
          m.Ids = y.Ids = class {
            constructor() {
              this._byId = /* @__PURE__ */ new Map(), this._byKey = /* @__PURE__ */ new Map(), this._schemaChain = !1;
            }
            clone() {
              const l = new y.Ids();
              return l._byId = new Map(this._byId), l._byKey = new Map(this._byKey), l._schemaChain = this._schemaChain, l;
            }
            concat(l) {
              l._schemaChain && (this._schemaChain = !0);
              for (const [c, s] of l._byId.entries())
                w(!this._byKey.has(c), "Schema id conflicts with existing key:", c), this._byId.set(c, s);
              for (const [c, s] of l._byKey.entries())
                w(!this._byId.has(c), "Schema key conflicts with existing id:", c), this._byKey.set(c, s);
            }
            fork(l, c, s) {
              const b = this._collect(l);
              b.push({ schema: s });
              const h = b.shift();
              let k = { id: h.id, schema: c(h.schema) };
              w(a.isSchema(k.schema), "adjuster function failed to return a joi schema type");
              for (const d of b)
                k = { id: d.id, schema: y.fork(d.schema, k.id, k.schema) };
              return k.schema;
            }
            labels(l, c = []) {
              const s = l[0], b = this._get(s);
              if (!b)
                return [...c, ...l].join(".");
              const h = l.slice(1);
              return c = [...c, b.schema._flags.label || s], h.length ? b.schema._ids.labels(h, c) : c.join(".");
            }
            reach(l, c = []) {
              const s = l[0], b = this._get(s);
              w(b, "Schema does not contain path", [...c, ...l].join("."));
              const h = l.slice(1);
              return h.length ? b.schema._ids.reach(h, [...c, s]) : b.schema;
            }
            register(l, { key: c } = {}) {
              if (!l || !a.isSchema(l))
                return;
              (l.$_property("schemaChain") || l._ids._schemaChain) && (this._schemaChain = !0);
              const s = l._flags.id;
              if (s) {
                const b = this._byId.get(s);
                w(!b || b.schema === l, "Cannot add different schemas with the same id:", s), w(!this._byKey.has(s), "Schema id conflicts with existing key:", s), this._byId.set(s, { schema: l, id: s });
              }
              c && (w(!this._byKey.has(c), "Schema already contains key:", c), w(!this._byId.has(c), "Schema key conflicts with existing id:", c), this._byKey.set(c, { schema: l, id: c }));
            }
            reset() {
              this._byId = /* @__PURE__ */ new Map(), this._byKey = /* @__PURE__ */ new Map(), this._schemaChain = !1;
            }
            _collect(l, c = [], s = []) {
              const b = l[0], h = this._get(b);
              w(h, "Schema does not contain path", [...c, ...l].join(".")), s = [h, ...s];
              const k = l.slice(1);
              return k.length ? h.schema._ids._collect(k, [...c, b], s) : s;
            }
            _get(l) {
              return this._byId.get(l) || this._byKey.get(l);
            }
          }, y.fork = function(l, c, s) {
            const b = m.schema(l, { each: (h, { key: k }) => {
              if (c === (h._flags.id || k))
                return s;
            }, ref: !1 });
            return b ? b.$_mutateRebuild() : l;
          }, m.schema = function(l, c) {
            let s;
            for (const b in l._flags) {
              if (b[0] === "_")
                continue;
              const h = y.scan(l._flags[b], { source: "flags", name: b }, c);
              h !== void 0 && (s = s || l.clone(), s._flags[b] = h);
            }
            for (let b = 0; b < l._rules.length; ++b) {
              const h = l._rules[b], k = y.scan(h.args, { source: "rules", name: h.name }, c);
              if (k !== void 0) {
                s = s || l.clone();
                const d = Object.assign({}, h);
                d.args = k, s._rules[b] = d, s._singleRules.get(h.name) === h && s._singleRules.set(h.name, d);
              }
            }
            for (const b in l.$_terms) {
              if (b[0] === "_")
                continue;
              const h = y.scan(l.$_terms[b], { source: "terms", name: b }, c);
              h !== void 0 && (s = s || l.clone(), s.$_terms[b] = h);
            }
            return s;
          }, y.scan = function(l, c, s, b, h) {
            const k = b || [];
            if (l === null || typeof l != "object")
              return;
            let d;
            if (Array.isArray(l)) {
              for (let O = 0; O < l.length; ++O) {
                const M = c.source === "terms" && c.name === "keys" && l[O].key, L = y.scan(l[O], c, s, [O, ...k], M);
                L !== void 0 && (d = d || l.slice(), d[O] = L);
              }
              return d;
            }
            if (s.schema !== !1 && a.isSchema(l) || s.ref !== !1 && f.isRef(l)) {
              const O = s.each(l, S(S({}, c), {}, { path: k, key: h }));
              return O === l ? void 0 : O;
            }
            for (const O in l) {
              if (O[0] === "_")
                continue;
              const M = y.scan(l[O], c, s, [O, ...k], h);
              M !== void 0 && (d = d || Object.assign({}, l), d[O] = M);
            }
            return d;
          };
        }, 6133: ($, m, v) => {
          function u(s, b) {
            var h = Object.keys(s);
            if (Object.getOwnPropertySymbols) {
              var k = Object.getOwnPropertySymbols(s);
              b && (k = k.filter(function(d) {
                return Object.getOwnPropertyDescriptor(s, d).enumerable;
              })), h.push.apply(h, k);
            }
            return h;
          }
          function S(s) {
            for (var b = 1; b < arguments.length; b++) {
              var h = arguments[b] != null ? arguments[b] : {};
              b % 2 ? u(Object(h), !0).forEach(function(k) {
                g(s, k, h[k]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(h)) : u(Object(h)).forEach(function(k) {
                Object.defineProperty(s, k, Object.getOwnPropertyDescriptor(h, k));
              });
            }
            return s;
          }
          function g(s, b, h) {
            return b in s ? Object.defineProperty(s, b, { value: h, enumerable: !0, configurable: !0, writable: !0 }) : s[b] = h, s;
          }
          const w = v(375), a = v(8571), f = v(9621), y = v(8160);
          let l;
          const c = { symbol: Symbol("ref"), defaults: { adjust: null, in: !1, iterables: null, map: null, separator: ".", type: "value" } };
          m.create = function(s, b = {}) {
            w(typeof s == "string", "Invalid reference key:", s), y.assertOptions(b, ["adjust", "ancestor", "in", "iterables", "map", "prefix", "render", "separator"]), w(!b.prefix || typeof b.prefix == "object", "options.prefix must be of type object");
            const h = Object.assign({}, c.defaults, b);
            delete h.prefix;
            const k = h.separator, d = c.context(s, k, b.prefix);
            if (h.type = d.type, s = d.key, h.type === "value")
              if (d.root && (w(!k || s[0] !== k, "Cannot specify relative path with root prefix"), h.ancestor = "root", s || (s = null)), k && k === s)
                s = null, h.ancestor = 0;
              else if (h.ancestor !== void 0)
                w(!k || !s || s[0] !== k, "Cannot combine prefix with ancestor option");
              else {
                const [O, M] = c.ancestor(s, k);
                M && (s = s.slice(M)) === "" && (s = null), h.ancestor = O;
              }
            return h.path = k ? s === null ? [] : s.split(k) : [s], new c.Ref(h);
          }, m.in = function(s, b = {}) {
            return m.create(s, S(S({}, b), {}, { in: !0 }));
          }, m.isRef = function(s) {
            return !!s && !!s[y.symbols.ref];
          }, c.Ref = class {
            constructor(s) {
              w(typeof s == "object", "Invalid reference construction"), y.assertOptions(s, ["adjust", "ancestor", "in", "iterables", "map", "path", "render", "separator", "type", "depth", "key", "root", "display"]), w([!1, void 0].includes(s.separator) || typeof s.separator == "string" && s.separator.length === 1, "Invalid separator"), w(!s.adjust || typeof s.adjust == "function", "options.adjust must be a function"), w(!s.map || Array.isArray(s.map), "options.map must be an array"), w(!s.map || !s.adjust, "Cannot set both map and adjust options"), Object.assign(this, c.defaults, s), w(this.type === "value" || this.ancestor === void 0, "Non-value references cannot reference ancestors"), Array.isArray(this.map) && (this.map = new Map(this.map)), this.depth = this.path.length, this.key = this.path.length ? this.path.join(this.separator) : null, this.root = this.path[0], this.updateDisplay();
            }
            resolve(s, b, h, k, d = {}) {
              return w(!this.in || d.in, "Invalid in() reference usage"), this.type === "global" ? this._resolve(h.context, b, d) : this.type === "local" ? this._resolve(k, b, d) : this.ancestor ? this.ancestor === "root" ? this._resolve(b.ancestors[b.ancestors.length - 1], b, d) : (w(this.ancestor <= b.ancestors.length, "Invalid reference exceeds the schema root:", this.display), this._resolve(b.ancestors[this.ancestor - 1], b, d)) : this._resolve(s, b, d);
            }
            _resolve(s, b, h) {
              let k;
              if (this.type === "value" && b.mainstay.shadow && h.shadow !== !1 && (k = b.mainstay.shadow.get(this.absolute(b))), k === void 0 && (k = f(s, this.path, { iterables: this.iterables, functions: !0 })), this.adjust && (k = this.adjust(k)), this.map) {
                const d = this.map.get(k);
                d !== void 0 && (k = d);
              }
              return b.mainstay && b.mainstay.tracer.resolve(b, this, k), k;
            }
            toString() {
              return this.display;
            }
            absolute(s) {
              return [...s.path.slice(0, -this.ancestor), ...this.path];
            }
            clone() {
              return new c.Ref(this);
            }
            describe() {
              const s = { path: this.path };
              this.type !== "value" && (s.type = this.type), this.separator !== "." && (s.separator = this.separator), this.type === "value" && this.ancestor !== 1 && (s.ancestor = this.ancestor), this.map && (s.map = [...this.map]);
              for (const b of ["adjust", "iterables", "render"])
                this[b] !== null && this[b] !== void 0 && (s[b] = this[b]);
              return this.in !== !1 && (s.in = !0), { ref: s };
            }
            updateDisplay() {
              const s = this.key !== null ? this.key : "";
              if (this.type !== "value")
                return void (this.display = "ref:".concat(this.type, ":").concat(s));
              if (!this.separator)
                return void (this.display = "ref:".concat(s));
              if (!this.ancestor)
                return void (this.display = "ref:".concat(this.separator).concat(s));
              if (this.ancestor === "root")
                return void (this.display = "ref:root:".concat(s));
              if (this.ancestor === 1)
                return void (this.display = "ref:".concat(s || ".."));
              const b = new Array(this.ancestor + 1).fill(this.separator).join("");
              this.display = "ref:".concat(b).concat(s || "");
            }
          }, c.Ref.prototype[y.symbols.ref] = !0, m.build = function(s) {
            return (s = Object.assign({}, c.defaults, s)).type === "value" && s.ancestor === void 0 && (s.ancestor = 1), new c.Ref(s);
          }, c.context = function(s, b, h = {}) {
            if (s = s.trim(), h) {
              const k = h.global === void 0 ? "$" : h.global;
              if (k !== b && s.startsWith(k))
                return { key: s.slice(k.length), type: "global" };
              const d = h.local === void 0 ? "#" : h.local;
              if (d !== b && s.startsWith(d))
                return { key: s.slice(d.length), type: "local" };
              const O = h.root === void 0 ? "/" : h.root;
              if (O !== b && s.startsWith(O))
                return { key: s.slice(O.length), type: "value", root: !0 };
            }
            return { key: s, type: "value" };
          }, c.ancestor = function(s, b) {
            if (!b)
              return [1, 0];
            if (s[0] !== b)
              return [1, 0];
            if (s[1] !== b)
              return [0, 1];
            let h = 2;
            for (; s[h] === b; )
              ++h;
            return [h - 1, h];
          }, m.toSibling = 0, m.toParent = 1, m.Manager = class {
            constructor() {
              this.refs = [];
            }
            register(s, b) {
              if (s)
                if (b = b === void 0 ? m.toParent : b, Array.isArray(s))
                  for (const h of s)
                    this.register(h, b);
                else if (y.isSchema(s))
                  for (const h of s._refs.refs)
                    h.ancestor - b >= 0 && this.refs.push({ ancestor: h.ancestor - b, root: h.root });
                else
                  m.isRef(s) && s.type === "value" && s.ancestor - b >= 0 && this.refs.push({ ancestor: s.ancestor - b, root: s.root }), l = l || v(3328), l.isTemplate(s) && this.register(s.refs(), b);
            }
            get length() {
              return this.refs.length;
            }
            clone() {
              const s = new m.Manager();
              return s.refs = a(this.refs), s;
            }
            reset() {
              this.refs = [];
            }
            roots() {
              return this.refs.filter((s) => !s.ancestor).map((s) => s.root);
            }
          };
        }, 3378: ($, m, v) => {
          const u = v(5107), S = {};
          S.wrap = u.string().min(1).max(2).allow(!1), m.preferences = u.object({ allowUnknown: u.boolean(), abortEarly: u.boolean(), artifacts: u.boolean(), cache: u.boolean(), context: u.object(), convert: u.boolean(), dateFormat: u.valid("date", "iso", "string", "time", "utc"), debug: u.boolean(), errors: { escapeHtml: u.boolean(), label: u.valid("path", "key", !1), language: [u.string(), u.object().ref()], render: u.boolean(), stack: u.boolean(), wrap: { label: S.wrap, array: S.wrap, string: S.wrap } }, externals: u.boolean(), messages: u.object(), noDefaults: u.boolean(), nonEnumerables: u.boolean(), presence: u.valid("required", "optional", "forbidden"), skipFunctions: u.boolean(), stripUnknown: u.object({ arrays: u.boolean(), objects: u.boolean() }).or("arrays", "objects").allow(!0, !1), warnings: u.boolean() }).strict(), S.nameRx = /^[a-zA-Z0-9]\w*$/, S.rule = u.object({ alias: u.array().items(u.string().pattern(S.nameRx)).single(), args: u.array().items(u.string(), u.object({ name: u.string().pattern(S.nameRx).required(), ref: u.boolean(), assert: u.alternatives([u.function(), u.object().schema()]).conditional("ref", { is: !0, then: u.required() }), normalize: u.function(), message: u.string().when("assert", { is: u.function(), then: u.required() }) })), convert: u.boolean(), manifest: u.boolean(), method: u.function().allow(!1), multi: u.boolean(), validate: u.function() }), m.extension = u.object({ type: u.alternatives([u.string(), u.object().regex()]).required(), args: u.function(), cast: u.object().pattern(S.nameRx, u.object({ from: u.function().maxArity(1).required(), to: u.function().minArity(1).maxArity(2).required() })), base: u.object().schema().when("type", { is: u.object().regex(), then: u.forbidden() }), coerce: [u.function().maxArity(3), u.object({ method: u.function().maxArity(3).required(), from: u.array().items(u.string()).single() })], flags: u.object().pattern(S.nameRx, u.object({ setter: u.string(), default: u.any() })), manifest: { build: u.function().arity(2) }, messages: [u.object(), u.string()], modifiers: u.object().pattern(S.nameRx, u.function().minArity(1).maxArity(2)), overrides: u.object().pattern(S.nameRx, u.function()), prepare: u.function().maxArity(3), rebuild: u.function().arity(1), rules: u.object().pattern(S.nameRx, S.rule), terms: u.object().pattern(S.nameRx, u.object({ init: u.array().allow(null).required(), manifest: u.object().pattern(/.+/, [u.valid("schema", "single"), u.object({ mapped: u.object({ from: u.string().required(), to: u.string().required() }).required() })]) })), validate: u.function().maxArity(3) }).strict(), m.extensions = u.array().items(u.object(), u.function().arity(1)).strict(), S.desc = { buffer: u.object({ buffer: u.string() }), func: u.object({ function: u.function().required(), options: { literal: !0 } }), override: u.object({ override: !0 }), ref: u.object({ ref: u.object({ type: u.valid("value", "global", "local"), path: u.array().required(), separator: u.string().length(1).allow(!1), ancestor: u.number().min(0).integer().allow("root"), map: u.array().items(u.array().length(2)).min(1), adjust: u.function(), iterables: u.boolean(), in: u.boolean(), render: u.boolean() }).required() }), regex: u.object({ regex: u.string().min(3) }), special: u.object({ special: u.valid("deep").required() }), template: u.object({ template: u.string().required(), options: u.object() }), value: u.object({ value: u.alternatives([u.object(), u.array()]).required() }) }, S.desc.entity = u.alternatives([u.array().items(u.link("...")), u.boolean(), u.function(), u.number(), u.string(), S.desc.buffer, S.desc.func, S.desc.ref, S.desc.regex, S.desc.special, S.desc.template, S.desc.value, u.link("/")]), S.desc.values = u.array().items(null, u.boolean(), u.function(), u.number().allow(1 / 0, -1 / 0), u.string().allow(""), u.symbol(), S.desc.buffer, S.desc.func, S.desc.override, S.desc.ref, S.desc.regex, S.desc.template, S.desc.value), S.desc.messages = u.object().pattern(/.+/, [u.string(), S.desc.template, u.object().pattern(/.+/, [u.string(), S.desc.template])]), m.description = u.object({ type: u.string().required(), flags: u.object({ cast: u.string(), default: u.any(), description: u.string(), empty: u.link("/"), failover: S.desc.entity, id: u.string(), label: u.string(), only: !0, presence: ["optional", "required", "forbidden"], result: ["raw", "strip"], strip: u.boolean(), unit: u.string() }).unknown(), preferences: { allowUnknown: u.boolean(), abortEarly: u.boolean(), artifacts: u.boolean(), cache: u.boolean(), convert: u.boolean(), dateFormat: ["date", "iso", "string", "time", "utc"], errors: { escapeHtml: u.boolean(), label: ["path", "key"], language: [u.string(), S.desc.ref], wrap: { label: S.wrap, array: S.wrap } }, externals: u.boolean(), messages: S.desc.messages, noDefaults: u.boolean(), nonEnumerables: u.boolean(), presence: ["required", "optional", "forbidden"], skipFunctions: u.boolean(), stripUnknown: u.object({ arrays: u.boolean(), objects: u.boolean() }).or("arrays", "objects").allow(!0, !1), warnings: u.boolean() }, allow: S.desc.values, invalid: S.desc.values, rules: u.array().min(1).items({ name: u.string().required(), args: u.object().min(1), keep: u.boolean(), message: [u.string(), S.desc.messages], warn: u.boolean() }), keys: u.object().pattern(/.*/, u.link("/")), link: S.desc.ref }).pattern(/^[a-z]\w*$/, u.any());
        }, 493: ($, m, v) => {
          const u = v(8571), S = v(9621), g = v(8160), w = { value: Symbol("value") };
          $.exports = w.State = class {
            constructor(a, f, y) {
              this.path = a, this.ancestors = f, this.mainstay = y.mainstay, this.schemas = y.schemas, this.debug = null;
            }
            localize(a, f = null, y = null) {
              const l = new w.State(a, f, this);
              return y && l.schemas && (l.schemas = [w.schemas(y), ...l.schemas]), l;
            }
            nest(a, f) {
              const y = new w.State(this.path, this.ancestors, this);
              return y.schemas = y.schemas && [w.schemas(a), ...y.schemas], y.debug = f, y;
            }
            shadow(a, f) {
              this.mainstay.shadow = this.mainstay.shadow || new w.Shadow(), this.mainstay.shadow.set(this.path, a, f);
            }
            snapshot() {
              this.mainstay.shadow && (this._snapshot = u(this.mainstay.shadow.node(this.path)));
            }
            restore() {
              this.mainstay.shadow && (this.mainstay.shadow.override(this.path, this._snapshot), this._snapshot = void 0);
            }
          }, w.schemas = function(a) {
            return g.isSchema(a) ? { schema: a } : a;
          }, w.Shadow = class {
            constructor() {
              this._values = null;
            }
            set(a, f, y) {
              if (!a.length || y === "strip" && typeof a[a.length - 1] == "number")
                return;
              this._values = this._values || /* @__PURE__ */ new Map();
              let l = this._values;
              for (let c = 0; c < a.length; ++c) {
                const s = a[c];
                let b = l.get(s);
                b || (b = /* @__PURE__ */ new Map(), l.set(s, b)), l = b;
              }
              l[w.value] = f;
            }
            get(a) {
              const f = this.node(a);
              if (f)
                return f[w.value];
            }
            node(a) {
              if (this._values)
                return S(this._values, a, { iterables: !0 });
            }
            override(a, f) {
              if (!this._values)
                return;
              const y = a.slice(0, -1), l = a[a.length - 1], c = S(this._values, y, { iterables: !0 });
              f ? c.set(l, f) : c && c.delete(l);
            }
          };
        }, 3328: ($, m, v) => {
          function u(h, k) {
            var d = Object.keys(h);
            if (Object.getOwnPropertySymbols) {
              var O = Object.getOwnPropertySymbols(h);
              k && (O = O.filter(function(M) {
                return Object.getOwnPropertyDescriptor(h, M).enumerable;
              })), d.push.apply(d, O);
            }
            return d;
          }
          function S(h) {
            for (var k = 1; k < arguments.length; k++) {
              var d = arguments[k] != null ? arguments[k] : {};
              k % 2 ? u(Object(d), !0).forEach(function(O) {
                g(h, O, d[O]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(h, Object.getOwnPropertyDescriptors(d)) : u(Object(d)).forEach(function(O) {
                Object.defineProperty(h, O, Object.getOwnPropertyDescriptor(d, O));
              });
            }
            return h;
          }
          function g(h, k, d) {
            return k in h ? Object.defineProperty(h, k, { value: d, enumerable: !0, configurable: !0, writable: !0 }) : h[k] = d, h;
          }
          const w = v(375), a = v(8571), f = v(5277), y = v(1447), l = v(8160), c = v(6354), s = v(6133), b = { symbol: Symbol("template"), opens: new Array(1e3).join("\0"), closes: new Array(1e3).join(""), dateFormat: { date: Date.prototype.toDateString, iso: Date.prototype.toISOString, string: Date.prototype.toString, time: Date.prototype.toTimeString, utc: Date.prototype.toUTCString } };
          $.exports = b.Template = class {
            constructor(h, k) {
              w(typeof h == "string", "Template source must be a string"), w(!h.includes("\0") && !h.includes(""), "Template source cannot contain reserved control characters"), this.source = h, this.rendered = h, this._template = null, this._settings = a(k), this._parse();
            }
            _parse() {
              if (!this.source.includes("{"))
                return;
              const h = b.encode(this.source), k = b.split(h);
              let d = !1;
              const O = [], M = k.shift();
              M && O.push(M);
              for (const L of k) {
                const x = L[0] !== "{", T = x ? "}" : "}}", N = L.indexOf(T);
                if (N === -1 || L[1] === "{") {
                  O.push("{".concat(b.decode(L)));
                  continue;
                }
                let Y = L.slice(x ? 0 : 1, N);
                const ot = Y[0] === ":";
                ot && (Y = Y.slice(1));
                const at = this._ref(b.decode(Y), { raw: x, wrapped: ot });
                O.push(at), typeof at != "string" && (d = !0);
                const St = L.slice(N + T.length);
                St && O.push(b.decode(St));
              }
              d ? this._template = O : this.rendered = O.join("");
            }
            static date(h, k) {
              return b.dateFormat[k.dateFormat].call(h);
            }
            describe(h = {}) {
              if (!this._settings && h.compact)
                return this.source;
              const k = { template: this.source };
              return this._settings && (k.options = this._settings), k;
            }
            static build(h) {
              return new b.Template(h.template, h.options);
            }
            isDynamic() {
              return !!this._template;
            }
            static isTemplate(h) {
              return !!h && !!h[l.symbols.template];
            }
            refs() {
              if (!this._template)
                return;
              const h = [];
              for (const k of this._template)
                typeof k != "string" && h.push(...k.refs);
              return h;
            }
            resolve(h, k, d, O) {
              return this._template && this._template.length === 1 ? this._part(this._template[0], h, k, d, O, {}) : this.render(h, k, d, O);
            }
            _part(h, ...k) {
              return h.ref ? h.ref.resolve(...k) : h.formula.evaluate(k);
            }
            render(h, k, d, O, M = {}) {
              if (!this.isDynamic())
                return this.rendered;
              const L = [];
              for (const x of this._template)
                if (typeof x == "string")
                  L.push(x);
                else {
                  const T = this._part(x, h, k, d, O, M), N = b.stringify(T, h, k, d, O, M);
                  if (N !== void 0) {
                    const Y = x.raw || (M.errors && M.errors.escapeHtml) === !1 ? N : f(N);
                    L.push(b.wrap(Y, x.wrapped && d.errors.wrap.label));
                  }
                }
              return L.join("");
            }
            _ref(h, { raw: k, wrapped: d }) {
              const O = [], M = (x) => {
                const T = s.create(x, this._settings);
                return O.push(T), (N) => T.resolve(...N);
              };
              try {
                var L = new y.Parser(h, { reference: M, functions: b.functions, constants: b.constants });
              } catch (x) {
                throw x.message = 'Invalid template variable "'.concat(h, '" fails due to: ').concat(x.message), x;
              }
              if (L.single) {
                if (L.single.type === "reference") {
                  const x = O[0];
                  return { ref: x, raw: k, refs: O, wrapped: d || x.type === "local" && x.key === "label" };
                }
                return b.stringify(L.single.value);
              }
              return { formula: L, raw: k, refs: O };
            }
            toString() {
              return this.source;
            }
          }, b.Template.prototype[l.symbols.template] = !0, b.Template.prototype.isImmutable = !0, b.encode = function(h) {
            return h.replace(/\\(\{+)/g, (k, d) => b.opens.slice(0, d.length)).replace(/\\(\}+)/g, (k, d) => b.closes.slice(0, d.length));
          }, b.decode = function(h) {
            return h.replace(/\u0000/g, "{").replace(/\u0001/g, "}");
          }, b.split = function(h) {
            const k = [];
            let d = "";
            for (let O = 0; O < h.length; ++O) {
              const M = h[O];
              if (M === "{") {
                let L = "";
                for (; O + 1 < h.length && h[O + 1] === "{"; )
                  L += "{", ++O;
                k.push(d), d = L;
              } else
                d += M;
            }
            return k.push(d), k;
          }, b.wrap = function(h, k) {
            return k ? k.length === 1 ? "".concat(k).concat(h).concat(k) : "".concat(k[0]).concat(h).concat(k[1]) : h;
          }, b.stringify = function(h, k, d, O, M, L = {}) {
            const x = typeof h, T = O && O.errors && O.errors.wrap || {};
            let N = !1;
            if (s.isRef(h) && h.render && (N = h.in, h = h.resolve(k, d, O, M, S({ in: h.in }, L))), h === null)
              return "null";
            if (x === "string")
              return b.wrap(h, L.arrayItems && T.string);
            if (x === "number" || x === "function" || x === "symbol")
              return h.toString();
            if (x !== "object")
              return JSON.stringify(h);
            if (h instanceof Date)
              return b.Template.date(h, O);
            if (h instanceof Map) {
              const ot = [];
              for (const [at, St] of h.entries())
                ot.push("".concat(at.toString(), " -> ").concat(St.toString()));
              h = ot;
            }
            if (!Array.isArray(h))
              return h.toString();
            const Y = [];
            for (const ot of h)
              Y.push(b.stringify(ot, k, d, O, M, S({ arrayItems: !0 }, L)));
            return b.wrap(Y.join(", "), !N && T.array);
          }, b.constants = { true: !0, false: !1, null: null, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5 }, b.functions = { if: (h, k, d) => h ? k : d, msg(h) {
            const [k, d, O, M, L] = this, x = L.messages;
            if (!x)
              return "";
            const T = c.template(k, x[0], h, d, O) || c.template(k, x[1], h, d, O);
            return T ? T.render(k, d, O, M, L) : "";
          }, number: (h) => typeof h == "number" ? h : typeof h == "string" ? parseFloat(h) : typeof h == "boolean" ? h ? 1 : 0 : h instanceof Date ? h.getTime() : null };
        }, 4946: ($, m, v) => {
          const u = v(375), S = v(1687), g = v(8068), w = v(8160), a = v(3292), f = v(6354), y = v(6133), l = {};
          $.exports = g.extend({ type: "alternatives", flags: { match: { default: "any" } }, terms: { matches: { init: [], register: y.toSibling } }, args: (c, ...s) => s.length === 1 && Array.isArray(s[0]) ? c.try(...s[0]) : c.try(...s), validate(c, s) {
            const { schema: b, error: h, state: k, prefs: d } = s;
            if (b._flags.match) {
              const M = [], L = [];
              for (let T = 0; T < b.$_terms.matches.length; ++T) {
                const N = b.$_terms.matches[T], Y = k.nest(N.schema, "match.".concat(T));
                Y.snapshot();
                const ot = N.schema.$_validate(c, Y, d);
                ot.errors ? (L.push(ot.errors), Y.restore()) : M.push(ot.value);
              }
              if (M.length === 0)
                return { errors: h("alternatives.any", { details: L.map((T) => f.details(T, { override: !1 })) }) };
              if (b._flags.match === "one")
                return M.length === 1 ? { value: M[0] } : { errors: h("alternatives.one") };
              if (M.length !== b.$_terms.matches.length)
                return { errors: h("alternatives.all", { details: L.map((T) => f.details(T, { override: !1 })) }) };
              const x = (T) => T.$_terms.matches.some((N) => N.schema.type === "object" || N.schema.type === "alternatives" && x(N.schema));
              return x(b) ? { value: M.reduce((T, N) => S(T, N, { mergeArrays: !1 })) } : { value: M[M.length - 1] };
            }
            const O = [];
            for (let M = 0; M < b.$_terms.matches.length; ++M) {
              const L = b.$_terms.matches[M];
              if (L.schema) {
                const N = k.nest(L.schema, "match.".concat(M));
                N.snapshot();
                const Y = L.schema.$_validate(c, N, d);
                if (!Y.errors)
                  return Y;
                N.restore(), O.push({ schema: L.schema, reports: Y.errors });
                continue;
              }
              const x = L.ref ? L.ref.resolve(c, k, d) : c, T = L.is ? [L] : L.switch;
              for (let N = 0; N < T.length; ++N) {
                const Y = T[N], { is: ot, then: at, otherwise: St } = Y, wt = "match.".concat(M).concat(L.switch ? "." + N : "");
                if (ot.$_match(x, k.nest(ot, "".concat(wt, ".is")), d)) {
                  if (at)
                    return at.$_validate(c, k.nest(at, "".concat(wt, ".then")), d);
                } else if (St)
                  return St.$_validate(c, k.nest(St, "".concat(wt, ".otherwise")), d);
              }
            }
            return l.errors(O, s);
          }, rules: { conditional: { method(c, s) {
            u(!this._flags._endedSwitch, "Unreachable condition"), u(!this._flags.match, "Cannot combine match mode", this._flags.match, "with conditional rule"), u(s.break === void 0, "Cannot use break option with alternatives conditional");
            const b = this.clone(), h = a.when(b, c, s), k = h.is ? [h] : h.switch;
            for (const d of k)
              if (d.then && d.otherwise) {
                b.$_setFlag("_endedSwitch", !0, { clone: !1 });
                break;
              }
            return b.$_terms.matches.push(h), b.$_mutateRebuild();
          } }, match: { method(c) {
            if (u(["any", "one", "all"].includes(c), "Invalid alternatives match mode", c), c !== "any")
              for (const s of this.$_terms.matches)
                u(s.schema, "Cannot combine match mode", c, "with conditional rules");
            return this.$_setFlag("match", c);
          } }, try: { method(...c) {
            u(c.length, "Missing alternative schemas"), w.verifyFlat(c, "try"), u(!this._flags._endedSwitch, "Unreachable condition");
            const s = this.clone();
            for (const b of c)
              s.$_terms.matches.push({ schema: s.$_compile(b) });
            return s.$_mutateRebuild();
          } } }, overrides: { label(c) {
            return this.$_parent("label", c).$_modify({ each: (s, b) => b.path[0] !== "is" ? s.label(c) : void 0, ref: !1 });
          } }, rebuild(c) {
            c.$_modify({ each: (s) => {
              w.isSchema(s) && s.type === "array" && c.$_setFlag("_arrayItems", !0, { clone: !1 });
            } });
          }, manifest: { build(c, s) {
            if (s.matches)
              for (const b of s.matches) {
                const { schema: h, ref: k, is: d, not: O, then: M, otherwise: L } = b;
                c = h ? c.try(h) : k ? c.conditional(k, { is: d, then: M, not: O, otherwise: L, switch: b.switch }) : c.conditional(d, { then: M, otherwise: L });
              }
            return c;
          } }, messages: { "alternatives.all": "{{#label}} does not match all of the required types", "alternatives.any": "{{#label}} does not match any of the allowed types", "alternatives.match": "{{#label}} does not match any of the allowed types", "alternatives.one": "{{#label}} matches more than one allowed type", "alternatives.types": "{{#label}} must be one of {{#types}}" } }), l.errors = function(c, { error: s, state: b }) {
            if (!c.length)
              return { errors: s("alternatives.any") };
            if (c.length === 1)
              return { errors: c[0].reports };
            const h = /* @__PURE__ */ new Set(), k = [];
            for (const { reports: d, schema: O } of c) {
              if (d.length > 1)
                return l.unmatched(c, s);
              const M = d[0];
              if (M instanceof f.Report == 0)
                return l.unmatched(c, s);
              if (M.state.path.length !== b.path.length) {
                k.push({ type: O.type, report: M });
                continue;
              }
              if (M.code === "any.only") {
                for (const T of M.local.valids)
                  h.add(T);
                continue;
              }
              const [L, x] = M.code.split(".");
              x === "base" ? h.add(L) : k.push({ type: O.type, report: M });
            }
            return k.length ? k.length === 1 ? { errors: k[0].report } : l.unmatched(c, s) : { errors: s("alternatives.types", { types: [...h] }) };
          }, l.unmatched = function(c, s) {
            const b = [];
            for (const h of c)
              b.push(...h.reports);
            return { errors: s("alternatives.match", f.details(b, { override: !1 })) };
          };
        }, 8068: ($, m, v) => {
          const u = v(375), S = v(7629), g = v(8160), w = v(6914);
          $.exports = S.extend({ type: "any", flags: { only: { default: !1 } }, terms: { alterations: { init: null }, examples: { init: null }, externals: { init: null }, metas: { init: [] }, notes: { init: [] }, shared: { init: null }, tags: { init: [] }, whens: { init: null } }, rules: { custom: { method(a, f) {
            return u(typeof a == "function", "Method must be a function"), u(f === void 0 || f && typeof f == "string", "Description must be a non-empty string"), this.$_addRule({ name: "custom", args: { method: a, description: f } });
          }, validate(a, f, { method: y }) {
            try {
              return y(a, f);
            } catch (l) {
              return f.error("any.custom", { error: l });
            }
          }, args: ["method", "description"], multi: !0 }, messages: { method(a) {
            return this.prefs({ messages: a });
          } }, shared: { method(a) {
            u(g.isSchema(a) && a._flags.id, "Schema must be a schema with an id");
            const f = this.clone();
            return f.$_terms.shared = f.$_terms.shared || [], f.$_terms.shared.push(a), f.$_mutateRegister(a), f;
          } }, warning: { method(a, f) {
            return u(a && typeof a == "string", "Invalid warning code"), this.$_addRule({ name: "warning", args: { code: a, local: f }, warn: !0 });
          }, validate: (a, f, { code: y, local: l }) => f.error(y, l), args: ["code", "local"], multi: !0 } }, modifiers: { keep(a, f = !0) {
            a.keep = f;
          }, message(a, f) {
            a.message = w.compile(f);
          }, warn(a, f = !0) {
            a.warn = f;
          } }, manifest: { build(a, f) {
            for (const y in f) {
              const l = f[y];
              if (["examples", "externals", "metas", "notes", "tags"].includes(y))
                for (const c of l)
                  a = a[y.slice(0, -1)](c);
              else if (y !== "alterations")
                if (y !== "whens") {
                  if (y === "shared")
                    for (const c of l)
                      a = a.shared(c);
                } else
                  for (const c of l) {
                    const { ref: s, is: b, not: h, then: k, otherwise: d, concat: O } = c;
                    a = O ? a.concat(O) : s ? a.when(s, { is: b, not: h, then: k, otherwise: d, switch: c.switch, break: c.break }) : a.when(b, { then: k, otherwise: d, break: c.break });
                  }
              else {
                const c = {};
                for (const { target: s, adjuster: b } of l)
                  c[s] = b;
                a = a.alter(c);
              }
            }
            return a;
          } }, messages: { "any.custom": "{{#label}} failed custom validation because {{#error.message}}", "any.default": "{{#label}} threw an error when running default method", "any.failover": "{{#label}} threw an error when running failover method", "any.invalid": "{{#label}} contains an invalid value", "any.only": '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}', "any.ref": "{{#label}} {{#arg}} references {{:#ref}} which {{#reason}}", "any.required": "{{#label}} is required", "any.unknown": "{{#label}} is not allowed" } });
        }, 546: ($, m, v) => {
          const u = v(375), S = v(9474), g = v(9621), w = v(8068), a = v(8160), f = v(3292), y = {};
          $.exports = w.extend({ type: "array", flags: { single: { default: !1 }, sparse: { default: !1 } }, terms: { items: { init: [], manifest: "schema" }, ordered: { init: [], manifest: "schema" }, _exclusions: { init: [] }, _inclusions: { init: [] }, _requireds: { init: [] } }, coerce: { from: "object", method(l, { schema: c, state: s, prefs: b }) {
            if (!Array.isArray(l))
              return;
            const h = c.$_getRule("sort");
            return h ? y.sort(c, l, h.args.options, s, b) : void 0;
          } }, validate(l, { schema: c, error: s }) {
            if (!Array.isArray(l)) {
              if (c._flags.single) {
                const b = [l];
                return b[a.symbols.arraySingle] = !0, { value: b };
              }
              return { errors: s("array.base") };
            }
            if (c.$_getRule("items") || c.$_terms.externals)
              return { value: l.slice() };
          }, rules: { has: { method(l) {
            l = this.$_compile(l, { appendPath: !0 });
            const c = this.$_addRule({ name: "has", args: { schema: l } });
            return c.$_mutateRegister(l), c;
          }, validate(l, { state: c, prefs: s, error: b }, { schema: h }) {
            const k = [l, ...c.ancestors];
            for (let O = 0; O < l.length; ++O) {
              const M = c.localize([...c.path, O], k, h);
              if (h.$_match(l[O], M, s))
                return l;
            }
            const d = h._flags.label;
            return d ? b("array.hasKnown", { patternLabel: d }) : b("array.hasUnknown", null);
          }, multi: !0 }, items: { method(...l) {
            a.verifyFlat(l, "items");
            const c = this.$_addRule("items");
            for (let s = 0; s < l.length; ++s) {
              const b = a.tryWithPath(() => this.$_compile(l[s]), s, { append: !0 });
              c.$_terms.items.push(b);
            }
            return c.$_mutateRebuild();
          }, validate(l, { schema: c, error: s, state: b, prefs: h, errorsArray: k }) {
            const d = c.$_terms._requireds.slice(), O = c.$_terms.ordered.slice(), M = [...c.$_terms._inclusions, ...d], L = !l[a.symbols.arraySingle];
            delete l[a.symbols.arraySingle];
            const x = k();
            let T = l.length;
            for (let N = 0; N < T; ++N) {
              const Y = l[N];
              let ot = !1, at = !1;
              const St = L ? N : new Number(N), wt = [...b.path, St];
              if (!c._flags.sparse && Y === void 0) {
                if (x.push(s("array.sparse", { key: St, path: wt, pos: N, value: void 0 }, b.localize(wt))), h.abortEarly)
                  return x;
                O.shift();
                continue;
              }
              const Nt = [l, ...b.ancestors];
              for (const pt of c.$_terms._exclusions)
                if (pt.$_match(Y, b.localize(wt, Nt, pt), h, { presence: "ignore" })) {
                  if (x.push(s("array.excludes", { pos: N, value: Y }, b.localize(wt))), h.abortEarly)
                    return x;
                  ot = !0, O.shift();
                  break;
                }
              if (ot)
                continue;
              if (c.$_terms.ordered.length) {
                if (O.length) {
                  const pt = O.shift(), Et = pt.$_validate(Y, b.localize(wt, Nt, pt), h);
                  if (Et.errors) {
                    if (x.push(...Et.errors), h.abortEarly)
                      return x;
                  } else if (pt._flags.result === "strip")
                    y.fastSplice(l, N), --N, --T;
                  else {
                    if (!c._flags.sparse && Et.value === void 0) {
                      if (x.push(s("array.sparse", { key: St, path: wt, pos: N, value: void 0 }, b.localize(wt))), h.abortEarly)
                        return x;
                      continue;
                    }
                    l[N] = Et.value;
                  }
                  continue;
                }
                if (!c.$_terms.items.length) {
                  if (x.push(s("array.orderedLength", { pos: N, limit: c.$_terms.ordered.length })), h.abortEarly)
                    return x;
                  break;
                }
              }
              const It = [];
              let xe = d.length;
              for (let pt = 0; pt < xe; ++pt) {
                const Et = b.localize(wt, Nt, d[pt]);
                Et.snapshot();
                const Mt = d[pt].$_validate(Y, Et, h);
                if (It[pt] = Mt, !Mt.errors) {
                  if (l[N] = Mt.value, at = !0, y.fastSplice(d, pt), --pt, --xe, !c._flags.sparse && Mt.value === void 0 && (x.push(s("array.sparse", { key: St, path: wt, pos: N, value: void 0 }, b.localize(wt))), h.abortEarly))
                    return x;
                  break;
                }
                Et.restore();
              }
              if (at)
                continue;
              const mt = h.stripUnknown && !!h.stripUnknown.arrays || !1;
              xe = M.length;
              for (const pt of M) {
                let Et;
                const Mt = d.indexOf(pt);
                if (Mt !== -1)
                  Et = It[Mt];
                else {
                  const xt = b.localize(wt, Nt, pt);
                  if (xt.snapshot(), Et = pt.$_validate(Y, xt, h), !Et.errors) {
                    pt._flags.result === "strip" ? (y.fastSplice(l, N), --N, --T) : c._flags.sparse || Et.value !== void 0 ? l[N] = Et.value : (x.push(s("array.sparse", { key: St, path: wt, pos: N, value: void 0 }, b.localize(wt))), ot = !0), at = !0;
                    break;
                  }
                  xt.restore();
                }
                if (xe === 1) {
                  if (mt) {
                    y.fastSplice(l, N), --N, --T, at = !0;
                    break;
                  }
                  if (x.push(...Et.errors), h.abortEarly)
                    return x;
                  ot = !0;
                  break;
                }
              }
              if (!ot && (c.$_terms._inclusions.length || c.$_terms._requireds.length) && !at) {
                if (mt) {
                  y.fastSplice(l, N), --N, --T;
                  continue;
                }
                if (x.push(s("array.includes", { pos: N, value: Y }, b.localize(wt))), h.abortEarly)
                  return x;
              }
            }
            return d.length && y.fillMissedErrors(c, x, d, l, b, h), O.length && (y.fillOrderedErrors(c, x, O, l, b, h), x.length || y.fillDefault(O, l, b, h)), x.length ? x : l;
          }, priority: !0, manifest: !1 }, length: { method(l) {
            return this.$_addRule({ name: "length", args: { limit: l }, operator: "=" });
          }, validate: (l, c, { limit: s }, { name: b, operator: h, args: k }) => a.compare(l.length, s, h) ? l : c.error("array." + b, { limit: k.limit, value: l }), args: [{ name: "limit", ref: !0, assert: a.limit, message: "must be a positive integer" }] }, max: { method(l) {
            return this.$_addRule({ name: "max", method: "length", args: { limit: l }, operator: "<=" });
          } }, min: { method(l) {
            return this.$_addRule({ name: "min", method: "length", args: { limit: l }, operator: ">=" });
          } }, ordered: { method(...l) {
            a.verifyFlat(l, "ordered");
            const c = this.$_addRule("items");
            for (let s = 0; s < l.length; ++s) {
              const b = a.tryWithPath(() => this.$_compile(l[s]), s, { append: !0 });
              y.validateSingle(b, c), c.$_mutateRegister(b), c.$_terms.ordered.push(b);
            }
            return c.$_mutateRebuild();
          } }, single: { method(l) {
            const c = l === void 0 || !!l;
            return u(!c || !this._flags._arrayItems, "Cannot specify single rule when array has array items"), this.$_setFlag("single", c);
          } }, sort: { method(l = {}) {
            a.assertOptions(l, ["by", "order"]);
            const c = { order: l.order || "ascending" };
            return l.by && (c.by = f.ref(l.by, { ancestor: 0 }), u(!c.by.ancestor, "Cannot sort by ancestor")), this.$_addRule({ name: "sort", args: { options: c } });
          }, validate(l, { error: c, state: s, prefs: b, schema: h }, { options: k }) {
            const { value: d, errors: O } = y.sort(h, l, k, s, b);
            if (O)
              return O;
            for (let M = 0; M < l.length; ++M)
              if (l[M] !== d[M])
                return c("array.sort", { order: k.order, by: k.by ? k.by.key : "value" });
            return l;
          }, convert: !0 }, sparse: { method(l) {
            const c = l === void 0 || !!l;
            return this._flags.sparse === c ? this : (c ? this.clone() : this.$_addRule("items")).$_setFlag("sparse", c, { clone: !1 });
          } }, unique: { method(l, c = {}) {
            u(!l || typeof l == "function" || typeof l == "string", "comparator must be a function or a string"), a.assertOptions(c, ["ignoreUndefined", "separator"]);
            const s = { name: "unique", args: { options: c, comparator: l } };
            if (l)
              if (typeof l == "string") {
                const b = a.default(c.separator, ".");
                s.path = b ? l.split(b) : [l];
              } else
                s.comparator = l;
            return this.$_addRule(s);
          }, validate(l, { state: c, error: s, schema: b }, { comparator: h, options: k }, { comparator: d, path: O }) {
            const M = { string: /* @__PURE__ */ Object.create(null), number: /* @__PURE__ */ Object.create(null), undefined: /* @__PURE__ */ Object.create(null), boolean: /* @__PURE__ */ Object.create(null), object: /* @__PURE__ */ new Map(), function: /* @__PURE__ */ new Map(), custom: /* @__PURE__ */ new Map() }, L = d || S, x = k.ignoreUndefined;
            for (let T = 0; T < l.length; ++T) {
              const N = O ? g(l[T], O) : l[T], Y = d ? M.custom : M[typeof N];
              if (u(Y, "Failed to find unique map container for type", typeof N), Y instanceof Map) {
                const ot = Y.entries();
                let at;
                for (; !(at = ot.next()).done; )
                  if (L(at.value[0], N)) {
                    const St = c.localize([...c.path, T], [l, ...c.ancestors]), wt = { pos: T, value: l[T], dupePos: at.value[1], dupeValue: l[at.value[1]] };
                    return O && (wt.path = h), s("array.unique", wt, St);
                  }
                Y.set(N, T);
              } else {
                if ((!x || N !== void 0) && Y[N] !== void 0) {
                  const ot = { pos: T, value: l[T], dupePos: Y[N], dupeValue: l[Y[N]] };
                  return O && (ot.path = h), s("array.unique", ot, c.localize([...c.path, T], [l, ...c.ancestors]));
                }
                Y[N] = T;
              }
            }
            return l;
          }, args: ["comparator", "options"], multi: !0 } }, cast: { set: { from: Array.isArray, to: (l, c) => new Set(l) } }, rebuild(l) {
            l.$_terms._inclusions = [], l.$_terms._exclusions = [], l.$_terms._requireds = [];
            for (const c of l.$_terms.items)
              y.validateSingle(c, l), c._flags.presence === "required" ? l.$_terms._requireds.push(c) : c._flags.presence === "forbidden" ? l.$_terms._exclusions.push(c) : l.$_terms._inclusions.push(c);
            for (const c of l.$_terms.ordered)
              y.validateSingle(c, l);
          }, manifest: { build: (l, c) => (c.items && (l = l.items(...c.items)), c.ordered && (l = l.ordered(...c.ordered)), l) }, messages: { "array.base": "{{#label}} must be an array", "array.excludes": "{{#label}} contains an excluded value", "array.hasKnown": "{{#label}} does not contain at least one required match for type {:#patternLabel}", "array.hasUnknown": "{{#label}} does not contain at least one required match", "array.includes": "{{#label}} does not match any of the allowed types", "array.includesRequiredBoth": "{{#label}} does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)", "array.includesRequiredKnowns": "{{#label}} does not contain {{#knownMisses}}", "array.includesRequiredUnknowns": "{{#label}} does not contain {{#unknownMisses}} required value(s)", "array.length": "{{#label}} must contain {{#limit}} items", "array.max": "{{#label}} must contain less than or equal to {{#limit}} items", "array.min": "{{#label}} must contain at least {{#limit}} items", "array.orderedLength": "{{#label}} must contain at most {{#limit}} items", "array.sort": "{{#label}} must be sorted in {#order} order by {{#by}}", "array.sort.mismatching": "{{#label}} cannot be sorted due to mismatching types", "array.sort.unsupported": "{{#label}} cannot be sorted due to unsupported type {#type}", "array.sparse": "{{#label}} must not be a sparse array item", "array.unique": "{{#label}} contains a duplicate value" } }), y.fillMissedErrors = function(l, c, s, b, h, k) {
            const d = [];
            let O = 0;
            for (const M of s) {
              const L = M._flags.label;
              L ? d.push(L) : ++O;
            }
            d.length ? O ? c.push(l.$_createError("array.includesRequiredBoth", b, { knownMisses: d, unknownMisses: O }, h, k)) : c.push(l.$_createError("array.includesRequiredKnowns", b, { knownMisses: d }, h, k)) : c.push(l.$_createError("array.includesRequiredUnknowns", b, { unknownMisses: O }, h, k));
          }, y.fillOrderedErrors = function(l, c, s, b, h, k) {
            const d = [];
            for (const O of s)
              O._flags.presence === "required" && d.push(O);
            d.length && y.fillMissedErrors(l, c, d, b, h, k);
          }, y.fillDefault = function(l, c, s, b) {
            const h = [];
            let k = !0;
            for (let d = l.length - 1; d >= 0; --d) {
              const O = l[d], M = [c, ...s.ancestors], L = O.$_validate(void 0, s.localize(s.path, M, O), b).value;
              if (k) {
                if (L === void 0)
                  continue;
                k = !1;
              }
              h.unshift(L);
            }
            h.length && c.push(...h);
          }, y.fastSplice = function(l, c) {
            let s = c;
            for (; s < l.length; )
              l[s++] = l[s];
            --l.length;
          }, y.validateSingle = function(l, c) {
            (l.type === "array" || l._flags._arrayItems) && (u(!c._flags.single, "Cannot specify array item with single rule enabled"), c.$_setFlag("_arrayItems", !0, { clone: !1 }));
          }, y.sort = function(l, c, s, b, h) {
            const k = s.order === "ascending" ? 1 : -1, d = -1 * k, O = k, M = (L, x) => {
              let T = y.compare(L, x, d, O);
              if (T !== null || (s.by && (L = s.by.resolve(L, b, h), x = s.by.resolve(x, b, h)), T = y.compare(L, x, d, O), T !== null))
                return T;
              const N = typeof L;
              if (N !== typeof x)
                throw l.$_createError("array.sort.mismatching", c, null, b, h);
              if (N !== "number" && N !== "string")
                throw l.$_createError("array.sort.unsupported", c, { type: N }, b, h);
              return N === "number" ? (L - x) * k : L < x ? d : O;
            };
            try {
              return { value: c.slice().sort(M) };
            } catch (L) {
              return { errors: L };
            }
          }, y.compare = function(l, c, s, b) {
            return l === c ? 0 : l === void 0 ? 1 : c === void 0 ? -1 : l === null ? b : c === null ? s : null;
          };
        }, 4937: ($, m, v) => {
          const u = v(375), S = v(8068), g = v(8160), w = v(2036), a = { isBool: function(f) {
            return typeof f == "boolean";
          } };
          $.exports = S.extend({ type: "boolean", flags: { sensitive: { default: !1 } }, terms: { falsy: { init: null, manifest: "values" }, truthy: { init: null, manifest: "values" } }, coerce(f, { schema: y }) {
            if (typeof f != "boolean") {
              if (typeof f == "string") {
                const l = y._flags.sensitive ? f : f.toLowerCase();
                f = l === "true" || l !== "false" && f;
              }
              return typeof f != "boolean" && (f = y.$_terms.truthy && y.$_terms.truthy.has(f, null, null, !y._flags.sensitive) || (!y.$_terms.falsy || !y.$_terms.falsy.has(f, null, null, !y._flags.sensitive)) && f), { value: f };
            }
          }, validate(f, { error: y }) {
            if (typeof f != "boolean")
              return { value: f, errors: y("boolean.base") };
          }, rules: { truthy: { method(...f) {
            g.verifyFlat(f, "truthy");
            const y = this.clone();
            y.$_terms.truthy = y.$_terms.truthy || new w();
            for (let l = 0; l < f.length; ++l) {
              const c = f[l];
              u(c !== void 0, "Cannot call truthy with undefined"), y.$_terms.truthy.add(c);
            }
            return y;
          } }, falsy: { method(...f) {
            g.verifyFlat(f, "falsy");
            const y = this.clone();
            y.$_terms.falsy = y.$_terms.falsy || new w();
            for (let l = 0; l < f.length; ++l) {
              const c = f[l];
              u(c !== void 0, "Cannot call falsy with undefined"), y.$_terms.falsy.add(c);
            }
            return y;
          } }, sensitive: { method(f = !0) {
            return this.$_setFlag("sensitive", f);
          } } }, cast: { number: { from: a.isBool, to: (f, y) => f ? 1 : 0 }, string: { from: a.isBool, to: (f, y) => f ? "true" : "false" } }, manifest: { build: (f, y) => (y.truthy && (f = f.truthy(...y.truthy)), y.falsy && (f = f.falsy(...y.falsy)), f) }, messages: { "boolean.base": "{{#label}} must be a boolean" } });
        }, 7500: ($, m, v) => {
          const u = v(375), S = v(8068), g = v(8160), w = v(3328), a = { isDate: function(f) {
            return f instanceof Date;
          } };
          $.exports = S.extend({ type: "date", coerce: { from: ["number", "string"], method: (f, { schema: y }) => ({ value: a.parse(f, y._flags.format) || f }) }, validate(f, { schema: y, error: l, prefs: c }) {
            if (f instanceof Date && !isNaN(f.getTime()))
              return;
            const s = y._flags.format;
            return c.convert && s && typeof f == "string" ? { value: f, errors: l("date.format", { format: s }) } : { value: f, errors: l("date.base") };
          }, rules: { compare: { method: !1, validate(f, y, { date: l }, { name: c, operator: s, args: b }) {
            const h = l === "now" ? Date.now() : l.getTime();
            return g.compare(f.getTime(), h, s) ? f : y.error("date." + c, { limit: b.date, value: f });
          }, args: [{ name: "date", ref: !0, normalize: (f) => f === "now" ? f : a.parse(f), assert: (f) => f !== null, message: "must have a valid date format" }] }, format: { method(f) {
            return u(["iso", "javascript", "unix"].includes(f), "Unknown date format", f), this.$_setFlag("format", f);
          } }, greater: { method(f) {
            return this.$_addRule({ name: "greater", method: "compare", args: { date: f }, operator: ">" });
          } }, iso: { method() {
            return this.format("iso");
          } }, less: { method(f) {
            return this.$_addRule({ name: "less", method: "compare", args: { date: f }, operator: "<" });
          } }, max: { method(f) {
            return this.$_addRule({ name: "max", method: "compare", args: { date: f }, operator: "<=" });
          } }, min: { method(f) {
            return this.$_addRule({ name: "min", method: "compare", args: { date: f }, operator: ">=" });
          } }, timestamp: { method(f = "javascript") {
            return u(["javascript", "unix"].includes(f), '"type" must be one of "javascript, unix"'), this.format(f);
          } } }, cast: { number: { from: a.isDate, to: (f, y) => f.getTime() }, string: { from: a.isDate, to: (f, { prefs: y }) => w.date(f, y) } }, messages: { "date.base": "{{#label}} must be a valid date", "date.format": '{{#label}} must be in {msg("date.format." + #format) || #format} format', "date.greater": "{{#label}} must be greater than {{:#limit}}", "date.less": "{{#label}} must be less than {{:#limit}}", "date.max": "{{#label}} must be less than or equal to {{:#limit}}", "date.min": "{{#label}} must be greater than or equal to {{:#limit}}", "date.format.iso": "ISO 8601 date", "date.format.javascript": "timestamp or number of milliseconds", "date.format.unix": "timestamp or number of seconds" } }), a.parse = function(f, y) {
            if (f instanceof Date)
              return f;
            if (typeof f != "string" && (isNaN(f) || !isFinite(f)) || /^\s*$/.test(f))
              return null;
            if (y === "iso")
              return g.isIsoDate(f) ? a.date(f.toString()) : null;
            const l = f;
            if (typeof f == "string" && /^[+-]?\d+(\.\d+)?$/.test(f) && (f = parseFloat(f)), y) {
              if (y === "javascript")
                return a.date(1 * f);
              if (y === "unix")
                return a.date(1e3 * f);
              if (typeof l == "string")
                return null;
            }
            return a.date(f);
          }, a.date = function(f) {
            const y = new Date(f);
            return isNaN(y.getTime()) ? null : y;
          };
        }, 390: ($, m, v) => {
          const u = v(375), S = v(7824);
          $.exports = S.extend({ type: "function", properties: { typeof: "function" }, rules: { arity: { method(g) {
            return u(Number.isSafeInteger(g) && g >= 0, "n must be a positive integer"), this.$_addRule({ name: "arity", args: { n: g } });
          }, validate: (g, w, { n: a }) => g.length === a ? g : w.error("function.arity", { n: a }) }, class: { method() {
            return this.$_addRule("class");
          }, validate: (g, w) => /^\s*class\s/.test(g.toString()) ? g : w.error("function.class", { value: g }) }, minArity: { method(g) {
            return u(Number.isSafeInteger(g) && g > 0, "n must be a strict positive integer"), this.$_addRule({ name: "minArity", args: { n: g } });
          }, validate: (g, w, { n: a }) => g.length >= a ? g : w.error("function.minArity", { n: a }) }, maxArity: { method(g) {
            return u(Number.isSafeInteger(g) && g >= 0, "n must be a positive integer"), this.$_addRule({ name: "maxArity", args: { n: g } });
          }, validate: (g, w, { n: a }) => g.length <= a ? g : w.error("function.maxArity", { n: a }) } }, messages: { "function.arity": "{{#label}} must have an arity of {{#n}}", "function.class": "{{#label}} must be a class", "function.maxArity": "{{#label}} must have an arity lesser or equal to {{#n}}", "function.minArity": "{{#label}} must have an arity greater or equal to {{#n}}" } });
        }, 7824: ($, m, v) => {
          const u = v(978), S = v(375), g = v(8571), w = v(3652), a = v(8068), f = v(8160), y = v(3292), l = v(6354), c = v(6133), s = v(3328), b = { renameDefaults: { alias: !1, multiple: !1, override: !1 } };
          $.exports = a.extend({ type: "_keys", properties: { typeof: "object" }, flags: { unknown: { default: !1 } }, terms: { dependencies: { init: null }, keys: { init: null, manifest: { mapped: { from: "schema", to: "key" } } }, patterns: { init: null }, renames: { init: null } }, args: (h, k) => h.keys(k), validate(h, { schema: k, error: d, state: O, prefs: M }) {
            if (!h || typeof h !== k.$_property("typeof") || Array.isArray(h))
              return { value: h, errors: d("object.base", { type: k.$_property("typeof") }) };
            if (!(k.$_terms.renames || k.$_terms.dependencies || k.$_terms.keys || k.$_terms.patterns || k.$_terms.externals))
              return;
            h = b.clone(h, M);
            const L = [];
            if (k.$_terms.renames && !b.rename(k, h, O, M, L))
              return { value: h, errors: L };
            if (!k.$_terms.keys && !k.$_terms.patterns && !k.$_terms.dependencies)
              return { value: h, errors: L };
            const x = new Set(Object.keys(h));
            if (k.$_terms.keys) {
              const T = [h, ...O.ancestors];
              for (const N of k.$_terms.keys) {
                const Y = N.key, ot = h[Y];
                x.delete(Y);
                const at = O.localize([...O.path, Y], T, N), St = N.schema.$_validate(ot, at, M);
                if (St.errors) {
                  if (M.abortEarly)
                    return { value: h, errors: St.errors };
                  St.value !== void 0 && (h[Y] = St.value), L.push(...St.errors);
                } else
                  N.schema._flags.result === "strip" || St.value === void 0 && ot !== void 0 ? delete h[Y] : St.value !== void 0 && (h[Y] = St.value);
              }
            }
            if (x.size || k._flags._hasPatternMatch) {
              const T = b.unknown(k, h, x, L, O, M);
              if (T)
                return T;
            }
            if (k.$_terms.dependencies)
              for (const T of k.$_terms.dependencies) {
                if (T.key && T.key.resolve(h, O, M, null, { shadow: !1 }) === void 0)
                  continue;
                const N = b.dependencies[T.rel](k, T, h, O, M);
                if (N) {
                  const Y = k.$_createError(N.code, h, N.context, O, M);
                  if (M.abortEarly)
                    return { value: h, errors: Y };
                  L.push(Y);
                }
              }
            return { value: h, errors: L };
          }, rules: { and: { method(...h) {
            return f.verifyFlat(h, "and"), b.dependency(this, "and", null, h);
          } }, append: { method(h) {
            return h == null || Object.keys(h).length === 0 ? this : this.keys(h);
          } }, assert: { method(h, k, d) {
            s.isTemplate(h) || (h = y.ref(h)), S(d === void 0 || typeof d == "string", "Message must be a string"), k = this.$_compile(k, { appendPath: !0 });
            const O = this.$_addRule({ name: "assert", args: { subject: h, schema: k, message: d } });
            return O.$_mutateRegister(h), O.$_mutateRegister(k), O;
          }, validate(h, { error: k, prefs: d, state: O }, { subject: M, schema: L, message: x }) {
            const T = M.resolve(h, O, d), N = c.isRef(M) ? M.absolute(O) : [];
            return L.$_match(T, O.localize(N, [h, ...O.ancestors], L), d) ? h : k("object.assert", { subject: M, message: x });
          }, args: ["subject", "schema", "message"], multi: !0 }, instance: { method(h, k) {
            return S(typeof h == "function", "constructor must be a function"), k = k || h.name, this.$_addRule({ name: "instance", args: { constructor: h, name: k } });
          }, validate: (h, k, { constructor: d, name: O }) => h instanceof d ? h : k.error("object.instance", { type: O, value: h }), args: ["constructor", "name"] }, keys: { method(h) {
            S(h === void 0 || typeof h == "object", "Object schema must be a valid object"), S(!f.isSchema(h), "Object schema cannot be a joi schema");
            const k = this.clone();
            if (h)
              if (Object.keys(h).length) {
                k.$_terms.keys = k.$_terms.keys ? k.$_terms.keys.filter((d) => !h.hasOwnProperty(d.key)) : new b.Keys();
                for (const d in h)
                  f.tryWithPath(() => k.$_terms.keys.push({ key: d, schema: this.$_compile(h[d]) }), d);
              } else
                k.$_terms.keys = new b.Keys();
            else
              k.$_terms.keys = null;
            return k.$_mutateRebuild();
          } }, length: { method(h) {
            return this.$_addRule({ name: "length", args: { limit: h }, operator: "=" });
          }, validate: (h, k, { limit: d }, { name: O, operator: M, args: L }) => f.compare(Object.keys(h).length, d, M) ? h : k.error("object." + O, { limit: L.limit, value: h }), args: [{ name: "limit", ref: !0, assert: f.limit, message: "must be a positive integer" }] }, max: { method(h) {
            return this.$_addRule({ name: "max", method: "length", args: { limit: h }, operator: "<=" });
          } }, min: { method(h) {
            return this.$_addRule({ name: "min", method: "length", args: { limit: h }, operator: ">=" });
          } }, nand: { method(...h) {
            return f.verifyFlat(h, "nand"), b.dependency(this, "nand", null, h);
          } }, or: { method(...h) {
            return f.verifyFlat(h, "or"), b.dependency(this, "or", null, h);
          } }, oxor: { method(...h) {
            return b.dependency(this, "oxor", null, h);
          } }, pattern: { method(h, k, d = {}) {
            const O = h instanceof RegExp;
            O || (h = this.$_compile(h, { appendPath: !0 })), S(k !== void 0, "Invalid rule"), f.assertOptions(d, ["fallthrough", "matches"]), O && S(!h.flags.includes("g") && !h.flags.includes("y"), "pattern should not use global or sticky mode"), k = this.$_compile(k, { appendPath: !0 });
            const M = this.clone();
            M.$_terms.patterns = M.$_terms.patterns || [];
            const L = { [O ? "regex" : "schema"]: h, rule: k };
            return d.matches && (L.matches = this.$_compile(d.matches), L.matches.type !== "array" && (L.matches = L.matches.$_root.array().items(L.matches)), M.$_mutateRegister(L.matches), M.$_setFlag("_hasPatternMatch", !0, { clone: !1 })), d.fallthrough && (L.fallthrough = !0), M.$_terms.patterns.push(L), M.$_mutateRegister(k), M;
          } }, ref: { method() {
            return this.$_addRule("ref");
          }, validate: (h, k) => c.isRef(h) ? h : k.error("object.refType", { value: h }) }, regex: { method() {
            return this.$_addRule("regex");
          }, validate: (h, k) => h instanceof RegExp ? h : k.error("object.regex", { value: h }) }, rename: { method(h, k, d = {}) {
            S(typeof h == "string" || h instanceof RegExp, "Rename missing the from argument"), S(typeof k == "string" || k instanceof s, "Invalid rename to argument"), S(k !== h, "Cannot rename key to same name:", h), f.assertOptions(d, ["alias", "ignoreUndefined", "override", "multiple"]);
            const O = this.clone();
            O.$_terms.renames = O.$_terms.renames || [];
            for (const M of O.$_terms.renames)
              S(M.from !== h, "Cannot rename the same key multiple times");
            return k instanceof s && O.$_mutateRegister(k), O.$_terms.renames.push({ from: h, to: k, options: u(b.renameDefaults, d) }), O;
          } }, schema: { method(h = "any") {
            return this.$_addRule({ name: "schema", args: { type: h } });
          }, validate: (h, k, { type: d }) => !f.isSchema(h) || d !== "any" && h.type !== d ? k.error("object.schema", { type: d }) : h }, unknown: { method(h) {
            return this.$_setFlag("unknown", h !== !1);
          } }, with: { method(h, k, d = {}) {
            return b.dependency(this, "with", h, k, d);
          } }, without: { method(h, k, d = {}) {
            return b.dependency(this, "without", h, k, d);
          } }, xor: { method(...h) {
            return f.verifyFlat(h, "xor"), b.dependency(this, "xor", null, h);
          } } }, overrides: { default(h, k) {
            return h === void 0 && (h = f.symbols.deepDefault), this.$_parent("default", h, k);
          } }, rebuild(h) {
            if (h.$_terms.keys) {
              const k = new w.Sorter();
              for (const d of h.$_terms.keys)
                f.tryWithPath(() => k.add(d, { after: d.schema.$_rootReferences(), group: d.key }), d.key);
              h.$_terms.keys = new b.Keys(...k.nodes);
            }
          }, manifest: { build(h, k) {
            if (k.keys && (h = h.keys(k.keys)), k.dependencies)
              for (const { rel: d, key: O = null, peers: M, options: L } of k.dependencies)
                h = b.dependency(h, d, O, M, L);
            if (k.patterns)
              for (const { regex: d, schema: O, rule: M, fallthrough: L, matches: x } of k.patterns)
                h = h.pattern(d || O, M, { fallthrough: L, matches: x });
            if (k.renames)
              for (const { from: d, to: O, options: M } of k.renames)
                h = h.rename(d, O, M);
            return h;
          } }, messages: { "object.and": "{{#label}} contains {{#presentWithLabels}} without its required peers {{#missingWithLabels}}", "object.assert": '{{#label}} is invalid because {if(#subject.key, `"` + #subject.key + `" failed to ` + (#message || "pass the assertion test"), #message || "the assertion failed")}', "object.base": "{{#label}} must be of type {{#type}}", "object.instance": "{{#label}} must be an instance of {{:#type}}", "object.length": '{{#label}} must have {{#limit}} key{if(#limit == 1, "", "s")}', "object.max": '{{#label}} must have less than or equal to {{#limit}} key{if(#limit == 1, "", "s")}', "object.min": '{{#label}} must have at least {{#limit}} key{if(#limit == 1, "", "s")}', "object.missing": "{{#label}} must contain at least one of {{#peersWithLabels}}", "object.nand": "{{:#mainWithLabel}} must not exist simultaneously with {{#peersWithLabels}}", "object.oxor": "{{#label}} contains a conflict between optional exclusive peers {{#peersWithLabels}}", "object.pattern.match": "{{#label}} keys failed to match pattern requirements", "object.refType": "{{#label}} must be a Joi reference", "object.regex": "{{#label}} must be a RegExp object", "object.rename.multiple": "{{#label}} cannot rename {{:#from}} because multiple renames are disabled and another key was already renamed to {{:#to}}", "object.rename.override": "{{#label}} cannot rename {{:#from}} because override is disabled and target {{:#to}} exists", "object.schema": "{{#label}} must be a Joi schema of {{#type}} type", "object.unknown": "{{#label}} is not allowed", "object.with": "{{:#mainWithLabel}} missing required peer {{:#peerWithLabel}}", "object.without": "{{:#mainWithLabel}} conflict with forbidden peer {{:#peerWithLabel}}", "object.xor": "{{#label}} contains a conflict between exclusive peers {{#peersWithLabels}}" } }), b.clone = function(h, k) {
            if (typeof h == "object") {
              if (k.nonEnumerables)
                return g(h, { shallow: !0 });
              const O = Object.create(Object.getPrototypeOf(h));
              return Object.assign(O, h), O;
            }
            const d = function(...O) {
              return h.apply(this, O);
            };
            return d.prototype = g(h.prototype), Object.defineProperty(d, "name", { value: h.name, writable: !1 }), Object.defineProperty(d, "length", { value: h.length, writable: !1 }), Object.assign(d, h), d;
          }, b.dependency = function(h, k, d, O, M) {
            S(d === null || typeof d == "string", k, "key must be a strings"), M || (M = O.length > 1 && typeof O[O.length - 1] == "object" ? O.pop() : {}), f.assertOptions(M, ["separator"]), O = [].concat(O);
            const L = f.default(M.separator, "."), x = [];
            for (const N of O)
              S(typeof N == "string", k, "peers must be strings"), x.push(y.ref(N, { separator: L, ancestor: 0, prefix: !1 }));
            d !== null && (d = y.ref(d, { separator: L, ancestor: 0, prefix: !1 }));
            const T = h.clone();
            return T.$_terms.dependencies = T.$_terms.dependencies || [], T.$_terms.dependencies.push(new b.Dependency(k, d, x, O)), T;
          }, b.dependencies = { and(h, k, d, O, M) {
            const L = [], x = [], T = k.peers.length;
            for (const N of k.peers)
              N.resolve(d, O, M, null, { shadow: !1 }) === void 0 ? L.push(N.key) : x.push(N.key);
            if (L.length !== T && x.length !== T)
              return { code: "object.and", context: { present: x, presentWithLabels: b.keysToLabels(h, x), missing: L, missingWithLabels: b.keysToLabels(h, L) } };
          }, nand(h, k, d, O, M) {
            const L = [];
            for (const N of k.peers)
              N.resolve(d, O, M, null, { shadow: !1 }) !== void 0 && L.push(N.key);
            if (L.length !== k.peers.length)
              return;
            const x = k.paths[0], T = k.paths.slice(1);
            return { code: "object.nand", context: { main: x, mainWithLabel: b.keysToLabels(h, x), peers: T, peersWithLabels: b.keysToLabels(h, T) } };
          }, or(h, k, d, O, M) {
            for (const L of k.peers)
              if (L.resolve(d, O, M, null, { shadow: !1 }) !== void 0)
                return;
            return { code: "object.missing", context: { peers: k.paths, peersWithLabels: b.keysToLabels(h, k.paths) } };
          }, oxor(h, k, d, O, M) {
            const L = [];
            for (const T of k.peers)
              T.resolve(d, O, M, null, { shadow: !1 }) !== void 0 && L.push(T.key);
            if (!L.length || L.length === 1)
              return;
            const x = { peers: k.paths, peersWithLabels: b.keysToLabels(h, k.paths) };
            return x.present = L, x.presentWithLabels = b.keysToLabels(h, L), { code: "object.oxor", context: x };
          }, with(h, k, d, O, M) {
            for (const L of k.peers)
              if (L.resolve(d, O, M, null, { shadow: !1 }) === void 0)
                return { code: "object.with", context: { main: k.key.key, mainWithLabel: b.keysToLabels(h, k.key.key), peer: L.key, peerWithLabel: b.keysToLabels(h, L.key) } };
          }, without(h, k, d, O, M) {
            for (const L of k.peers)
              if (L.resolve(d, O, M, null, { shadow: !1 }) !== void 0)
                return { code: "object.without", context: { main: k.key.key, mainWithLabel: b.keysToLabels(h, k.key.key), peer: L.key, peerWithLabel: b.keysToLabels(h, L.key) } };
          }, xor(h, k, d, O, M) {
            const L = [];
            for (const T of k.peers)
              T.resolve(d, O, M, null, { shadow: !1 }) !== void 0 && L.push(T.key);
            if (L.length === 1)
              return;
            const x = { peers: k.paths, peersWithLabels: b.keysToLabels(h, k.paths) };
            return L.length === 0 ? { code: "object.missing", context: x } : (x.present = L, x.presentWithLabels = b.keysToLabels(h, L), { code: "object.xor", context: x });
          } }, b.keysToLabels = function(h, k) {
            return Array.isArray(k) ? k.map((d) => h.$_mapLabels(d)) : h.$_mapLabels(k);
          }, b.rename = function(h, k, d, O, M) {
            const L = {};
            for (const x of h.$_terms.renames) {
              const T = [], N = typeof x.from != "string";
              if (N)
                for (const Y in k) {
                  if (k[Y] === void 0 && x.options.ignoreUndefined || Y === x.to)
                    continue;
                  const ot = x.from.exec(Y);
                  ot && T.push({ from: Y, to: x.to, match: ot });
                }
              else
                !Object.prototype.hasOwnProperty.call(k, x.from) || k[x.from] === void 0 && x.options.ignoreUndefined || T.push(x);
              for (const Y of T) {
                const ot = Y.from;
                let at = Y.to;
                if (at instanceof s && (at = at.render(k, d, O, Y.match)), ot !== at) {
                  if (!x.options.multiple && L[at] && (M.push(h.$_createError("object.rename.multiple", k, { from: ot, to: at, pattern: N }, d, O)), O.abortEarly) || Object.prototype.hasOwnProperty.call(k, at) && !x.options.override && !L[at] && (M.push(h.$_createError("object.rename.override", k, { from: ot, to: at, pattern: N }, d, O)), O.abortEarly))
                    return !1;
                  k[ot] === void 0 ? delete k[at] : k[at] = k[ot], L[at] = !0, x.options.alias || delete k[ot];
                }
              }
            }
            return !0;
          }, b.unknown = function(h, k, d, O, M, L) {
            if (h.$_terms.patterns) {
              let x = !1;
              const T = h.$_terms.patterns.map((Y) => {
                if (Y.matches)
                  return x = !0, [];
              }), N = [k, ...M.ancestors];
              for (const Y of d) {
                const ot = k[Y], at = [...M.path, Y];
                for (let St = 0; St < h.$_terms.patterns.length; ++St) {
                  const wt = h.$_terms.patterns[St];
                  if (wt.regex) {
                    const xe = wt.regex.test(Y);
                    if (M.mainstay.tracer.debug(M, "rule", "pattern.".concat(St), xe ? "pass" : "error"), !xe)
                      continue;
                  } else if (!wt.schema.$_match(Y, M.nest(wt.schema, "pattern.".concat(St)), L))
                    continue;
                  d.delete(Y);
                  const Nt = M.localize(at, N, { schema: wt.rule, key: Y }), It = wt.rule.$_validate(ot, Nt, L);
                  if (It.errors) {
                    if (L.abortEarly)
                      return { value: k, errors: It.errors };
                    O.push(...It.errors);
                  }
                  if (wt.matches && T[St].push(Y), k[Y] = It.value, !wt.fallthrough)
                    break;
                }
              }
              if (x)
                for (let Y = 0; Y < T.length; ++Y) {
                  const ot = T[Y];
                  if (!ot)
                    continue;
                  const at = h.$_terms.patterns[Y].matches, St = M.localize(M.path, N, at), wt = at.$_validate(ot, St, L);
                  if (wt.errors) {
                    const Nt = l.details(wt.errors, { override: !1 });
                    Nt.matches = ot;
                    const It = h.$_createError("object.pattern.match", k, Nt, M, L);
                    if (L.abortEarly)
                      return { value: k, errors: It };
                    O.push(It);
                  }
                }
            }
            if (d.size && (h.$_terms.keys || h.$_terms.patterns)) {
              if (L.stripUnknown && !h._flags.unknown || L.skipFunctions) {
                const x = !(!L.stripUnknown || L.stripUnknown !== !0 && !L.stripUnknown.objects);
                for (const T of d)
                  x ? (delete k[T], d.delete(T)) : typeof k[T] == "function" && d.delete(T);
              }
              if (!f.default(h._flags.unknown, L.allowUnknown))
                for (const x of d) {
                  const T = M.localize([...M.path, x], []), N = h.$_createError("object.unknown", k[x], { child: x }, T, L, { flags: !1 });
                  if (L.abortEarly)
                    return { value: k, errors: N };
                  O.push(N);
                }
            }
          }, b.Dependency = class {
            constructor(h, k, d, O) {
              this.rel = h, this.key = k, this.peers = d, this.paths = O;
            }
            describe() {
              const h = { rel: this.rel, peers: this.paths };
              return this.key !== null && (h.key = this.key.key), this.peers[0].separator !== "." && (h.options = { separator: this.peers[0].separator }), h;
            }
          }, b.Keys = class extends Array {
            concat(h) {
              const k = this.slice(), d = /* @__PURE__ */ new Map();
              for (let O = 0; O < k.length; ++O)
                d.set(k[O].key, O);
              for (const O of h) {
                const M = O.key, L = d.get(M);
                L !== void 0 ? k[L] = { key: M, schema: k[L].schema.concat(O.schema) } : k.push(O);
              }
              return k;
            }
          };
        }, 8785: ($, m, v) => {
          const u = v(375), S = v(8068), g = v(8160), w = v(3292), a = v(6354), f = {};
          $.exports = S.extend({ type: "link", properties: { schemaChain: !0 }, terms: { link: { init: null, manifest: "single", register: !1 } }, args: (y, l) => y.ref(l), validate(y, { schema: l, state: c, prefs: s }) {
            u(l.$_terms.link, "Uninitialized link schema");
            const b = f.generate(l, y, c, s), h = l.$_terms.link[0].ref;
            return b.$_validate(y, c.nest(b, "link:".concat(h.display, ":").concat(b.type)), s);
          }, generate: (y, l, c, s) => f.generate(y, l, c, s), rules: { ref: { method(y) {
            u(!this.$_terms.link, "Cannot reinitialize schema"), y = w.ref(y), u(y.type === "value" || y.type === "local", "Invalid reference type:", y.type), u(y.type === "local" || y.ancestor === "root" || y.ancestor > 0, "Link cannot reference itself");
            const l = this.clone();
            return l.$_terms.link = [{ ref: y }], l;
          } }, relative: { method(y = !0) {
            return this.$_setFlag("relative", y);
          } } }, overrides: { concat(y) {
            u(this.$_terms.link, "Uninitialized link schema"), u(g.isSchema(y), "Invalid schema object"), u(y.type !== "link", "Cannot merge type link with another link");
            const l = this.clone();
            return l.$_terms.whens || (l.$_terms.whens = []), l.$_terms.whens.push({ concat: y }), l.$_mutateRebuild();
          } }, manifest: { build: (y, l) => (u(l.link, "Invalid link description missing link"), y.ref(l.link)) } }), f.generate = function(y, l, c, s) {
            let b = c.mainstay.links.get(y);
            if (b)
              return b._generate(l, c, s).schema;
            const h = y.$_terms.link[0].ref, { perspective: k, path: d } = f.perspective(h, c);
            f.assert(k, "which is outside of schema boundaries", h, y, c, s);
            try {
              b = d.length ? k.$_reach(d) : k;
            } catch {
              f.assert(!1, "to non-existing schema", h, y, c, s);
            }
            return f.assert(b.type !== "link", "which is another link", h, y, c, s), y._flags.relative || c.mainstay.links.set(y, b), b._generate(l, c, s).schema;
          }, f.perspective = function(y, l) {
            if (y.type === "local") {
              for (const { schema: c, key: s } of l.schemas) {
                if ((c._flags.id || s) === y.path[0])
                  return { perspective: c, path: y.path.slice(1) };
                if (c.$_terms.shared) {
                  for (const b of c.$_terms.shared)
                    if (b._flags.id === y.path[0])
                      return { perspective: b, path: y.path.slice(1) };
                }
              }
              return { perspective: null, path: null };
            }
            return y.ancestor === "root" ? { perspective: l.schemas[l.schemas.length - 1].schema, path: y.path } : { perspective: l.schemas[y.ancestor] && l.schemas[y.ancestor].schema, path: y.path };
          }, f.assert = function(y, l, c, s, b, h) {
            y || u(!1, '"'.concat(a.label(s._flags, b, h), '" contains link reference "').concat(c.display, '" ').concat(l));
          };
        }, 3832: ($, m, v) => {
          const u = v(375), S = v(8068), g = v(8160), w = { numberRx: /^\s*[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:e([+-]?\d+))?\s*$/i, precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/ };
          $.exports = S.extend({ type: "number", flags: { unsafe: { default: !1 } }, coerce: { from: "string", method(a, { schema: f, error: y }) {
            const l = a.match(w.numberRx);
            if (!l)
              return;
            a = a.trim();
            const c = { value: parseFloat(a) };
            if (c.value === 0 && (c.value = 0), !f._flags.unsafe)
              if (a.match(/e/i)) {
                if (w.normalizeExponent("".concat(c.value / Math.pow(10, l[1]), "e").concat(l[1])) !== w.normalizeExponent(a))
                  return c.errors = y("number.unsafe"), c;
              } else {
                const s = c.value.toString();
                if (s.match(/e/i))
                  return c;
                if (s !== w.normalizeDecimal(a))
                  return c.errors = y("number.unsafe"), c;
              }
            return c;
          } }, validate(a, { schema: f, error: y, prefs: l }) {
            if (a === 1 / 0 || a === -1 / 0)
              return { value: a, errors: y("number.infinity") };
            if (!g.isNumber(a))
              return { value: a, errors: y("number.base") };
            const c = { value: a };
            if (l.convert) {
              const s = f.$_getRule("precision");
              if (s) {
                const b = Math.pow(10, s.args.limit);
                c.value = Math.round(c.value * b) / b;
              }
            }
            return c.value === 0 && (c.value = 0), !f._flags.unsafe && (a > Number.MAX_SAFE_INTEGER || a < Number.MIN_SAFE_INTEGER) && (c.errors = y("number.unsafe")), c;
          }, rules: { compare: { method: !1, validate: (a, f, { limit: y }, { name: l, operator: c, args: s }) => g.compare(a, y, c) ? a : f.error("number." + l, { limit: s.limit, value: a }), args: [{ name: "limit", ref: !0, assert: g.isNumber, message: "must be a number" }] }, greater: { method(a) {
            return this.$_addRule({ name: "greater", method: "compare", args: { limit: a }, operator: ">" });
          } }, integer: { method() {
            return this.$_addRule("integer");
          }, validate: (a, f) => Math.trunc(a) - a == 0 ? a : f.error("number.integer") }, less: { method(a) {
            return this.$_addRule({ name: "less", method: "compare", args: { limit: a }, operator: "<" });
          } }, max: { method(a) {
            return this.$_addRule({ name: "max", method: "compare", args: { limit: a }, operator: "<=" });
          } }, min: { method(a) {
            return this.$_addRule({ name: "min", method: "compare", args: { limit: a }, operator: ">=" });
          } }, multiple: { method(a) {
            return this.$_addRule({ name: "multiple", args: { base: a } });
          }, validate: (a, f, { base: y }, l) => a * (1 / y) % 1 == 0 ? a : f.error("number.multiple", { multiple: l.args.base, value: a }), args: [{ name: "base", ref: !0, assert: (a) => typeof a == "number" && isFinite(a) && a > 0, message: "must be a positive number" }], multi: !0 }, negative: { method() {
            return this.sign("negative");
          } }, port: { method() {
            return this.$_addRule("port");
          }, validate: (a, f) => Number.isSafeInteger(a) && a >= 0 && a <= 65535 ? a : f.error("number.port") }, positive: { method() {
            return this.sign("positive");
          } }, precision: { method(a) {
            return u(Number.isSafeInteger(a), "limit must be an integer"), this.$_addRule({ name: "precision", args: { limit: a } });
          }, validate(a, f, { limit: y }) {
            const l = a.toString().match(w.precisionRx);
            return Math.max((l[1] ? l[1].length : 0) - (l[2] ? parseInt(l[2], 10) : 0), 0) <= y ? a : f.error("number.precision", { limit: y, value: a });
          }, convert: !0 }, sign: { method(a) {
            return u(["negative", "positive"].includes(a), "Invalid sign", a), this.$_addRule({ name: "sign", args: { sign: a } });
          }, validate: (a, f, { sign: y }) => y === "negative" && a < 0 || y === "positive" && a > 0 ? a : f.error("number.".concat(y)) }, unsafe: { method(a = !0) {
            return u(typeof a == "boolean", "enabled must be a boolean"), this.$_setFlag("unsafe", a);
          } } }, cast: { string: { from: (a) => typeof a == "number", to: (a, f) => a.toString() } }, messages: { "number.base": "{{#label}} must be a number", "number.greater": "{{#label}} must be greater than {{#limit}}", "number.infinity": "{{#label}} cannot be infinity", "number.integer": "{{#label}} must be an integer", "number.less": "{{#label}} must be less than {{#limit}}", "number.max": "{{#label}} must be less than or equal to {{#limit}}", "number.min": "{{#label}} must be greater than or equal to {{#limit}}", "number.multiple": "{{#label}} must be a multiple of {{#multiple}}", "number.negative": "{{#label}} must be a negative number", "number.port": "{{#label}} must be a valid port", "number.positive": "{{#label}} must be a positive number", "number.precision": "{{#label}} must have no more than {{#limit}} decimal places", "number.unsafe": "{{#label}} must be a safe number" } }), w.normalizeExponent = function(a) {
            return a.replace(/E/, "e").replace(/\.(\d*[1-9])?0+e/, ".$1e").replace(/\.e/, "e").replace(/e\+/, "e").replace(/^\+/, "").replace(/^(-?)0+([1-9])/, "$1$2");
          }, w.normalizeDecimal = function(a) {
            return (a = a.replace(/^\+/, "").replace(/\.0*$/, "").replace(/^(-?)\.([^\.]*)$/, "$10.$2").replace(/^(-?)0+([0-9])/, "$1$2")).includes(".") && a.endsWith("0") && (a = a.replace(/0+$/, "")), a === "-0" ? "0" : a;
          };
        }, 8966: ($, m, v) => {
          const u = v(7824);
          $.exports = u.extend({ type: "object", cast: { map: { from: (S) => S && typeof S == "object", to: (S, g) => new Map(Object.entries(S)) } } });
        }, 7417: ($, m, v) => {
          function u(d, O) {
            var M = Object.keys(d);
            if (Object.getOwnPropertySymbols) {
              var L = Object.getOwnPropertySymbols(d);
              O && (L = L.filter(function(x) {
                return Object.getOwnPropertyDescriptor(d, x).enumerable;
              })), M.push.apply(M, L);
            }
            return M;
          }
          function S(d) {
            for (var O = 1; O < arguments.length; O++) {
              var M = arguments[O] != null ? arguments[O] : {};
              O % 2 ? u(Object(M), !0).forEach(function(L) {
                g(d, L, M[L]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(d, Object.getOwnPropertyDescriptors(M)) : u(Object(M)).forEach(function(L) {
                Object.defineProperty(d, L, Object.getOwnPropertyDescriptor(M, L));
              });
            }
            return d;
          }
          function g(d, O, M) {
            return O in d ? Object.defineProperty(d, O, { value: M, enumerable: !0, configurable: !0, writable: !0 }) : d[O] = M, d;
          }
          const w = v(375), a = v(5380), f = v(1745), y = v(9959), l = v(6064), c = v(9926), s = v(5752), b = v(8068), h = v(8160), k = { tlds: c instanceof Set && { tlds: { allow: c, deny: null } }, base64Regex: { true: { true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}==|[\w\-]{3}=)?$/, false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/ }, false: { true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}(==)?|[\w\-]{3}=?)?$/, false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/ } }, dataUriRegex: /^data:[\w+.-]+\/[\w+.-]+;((charset=[\w-]+|base64),)?(.*)$/, hexRegex: /^[a-f0-9]+$/i, ipRegex: y.regex({ cidr: "forbidden" }).regex, isoDurationRegex: /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/, guidBrackets: { "{": "}", "[": "]", "(": ")", "": "" }, guidVersions: { uuidv1: "1", uuidv2: "2", uuidv3: "3", uuidv4: "4", uuidv5: "5" }, guidSeparators: /* @__PURE__ */ new Set([void 0, !0, !1, "-", ":"]), normalizationForms: ["NFC", "NFD", "NFKC", "NFKD"] };
          $.exports = b.extend({ type: "string", flags: { insensitive: { default: !1 }, truncate: { default: !1 } }, terms: { replacements: { init: null } }, coerce: { from: "string", method(d, { schema: O, state: M, prefs: L }) {
            const x = O.$_getRule("normalize");
            x && (d = d.normalize(x.args.form));
            const T = O.$_getRule("case");
            T && (d = T.args.direction === "upper" ? d.toLocaleUpperCase() : d.toLocaleLowerCase());
            const N = O.$_getRule("trim");
            if (N && N.args.enabled && (d = d.trim()), O.$_terms.replacements)
              for (const ot of O.$_terms.replacements)
                d = d.replace(ot.pattern, ot.replacement);
            const Y = O.$_getRule("hex");
            if (Y && Y.args.options.byteAligned && d.length % 2 != 0 && (d = "0".concat(d)), O.$_getRule("isoDate")) {
              const ot = k.isoDate(d);
              ot && (d = ot);
            }
            if (O._flags.truncate) {
              const ot = O.$_getRule("max");
              if (ot) {
                let at = ot.args.limit;
                if (h.isResolvable(at) && (at = at.resolve(d, M, L), !h.limit(at)))
                  return { value: d, errors: O.$_createError("any.ref", at, { ref: ot.args.limit, arg: "limit", reason: "must be a positive integer" }, M, L) };
                d = d.slice(0, at);
              }
            }
            return { value: d };
          } }, validate(d, { schema: O, error: M }) {
            if (typeof d != "string")
              return { value: d, errors: M("string.base") };
            if (d === "") {
              const L = O.$_getRule("min");
              return L && L.args.limit === 0 ? void 0 : { value: d, errors: M("string.empty") };
            }
          }, rules: { alphanum: { method() {
            return this.$_addRule("alphanum");
          }, validate: (d, O) => /^[a-zA-Z0-9]+$/.test(d) ? d : O.error("string.alphanum") }, base64: { method(d = {}) {
            return h.assertOptions(d, ["paddingRequired", "urlSafe"]), d = S({ urlSafe: !1, paddingRequired: !0 }, d), w(typeof d.paddingRequired == "boolean", "paddingRequired must be boolean"), w(typeof d.urlSafe == "boolean", "urlSafe must be boolean"), this.$_addRule({ name: "base64", args: { options: d } });
          }, validate: (d, O, { options: M }) => k.base64Regex[M.paddingRequired][M.urlSafe].test(d) ? d : O.error("string.base64") }, case: { method(d) {
            return w(["lower", "upper"].includes(d), "Invalid case:", d), this.$_addRule({ name: "case", args: { direction: d } });
          }, validate: (d, O, { direction: M }) => M === "lower" && d === d.toLocaleLowerCase() || M === "upper" && d === d.toLocaleUpperCase() ? d : O.error("string.".concat(M, "case")), convert: !0 }, creditCard: { method() {
            return this.$_addRule("creditCard");
          }, validate(d, O) {
            let M = d.length, L = 0, x = 1;
            for (; M--; ) {
              const T = d.charAt(M) * x;
              L += T - 9 * (T > 9), x ^= 3;
            }
            return L > 0 && L % 10 == 0 ? d : O.error("string.creditCard");
          } }, dataUri: { method(d = {}) {
            return h.assertOptions(d, ["paddingRequired"]), d = S({ paddingRequired: !0 }, d), w(typeof d.paddingRequired == "boolean", "paddingRequired must be boolean"), this.$_addRule({ name: "dataUri", args: { options: d } });
          }, validate(d, O, { options: M }) {
            const L = d.match(k.dataUriRegex);
            return L && (!L[2] || L[2] !== "base64" || k.base64Regex[M.paddingRequired].false.test(L[3])) ? d : O.error("string.dataUri");
          } }, domain: { method(d) {
            d && h.assertOptions(d, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
            const O = k.addressOptions(d);
            return this.$_addRule({ name: "domain", args: { options: d }, address: O });
          }, validate: (d, O, M, { address: L }) => a.isValid(d, L) ? d : O.error("string.domain") }, email: { method(d = {}) {
            h.assertOptions(d, ["allowFullyQualified", "allowUnicode", "ignoreLength", "maxDomainSegments", "minDomainSegments", "multiple", "separator", "tlds"]), w(d.multiple === void 0 || typeof d.multiple == "boolean", "multiple option must be an boolean");
            const O = k.addressOptions(d), M = new RegExp("\\s*[".concat(d.separator ? l(d.separator) : ",", "]\\s*"));
            return this.$_addRule({ name: "email", args: { options: d }, regex: M, address: O });
          }, validate(d, O, { options: M }, { regex: L, address: x }) {
            const T = M.multiple ? d.split(L) : [d], N = [];
            for (const Y of T)
              f.isValid(Y, x) || N.push(Y);
            return N.length ? O.error("string.email", { value: d, invalids: N }) : d;
          } }, guid: { alias: "uuid", method(d = {}) {
            h.assertOptions(d, ["version", "separator"]);
            let O = "";
            if (d.version) {
              const x = [].concat(d.version);
              w(x.length >= 1, "version must have at least 1 valid version specified");
              const T = /* @__PURE__ */ new Set();
              for (let N = 0; N < x.length; ++N) {
                const Y = x[N];
                w(typeof Y == "string", "version at position " + N + " must be a string");
                const ot = k.guidVersions[Y.toLowerCase()];
                w(ot, "version at position " + N + " must be one of " + Object.keys(k.guidVersions).join(", ")), w(!T.has(ot), "version at position " + N + " must not be a duplicate"), O += ot, T.add(ot);
              }
            }
            w(k.guidSeparators.has(d.separator), 'separator must be one of true, false, "-", or ":"');
            const M = d.separator === void 0 ? "[:-]?" : d.separator === !0 ? "[:-]" : d.separator === !1 ? "[]?" : "\\".concat(d.separator), L = new RegExp("^([\\[{\\(]?)[0-9A-F]{8}(".concat(M, ")[0-9A-F]{4}\\2?[").concat(O || "0-9A-F", "][0-9A-F]{3}\\2?[").concat(O ? "89AB" : "0-9A-F", "][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$"), "i");
            return this.$_addRule({ name: "guid", args: { options: d }, regex: L });
          }, validate(d, O, M, { regex: L }) {
            const x = L.exec(d);
            return x ? k.guidBrackets[x[1]] !== x[x.length - 1] ? O.error("string.guid") : d : O.error("string.guid");
          } }, hex: { method(d = {}) {
            return h.assertOptions(d, ["byteAligned"]), d = S({ byteAligned: !1 }, d), w(typeof d.byteAligned == "boolean", "byteAligned must be boolean"), this.$_addRule({ name: "hex", args: { options: d } });
          }, validate: (d, O, { options: M }) => k.hexRegex.test(d) ? M.byteAligned && d.length % 2 != 0 ? O.error("string.hexAlign") : d : O.error("string.hex") }, hostname: { method() {
            return this.$_addRule("hostname");
          }, validate: (d, O) => a.isValid(d, { minDomainSegments: 1 }) || k.ipRegex.test(d) ? d : O.error("string.hostname") }, insensitive: { method() {
            return this.$_setFlag("insensitive", !0);
          } }, ip: { method(d = {}) {
            h.assertOptions(d, ["cidr", "version"]);
            const { cidr: O, versions: M, regex: L } = y.regex(d), x = d.version ? M : void 0;
            return this.$_addRule({ name: "ip", args: { options: { cidr: O, version: x } }, regex: L });
          }, validate: (d, O, { options: M }, { regex: L }) => L.test(d) ? d : M.version ? O.error("string.ipVersion", { value: d, cidr: M.cidr, version: M.version }) : O.error("string.ip", { value: d, cidr: M.cidr }) }, isoDate: { method() {
            return this.$_addRule("isoDate");
          }, validate: (d, { error: O }) => k.isoDate(d) ? d : O("string.isoDate") }, isoDuration: { method() {
            return this.$_addRule("isoDuration");
          }, validate: (d, O) => k.isoDurationRegex.test(d) ? d : O.error("string.isoDuration") }, length: { method(d, O) {
            return k.length(this, "length", d, "=", O);
          }, validate(d, O, { limit: M, encoding: L }, { name: x, operator: T, args: N }) {
            const Y = !L && d.length;
            return h.compare(Y, M, T) ? d : O.error("string." + x, { limit: N.limit, value: d, encoding: L });
          }, args: [{ name: "limit", ref: !0, assert: h.limit, message: "must be a positive integer" }, "encoding"] }, lowercase: { method() {
            return this.case("lower");
          } }, max: { method(d, O) {
            return k.length(this, "max", d, "<=", O);
          }, args: ["limit", "encoding"] }, min: { method(d, O) {
            return k.length(this, "min", d, ">=", O);
          }, args: ["limit", "encoding"] }, normalize: { method(d = "NFC") {
            return w(k.normalizationForms.includes(d), "normalization form must be one of " + k.normalizationForms.join(", ")), this.$_addRule({ name: "normalize", args: { form: d } });
          }, validate: (d, { error: O }, { form: M }) => d === d.normalize(M) ? d : O("string.normalize", { value: d, form: M }), convert: !0 }, pattern: { alias: "regex", method(d, O = {}) {
            w(d instanceof RegExp, "regex must be a RegExp"), w(!d.flags.includes("g") && !d.flags.includes("y"), "regex should not use global or sticky mode"), typeof O == "string" && (O = { name: O }), h.assertOptions(O, ["invert", "name"]);
            const M = ["string.pattern", O.invert ? ".invert" : "", O.name ? ".name" : ".base"].join("");
            return this.$_addRule({ name: "pattern", args: { regex: d, options: O }, errorCode: M });
          }, validate: (d, O, { regex: M, options: L }, { errorCode: x }) => M.test(d) ^ L.invert ? d : O.error(x, { name: L.name, regex: M, value: d }), args: ["regex", "options"], multi: !0 }, replace: { method(d, O) {
            typeof d == "string" && (d = new RegExp(l(d), "g")), w(d instanceof RegExp, "pattern must be a RegExp"), w(typeof O == "string", "replacement must be a String");
            const M = this.clone();
            return M.$_terms.replacements || (M.$_terms.replacements = []), M.$_terms.replacements.push({ pattern: d, replacement: O }), M;
          } }, token: { method() {
            return this.$_addRule("token");
          }, validate: (d, O) => /^\w+$/.test(d) ? d : O.error("string.token") }, trim: { method(d = !0) {
            return w(typeof d == "boolean", "enabled must be a boolean"), this.$_addRule({ name: "trim", args: { enabled: d } });
          }, validate: (d, O, { enabled: M }) => M && d !== d.trim() ? O.error("string.trim") : d, convert: !0 }, truncate: { method(d = !0) {
            return w(typeof d == "boolean", "enabled must be a boolean"), this.$_setFlag("truncate", d);
          } }, uppercase: { method() {
            return this.case("upper");
          } }, uri: { method(d = {}) {
            h.assertOptions(d, ["allowRelative", "allowQuerySquareBrackets", "domain", "relativeOnly", "scheme"]), d.domain && h.assertOptions(d.domain, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
            const { regex: O, scheme: M } = s.regex(d), L = d.domain ? k.addressOptions(d.domain) : null;
            return this.$_addRule({ name: "uri", args: { options: d }, regex: O, domain: L, scheme: M });
          }, validate(d, O, { options: M }, { regex: L, domain: x, scheme: T }) {
            if (["http:/", "https:/"].includes(d))
              return O.error("string.uri");
            const N = L.exec(d);
            if (N) {
              const Y = N[1] || N[2];
              return !x || M.allowRelative && !Y || a.isValid(Y, x) ? d : O.error("string.domain", { value: Y });
            }
            return M.relativeOnly ? O.error("string.uriRelativeOnly") : M.scheme ? O.error("string.uriCustomScheme", { scheme: T, value: d }) : O.error("string.uri");
          } } }, manifest: { build(d, O) {
            if (O.replacements)
              for (const { pattern: M, replacement: L } of O.replacements)
                d = d.replace(M, L);
            return d;
          } }, messages: { "string.alphanum": "{{#label}} must only contain alpha-numeric characters", "string.base": "{{#label}} must be a string", "string.base64": "{{#label}} must be a valid base64 string", "string.creditCard": "{{#label}} must be a credit card", "string.dataUri": "{{#label}} must be a valid dataUri string", "string.domain": "{{#label}} must contain a valid domain name", "string.email": "{{#label}} must be a valid email", "string.empty": "{{#label}} is not allowed to be empty", "string.guid": "{{#label}} must be a valid GUID", "string.hex": "{{#label}} must only contain hexadecimal characters", "string.hexAlign": "{{#label}} hex decoded representation must be byte aligned", "string.hostname": "{{#label}} must be a valid hostname", "string.ip": "{{#label}} must be a valid ip address with a {{#cidr}} CIDR", "string.ipVersion": "{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR", "string.isoDate": "{{#label}} must be in iso format", "string.isoDuration": "{{#label}} must be a valid ISO 8601 duration", "string.length": "{{#label}} length must be {{#limit}} characters long", "string.lowercase": "{{#label}} must only contain lowercase characters", "string.max": "{{#label}} length must be less than or equal to {{#limit}} characters long", "string.min": "{{#label}} length must be at least {{#limit}} characters long", "string.normalize": "{{#label}} must be unicode normalized in the {{#form}} form", "string.token": "{{#label}} must only contain alpha-numeric and underscore characters", "string.pattern.base": "{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}", "string.pattern.name": "{{#label}} with value {:[.]} fails to match the {{#name}} pattern", "string.pattern.invert.base": "{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}", "string.pattern.invert.name": "{{#label}} with value {:[.]} matches the inverted {{#name}} pattern", "string.trim": "{{#label}} must not have leading or trailing whitespace", "string.uri": "{{#label}} must be a valid uri", "string.uriCustomScheme": "{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern", "string.uriRelativeOnly": "{{#label}} must be a valid relative uri", "string.uppercase": "{{#label}} must only contain uppercase characters" } }), k.addressOptions = function(d) {
            if (!d || (w(d.minDomainSegments === void 0 || Number.isSafeInteger(d.minDomainSegments) && d.minDomainSegments > 0, "minDomainSegments must be a positive integer"), w(d.maxDomainSegments === void 0 || Number.isSafeInteger(d.maxDomainSegments) && d.maxDomainSegments > 0, "maxDomainSegments must be a positive integer"), d.tlds === !1))
              return d;
            if (d.tlds === !0 || d.tlds === void 0)
              return w(k.tlds, "Built-in TLD list disabled"), Object.assign({}, d, k.tlds);
            w(typeof d.tlds == "object", "tlds must be true, false, or an object");
            const O = d.tlds.deny;
            if (O)
              return Array.isArray(O) && (d = Object.assign({}, d, { tlds: { deny: new Set(O) } })), w(d.tlds.deny instanceof Set, "tlds.deny must be an array, Set, or boolean"), w(!d.tlds.allow, "Cannot specify both tlds.allow and tlds.deny lists"), k.validateTlds(d.tlds.deny, "tlds.deny"), d;
            const M = d.tlds.allow;
            return M ? M === !0 ? (w(k.tlds, "Built-in TLD list disabled"), Object.assign({}, d, k.tlds)) : (Array.isArray(M) && (d = Object.assign({}, d, { tlds: { allow: new Set(M) } })), w(d.tlds.allow instanceof Set, "tlds.allow must be an array, Set, or boolean"), k.validateTlds(d.tlds.allow, "tlds.allow"), d) : d;
          }, k.validateTlds = function(d, O) {
            for (const M of d)
              w(a.isValid(M, { minDomainSegments: 1, maxDomainSegments: 1 }), "".concat(O, " must contain valid top level domain names"));
          }, k.isoDate = function(d) {
            if (!h.isIsoDate(d))
              return null;
            /.*T.*[+-]\d\d$/.test(d) && (d += "00");
            const O = new Date(d);
            return isNaN(O.getTime()) ? null : O.toISOString();
          }, k.length = function(d, O, M, L, x) {
            return w(!x || !1, "Invalid encoding:", x), d.$_addRule({ name: O, method: "length", args: { limit: M, encoding: x }, operator: L });
          };
        }, 8826: ($, m, v) => {
          const u = v(375), S = v(8068), g = {};
          g.Map = class extends Map {
            slice() {
              return new g.Map(this);
            }
          }, $.exports = S.extend({ type: "symbol", terms: { map: { init: new g.Map() } }, coerce: { method(w, { schema: a, error: f }) {
            const y = a.$_terms.map.get(w);
            return y && (w = y), a._flags.only && typeof w != "symbol" ? { value: w, errors: f("symbol.map", { map: a.$_terms.map }) } : { value: w };
          } }, validate(w, { error: a }) {
            if (typeof w != "symbol")
              return { value: w, errors: a("symbol.base") };
          }, rules: { map: { method(w) {
            w && !w[Symbol.iterator] && typeof w == "object" && (w = Object.entries(w)), u(w && w[Symbol.iterator], "Iterable must be an iterable or object");
            const a = this.clone(), f = [];
            for (const y of w) {
              u(y && y[Symbol.iterator], "Entry must be an iterable");
              const [l, c] = y;
              u(typeof l != "object" && typeof l != "function" && typeof l != "symbol", "Key must not be of type object, function, or Symbol"), u(typeof c == "symbol", "Value must be a Symbol"), a.$_terms.map.set(l, c), f.push(c);
            }
            return a.valid(...f);
          } } }, manifest: { build: (w, a) => (a.map && (w = w.map(a.map)), w) }, messages: { "symbol.base": "{{#label}} must be a symbol", "symbol.map": "{{#label}} must be one of {{#map}}" } });
        }, 8863: ($, m, v) => {
          const u = v(375), S = v(8571), g = v(738), w = v(9621), a = v(8160), f = v(6354), y = v(493), l = { result: Symbol("result") };
          m.entry = function(c, s, b) {
            let h = a.defaults;
            b && (u(b.warnings === void 0, "Cannot override warnings preference in synchronous validation"), u(b.artifacts === void 0, "Cannot override artifacts preference in synchronous validation"), h = a.preferences(a.defaults, b));
            const k = l.entry(c, s, h);
            u(!k.mainstay.externals.length, "Schema with external rules must use validateAsync()");
            const d = { value: k.value };
            return k.error && (d.error = k.error), k.mainstay.warnings.length && (d.warning = f.details(k.mainstay.warnings)), k.mainstay.debug && (d.debug = k.mainstay.debug), k.mainstay.artifacts && (d.artifacts = k.mainstay.artifacts), d;
          }, m.entryAsync = async function(c, s, b) {
            let h = a.defaults;
            b && (h = a.preferences(a.defaults, b));
            const k = l.entry(c, s, h), d = k.mainstay;
            if (k.error)
              throw d.debug && (k.error.debug = d.debug), k.error;
            if (d.externals.length) {
              let M = k.value;
              for (const { method: L, path: x, label: T } of d.externals) {
                let N, Y, ot = M;
                x.length && (N = x[x.length - 1], Y = w(M, x.slice(0, -1)), ot = Y[N]);
                try {
                  const at = await L(ot, { prefs: b });
                  if (at === void 0 || at === ot)
                    continue;
                  Y ? Y[N] = at : M = at;
                } catch (at) {
                  throw h.errors.label && (at.message += " (".concat(T, ")")), at;
                }
              }
              k.value = M;
            }
            if (!h.warnings && !h.debug && !h.artifacts)
              return k.value;
            const O = { value: k.value };
            return d.warnings.length && (O.warning = f.details(d.warnings)), d.debug && (O.debug = d.debug), d.artifacts && (O.artifacts = d.artifacts), O;
          }, l.entry = function(c, s, b) {
            const { tracer: h, cleanup: k } = l.tracer(s, b), d = { externals: [], warnings: [], tracer: h, debug: b.debug ? [] : null, links: s._ids._schemaChain ? /* @__PURE__ */ new Map() : null }, O = s._ids._schemaChain ? [{ schema: s }] : null, M = new y([], [], { mainstay: d, schemas: O }), L = m.validate(c, s, M, b);
            k && s.$_root.untrace();
            const x = f.process(L.errors, c, b);
            return { value: L.value, error: x, mainstay: d };
          }, l.tracer = function(c, s) {
            return c.$_root._tracer ? { tracer: c.$_root._tracer._register(c) } : s.debug ? (u(c.$_root.trace, "Debug mode not supported"), { tracer: c.$_root.trace()._register(c), cleanup: !0 }) : { tracer: l.ignore };
          }, m.validate = function(c, s, b, h, k = {}) {
            if (s.$_terms.whens && (s = s._generate(c, b, h).schema), s._preferences && (h = l.prefs(s, h)), s._cache && h.cache) {
              const N = s._cache.get(c);
              if (b.mainstay.tracer.debug(b, "validate", "cached", !!N), N)
                return N;
            }
            const d = (N, Y, ot) => s.$_createError(N, c, Y, ot || b, h), O = { original: c, prefs: h, schema: s, state: b, error: d, errorsArray: l.errorsArray, warn: (N, Y, ot) => b.mainstay.warnings.push(d(N, Y, ot)), message: (N, Y) => s.$_createError("custom", c, Y, b, h, { messages: N }) };
            b.mainstay.tracer.entry(s, b);
            const M = s._definition;
            if (M.prepare && c !== void 0 && h.convert) {
              const N = M.prepare(c, O);
              if (N) {
                if (b.mainstay.tracer.value(b, "prepare", c, N.value), N.errors)
                  return l.finalize(N.value, [].concat(N.errors), O);
                c = N.value;
              }
            }
            if (M.coerce && c !== void 0 && h.convert && (!M.coerce.from || M.coerce.from.includes(typeof c))) {
              const N = M.coerce.method(c, O);
              if (N) {
                if (b.mainstay.tracer.value(b, "coerced", c, N.value), N.errors)
                  return l.finalize(N.value, [].concat(N.errors), O);
                c = N.value;
              }
            }
            const L = s._flags.empty;
            L && L.$_match(l.trim(c, s), b.nest(L), a.defaults) && (b.mainstay.tracer.value(b, "empty", c, void 0), c = void 0);
            const x = k.presence || s._flags.presence || (s._flags._endedSwitch ? null : h.presence);
            if (c === void 0) {
              if (x === "forbidden")
                return l.finalize(c, null, O);
              if (x === "required")
                return l.finalize(c, [s.$_createError("any.required", c, null, b, h)], O);
              if (x === "optional") {
                if (s._flags.default !== a.symbols.deepDefault)
                  return l.finalize(c, null, O);
                b.mainstay.tracer.value(b, "default", c, {}), c = {};
              }
            } else if (x === "forbidden")
              return l.finalize(c, [s.$_createError("any.unknown", c, null, b, h)], O);
            const T = [];
            if (s._valids) {
              const N = s._valids.get(c, b, h, s._flags.insensitive);
              if (N)
                return h.convert && (b.mainstay.tracer.value(b, "valids", c, N.value), c = N.value), b.mainstay.tracer.filter(s, b, "valid", N), l.finalize(c, null, O);
              if (s._flags.only) {
                const Y = s.$_createError("any.only", c, { valids: s._valids.values({ display: !0 }) }, b, h);
                if (h.abortEarly)
                  return l.finalize(c, [Y], O);
                T.push(Y);
              }
            }
            if (s._invalids) {
              const N = s._invalids.get(c, b, h, s._flags.insensitive);
              if (N) {
                b.mainstay.tracer.filter(s, b, "invalid", N);
                const Y = s.$_createError("any.invalid", c, { invalids: s._invalids.values({ display: !0 }) }, b, h);
                if (h.abortEarly)
                  return l.finalize(c, [Y], O);
                T.push(Y);
              }
            }
            if (M.validate) {
              const N = M.validate(c, O);
              if (N && (b.mainstay.tracer.value(b, "base", c, N.value), c = N.value, N.errors)) {
                if (!Array.isArray(N.errors))
                  return T.push(N.errors), l.finalize(c, T, O);
                if (N.errors.length)
                  return T.push(...N.errors), l.finalize(c, T, O);
              }
            }
            return s._rules.length ? l.rules(c, T, O) : l.finalize(c, T, O);
          }, l.rules = function(c, s, b) {
            const { schema: h, state: k, prefs: d } = b;
            for (const O of h._rules) {
              const M = h._definition.rules[O.method];
              if (M.convert && d.convert) {
                k.mainstay.tracer.log(h, k, "rule", O.name, "full");
                continue;
              }
              let L, x = O.args;
              if (O._resolve.length) {
                x = Object.assign({}, x);
                for (const N of O._resolve) {
                  const Y = M.argsByName.get(N), ot = x[N].resolve(c, k, d), at = Y.normalize ? Y.normalize(ot) : ot, St = a.validateArg(at, null, Y);
                  if (St) {
                    L = h.$_createError("any.ref", ot, { arg: N, ref: x[N], reason: St }, k, d);
                    break;
                  }
                  x[N] = at;
                }
              }
              L = L || M.validate(c, b, x, O);
              const T = l.rule(L, O);
              if (T.errors) {
                if (k.mainstay.tracer.log(h, k, "rule", O.name, "error"), O.warn) {
                  k.mainstay.warnings.push(...T.errors);
                  continue;
                }
                if (d.abortEarly)
                  return l.finalize(c, T.errors, b);
                s.push(...T.errors);
              } else
                k.mainstay.tracer.log(h, k, "rule", O.name, "pass"), k.mainstay.tracer.value(k, "rule", c, T.value, O.name), c = T.value;
            }
            return l.finalize(c, s, b);
          }, l.rule = function(c, s) {
            return c instanceof f.Report ? (l.error(c, s), { errors: [c], value: null }) : Array.isArray(c) && c[a.symbols.errors] ? (c.forEach((b) => l.error(b, s)), { errors: c, value: null }) : { errors: null, value: c };
          }, l.error = function(c, s) {
            return s.message && c._setTemplate(s.message), c;
          }, l.finalize = function(c, s, b) {
            s = s || [];
            const { schema: h, state: k, prefs: d } = b;
            if (s.length) {
              const M = l.default("failover", void 0, s, b);
              M !== void 0 && (k.mainstay.tracer.value(k, "failover", c, M), c = M, s = []);
            }
            if (s.length && h._flags.error)
              if (typeof h._flags.error == "function") {
                s = h._flags.error(s), Array.isArray(s) || (s = [s]);
                for (const M of s)
                  u(M instanceof Error || M instanceof f.Report, "error() must return an Error object");
              } else
                s = [h._flags.error];
            if (c === void 0) {
              const M = l.default("default", c, s, b);
              k.mainstay.tracer.value(k, "default", c, M), c = M;
            }
            if (h._flags.cast && c !== void 0) {
              const M = h._definition.cast[h._flags.cast];
              if (M.from(c)) {
                const L = M.to(c, b);
                k.mainstay.tracer.value(k, "cast", c, L, h._flags.cast), c = L;
              }
            }
            if (h.$_terms.externals && d.externals && d._externals !== !1)
              for (const { method: M } of h.$_terms.externals)
                k.mainstay.externals.push({ method: M, path: k.path, label: f.label(h._flags, k, d) });
            const O = { value: c, errors: s.length ? s : null };
            return h._flags.result && (O.value = h._flags.result === "strip" ? void 0 : b.original, k.mainstay.tracer.value(k, h._flags.result, c, O.value), k.shadow(c, h._flags.result)), h._cache && d.cache !== !1 && !h._refs.length && h._cache.set(b.original, O), c === void 0 || O.errors || h._flags.artifact === void 0 || (k.mainstay.artifacts = k.mainstay.artifacts || /* @__PURE__ */ new Map(), k.mainstay.artifacts.has(h._flags.artifact) || k.mainstay.artifacts.set(h._flags.artifact, []), k.mainstay.artifacts.get(h._flags.artifact).push(k.path)), O;
          }, l.prefs = function(c, s) {
            const b = s === a.defaults;
            return b && c._preferences[a.symbols.prefs] ? c._preferences[a.symbols.prefs] : (s = a.preferences(s, c._preferences), b && (c._preferences[a.symbols.prefs] = s), s);
          }, l.default = function(c, s, b, h) {
            const { schema: k, state: d, prefs: O } = h, M = k._flags[c];
            if (O.noDefaults || M === void 0)
              return s;
            if (d.mainstay.tracer.log(k, d, "rule", c, "full"), !M)
              return M;
            if (typeof M == "function") {
              const L = M.length ? [S(d.ancestors[0]), h] : [];
              try {
                return M(...L);
              } catch (x) {
                return void b.push(k.$_createError("any.".concat(c), null, { error: x }, d, O));
              }
            }
            return typeof M != "object" ? M : M[a.symbols.literal] ? M.literal : a.isResolvable(M) ? M.resolve(s, d, O) : S(M);
          }, l.trim = function(c, s) {
            if (typeof c != "string")
              return c;
            const b = s.$_getRule("trim");
            return b && b.args.enabled ? c.trim() : c;
          }, l.ignore = { active: !1, debug: g, entry: g, filter: g, log: g, resolve: g, value: g }, l.errorsArray = function() {
            const c = [];
            return c[a.symbols.errors] = !0, c;
          };
        }, 2036: ($, m, v) => {
          const u = v(375), S = v(9474), g = v(8160), w = {};
          $.exports = w.Values = class {
            constructor(a, f) {
              this._values = new Set(a), this._refs = new Set(f), this._lowercase = w.lowercases(a), this._override = !1;
            }
            get length() {
              return this._values.size + this._refs.size;
            }
            add(a, f) {
              g.isResolvable(a) ? this._refs.has(a) || (this._refs.add(a), f && f.register(a)) : this.has(a, null, null, !1) || (this._values.add(a), typeof a == "string" && this._lowercase.set(a.toLowerCase(), a));
            }
            static merge(a, f, y) {
              if (a = a || new w.Values(), f) {
                if (f._override)
                  return f.clone();
                for (const l of [...f._values, ...f._refs])
                  a.add(l);
              }
              if (y)
                for (const l of [...y._values, ...y._refs])
                  a.remove(l);
              return a.length ? a : null;
            }
            remove(a) {
              g.isResolvable(a) ? this._refs.delete(a) : (this._values.delete(a), typeof a == "string" && this._lowercase.delete(a.toLowerCase()));
            }
            has(a, f, y, l) {
              return !!this.get(a, f, y, l);
            }
            get(a, f, y, l) {
              if (!this.length)
                return !1;
              if (this._values.has(a))
                return { value: a };
              if (typeof a == "string" && a && l) {
                const c = this._lowercase.get(a.toLowerCase());
                if (c)
                  return { value: c };
              }
              if (!this._refs.size && typeof a != "object")
                return !1;
              if (typeof a == "object") {
                for (const c of this._values)
                  if (S(c, a))
                    return { value: c };
              }
              if (f)
                for (const c of this._refs) {
                  const s = c.resolve(a, f, y, null, { in: !0 });
                  if (s === void 0)
                    continue;
                  const b = c.in && typeof s == "object" ? Array.isArray(s) ? s : Object.keys(s) : [s];
                  for (const h of b)
                    if (typeof h == typeof a) {
                      if (l && a && typeof a == "string") {
                        if (h.toLowerCase() === a.toLowerCase())
                          return { value: h, ref: c };
                      } else if (S(h, a))
                        return { value: h, ref: c };
                    }
                }
              return !1;
            }
            override() {
              this._override = !0;
            }
            values(a) {
              if (a && a.display) {
                const f = [];
                for (const y of [...this._values, ...this._refs])
                  y !== void 0 && f.push(y);
                return f;
              }
              return Array.from([...this._values, ...this._refs]);
            }
            clone() {
              const a = new w.Values(this._values, this._refs);
              return a._override = this._override, a;
            }
            concat(a) {
              u(!a._override, "Cannot concat override set of values");
              const f = new w.Values([...this._values, ...a._values], [...this._refs, ...a._refs]);
              return f._override = this._override, f;
            }
            describe() {
              const a = [];
              this._override && a.push({ override: !0 });
              for (const f of this._values.values())
                a.push(f && typeof f == "object" ? { value: f } : f);
              for (const f of this._refs.values())
                a.push(f.describe());
              return a;
            }
          }, w.Values.prototype[g.symbols.values] = !0, w.Values.prototype.slice = w.Values.prototype.clone, w.lowercases = function(a) {
            const f = /* @__PURE__ */ new Map();
            if (a)
              for (const y of a)
                typeof y == "string" && f.set(y.toLowerCase(), y);
            return f;
          };
        }, 978: ($, m, v) => {
          const u = v(375), S = v(8571), g = v(1687), w = v(9621), a = {};
          $.exports = function(f, y, l = {}) {
            if (u(f && typeof f == "object", "Invalid defaults value: must be an object"), u(!y || y === !0 || typeof y == "object", "Invalid source value: must be true, falsy or an object"), u(typeof l == "object", "Invalid options: must be an object"), !y)
              return null;
            if (l.shallow)
              return a.applyToDefaultsWithShallow(f, y, l);
            const c = S(f);
            if (y === !0)
              return c;
            const s = l.nullOverride !== void 0 && l.nullOverride;
            return g(c, y, { nullOverride: s, mergeArrays: !1 });
          }, a.applyToDefaultsWithShallow = function(f, y, l) {
            const c = l.shallow;
            u(Array.isArray(c), "Invalid keys");
            const s = /* @__PURE__ */ new Map(), b = y === !0 ? null : /* @__PURE__ */ new Set();
            for (let d of c) {
              d = Array.isArray(d) ? d : d.split(".");
              const O = w(f, d);
              O && typeof O == "object" ? s.set(O, b && w(y, d) || O) : b && b.add(d);
            }
            const h = S(f, {}, s);
            if (!b)
              return h;
            for (const d of b)
              a.reachCopy(h, y, d);
            const k = l.nullOverride !== void 0 && l.nullOverride;
            return g(h, y, { nullOverride: k, mergeArrays: !1 });
          }, a.reachCopy = function(f, y, l) {
            for (const b of l) {
              if (!(b in y))
                return;
              const h = y[b];
              if (typeof h != "object" || h === null)
                return;
              y = h;
            }
            const c = y;
            let s = f;
            for (let b = 0; b < l.length - 1; ++b) {
              const h = l[b];
              typeof s[h] != "object" && (s[h] = {}), s = s[h];
            }
            s[l[l.length - 1]] = c;
          };
        }, 375: ($, m, v) => {
          const u = v(7916);
          $.exports = function(S, ...g) {
            if (!S)
              throw g.length === 1 && g[0] instanceof Error ? g[0] : new u(g);
          };
        }, 8571: ($, m, v) => {
          const u = v(9621), S = v(4277), g = v(7043), w = { needsProtoHack: /* @__PURE__ */ new Set([S.set, S.map, S.weakSet, S.weakMap]) };
          $.exports = w.clone = function(a, f = {}, y = null) {
            if (typeof a != "object" || a === null)
              return a;
            let l = w.clone, c = y;
            if (f.shallow) {
              if (f.shallow !== !0)
                return w.cloneWithShallow(a, f);
              l = (k) => k;
            } else if (c) {
              const k = c.get(a);
              if (k)
                return k;
            } else
              c = /* @__PURE__ */ new Map();
            const s = S.getInternalProto(a);
            if (s === S.buffer)
              return !1;
            if (s === S.date)
              return new Date(a.getTime());
            if (s === S.regex)
              return new RegExp(a);
            const b = w.base(a, s, f);
            if (b === a)
              return a;
            if (c && c.set(a, b), s === S.set)
              for (const k of a)
                b.add(l(k, f, c));
            else if (s === S.map)
              for (const [k, d] of a)
                b.set(k, l(d, f, c));
            const h = g.keys(a, f);
            for (const k of h) {
              if (k === "__proto__")
                continue;
              if (s === S.array && k === "length") {
                b.length = a.length;
                continue;
              }
              const d = Object.getOwnPropertyDescriptor(a, k);
              d ? d.get || d.set ? Object.defineProperty(b, k, d) : d.enumerable ? b[k] = l(a[k], f, c) : Object.defineProperty(b, k, { enumerable: !1, writable: !0, configurable: !0, value: l(a[k], f, c) }) : Object.defineProperty(b, k, { enumerable: !0, writable: !0, configurable: !0, value: l(a[k], f, c) });
            }
            return b;
          }, w.cloneWithShallow = function(a, f) {
            const y = f.shallow;
            (f = Object.assign({}, f)).shallow = !1;
            const l = /* @__PURE__ */ new Map();
            for (const c of y) {
              const s = u(a, c);
              typeof s != "object" && typeof s != "function" || l.set(s, s);
            }
            return w.clone(a, f, l);
          }, w.base = function(a, f, y) {
            if (y.prototype === !1)
              return w.needsProtoHack.has(f) ? new f.constructor() : f === S.array ? [] : {};
            const l = Object.getPrototypeOf(a);
            if (l && l.isImmutable)
              return a;
            if (f === S.array) {
              const c = [];
              return l !== f && Object.setPrototypeOf(c, l), c;
            }
            if (w.needsProtoHack.has(f)) {
              const c = new l.constructor();
              return l !== f && Object.setPrototypeOf(c, l), c;
            }
            return Object.create(l);
          };
        }, 9474: ($, m, v) => {
          const u = v(4277), S = { mismatched: null };
          $.exports = function(g, w, a) {
            return a = Object.assign({ prototype: !0 }, a), !!S.isDeepEqual(g, w, a, []);
          }, S.isDeepEqual = function(g, w, a, f) {
            if (g === w)
              return g !== 0 || 1 / g == 1 / w;
            const y = typeof g;
            if (y !== typeof w || g === null || w === null)
              return !1;
            if (y === "function") {
              if (!a.deepFunction || g.toString() !== w.toString())
                return !1;
            } else if (y !== "object")
              return g != g && w != w;
            const l = S.getSharedType(g, w, !!a.prototype);
            switch (l) {
              case u.buffer:
                return !1;
              case u.promise:
                return g === w;
              case u.regex:
                return g.toString() === w.toString();
              case S.mismatched:
                return !1;
            }
            for (let c = f.length - 1; c >= 0; --c)
              if (f[c].isSame(g, w))
                return !0;
            f.push(new S.SeenEntry(g, w));
            try {
              return !!S.isDeepEqualObj(l, g, w, a, f);
            } finally {
              f.pop();
            }
          }, S.getSharedType = function(g, w, a) {
            if (a)
              return Object.getPrototypeOf(g) !== Object.getPrototypeOf(w) ? S.mismatched : u.getInternalProto(g);
            const f = u.getInternalProto(g);
            return f !== u.getInternalProto(w) ? S.mismatched : f;
          }, S.valueOf = function(g) {
            const w = g.valueOf;
            if (w === void 0)
              return g;
            try {
              return w.call(g);
            } catch (a) {
              return a;
            }
          }, S.hasOwnEnumerableProperty = function(g, w) {
            return Object.prototype.propertyIsEnumerable.call(g, w);
          }, S.isSetSimpleEqual = function(g, w) {
            for (const a of Set.prototype.values.call(g))
              if (!Set.prototype.has.call(w, a))
                return !1;
            return !0;
          }, S.isDeepEqualObj = function(g, w, a, f, y) {
            const { isDeepEqual: l, valueOf: c, hasOwnEnumerableProperty: s } = S, { keys: b, getOwnPropertySymbols: h } = Object;
            if (g === u.array) {
              if (!f.part) {
                if (w.length !== a.length)
                  return !1;
                for (let L = 0; L < w.length; ++L)
                  if (!l(w[L], a[L], f, y))
                    return !1;
                return !0;
              }
              for (const L of w)
                for (const x of a)
                  if (l(L, x, f, y))
                    return !0;
            } else if (g === u.set) {
              if (w.size !== a.size)
                return !1;
              if (!S.isSetSimpleEqual(w, a)) {
                const L = new Set(Set.prototype.values.call(a));
                for (const x of Set.prototype.values.call(w)) {
                  if (L.delete(x))
                    continue;
                  let T = !1;
                  for (const N of L)
                    if (l(x, N, f, y)) {
                      L.delete(N), T = !0;
                      break;
                    }
                  if (!T)
                    return !1;
                }
              }
            } else if (g === u.map) {
              if (w.size !== a.size)
                return !1;
              for (const [L, x] of Map.prototype.entries.call(w))
                if (x === void 0 && !Map.prototype.has.call(a, L) || !l(x, Map.prototype.get.call(a, L), f, y))
                  return !1;
            } else if (g === u.error && (w.name !== a.name || w.message !== a.message))
              return !1;
            const k = c(w), d = c(a);
            if ((w !== k || a !== d) && !l(k, d, f, y))
              return !1;
            const O = b(w);
            if (!f.part && O.length !== b(a).length && !f.skip)
              return !1;
            let M = 0;
            for (const L of O)
              if (f.skip && f.skip.includes(L))
                a[L] === void 0 && ++M;
              else if (!s(a, L) || !l(w[L], a[L], f, y))
                return !1;
            if (!f.part && O.length - M !== b(a).length)
              return !1;
            if (f.symbols !== !1) {
              const L = h(w), x = new Set(h(a));
              for (const T of L) {
                if (!f.skip || !f.skip.includes(T)) {
                  if (s(w, T)) {
                    if (!s(a, T) || !l(w[T], a[T], f, y))
                      return !1;
                  } else if (s(a, T))
                    return !1;
                }
                x.delete(T);
              }
              for (const T of x)
                if (s(a, T))
                  return !1;
            }
            return !0;
          }, S.SeenEntry = class {
            constructor(g, w) {
              this.obj = g, this.ref = w;
            }
            isSame(g, w) {
              return this.obj === g && this.ref === w;
            }
          };
        }, 7916: ($, m, v) => {
          const u = v(8761);
          $.exports = class extends Error {
            constructor(S) {
              super(S.filter((g) => g !== "").map((g) => typeof g == "string" ? g : g instanceof Error ? g.message : u(g)).join(" ") || "Unknown error"), typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, m.assert);
            }
          };
        }, 5277: ($) => {
          const m = {};
          $.exports = function(v) {
            if (!v)
              return "";
            let u = "";
            for (let S = 0; S < v.length; ++S) {
              const g = v.charCodeAt(S);
              m.isSafe(g) ? u += v[S] : u += m.escapeHtmlChar(g);
            }
            return u;
          }, m.escapeHtmlChar = function(v) {
            const u = m.namedHtml[v];
            if (u !== void 0)
              return u;
            if (v >= 256)
              return "&#" + v + ";";
            const S = v.toString(16).padStart(2, "0");
            return "&#x".concat(S, ";");
          }, m.isSafe = function(v) {
            return m.safeCharCodes[v] !== void 0;
          }, m.namedHtml = { 38: "&amp;", 60: "&lt;", 62: "&gt;", 34: "&quot;", 160: "&nbsp;", 162: "&cent;", 163: "&pound;", 164: "&curren;", 169: "&copy;", 174: "&reg;" }, m.safeCharCodes = function() {
            const v = {};
            for (let u = 32; u < 123; ++u)
              (u >= 97 || u >= 65 && u <= 90 || u >= 48 && u <= 57 || u === 32 || u === 46 || u === 44 || u === 45 || u === 58 || u === 95) && (v[u] = null);
            return v;
          }();
        }, 6064: ($) => {
          $.exports = function(m) {
            return m.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, "\\$&");
          };
        }, 738: ($) => {
          $.exports = function() {
          };
        }, 1687: ($, m, v) => {
          const u = v(375), S = v(8571), g = v(7043), w = {};
          $.exports = w.merge = function(a, f, y) {
            if (u(a && typeof a == "object", "Invalid target value: must be an object"), u(f == null || typeof f == "object", "Invalid source value: must be null, undefined, or an object"), !f)
              return a;
            if (y = Object.assign({ nullOverride: !0, mergeArrays: !0 }, y), Array.isArray(f)) {
              u(Array.isArray(a), "Cannot merge array onto an object"), y.mergeArrays || (a.length = 0);
              for (let c = 0; c < f.length; ++c)
                a.push(S(f[c], { symbols: y.symbols }));
              return a;
            }
            const l = g.keys(f, y);
            for (let c = 0; c < l.length; ++c) {
              const s = l[c];
              if (s === "__proto__" || !Object.prototype.propertyIsEnumerable.call(f, s))
                continue;
              const b = f[s];
              if (b && typeof b == "object") {
                if (a[s] === b)
                  continue;
                !a[s] || typeof a[s] != "object" || Array.isArray(a[s]) !== Array.isArray(b) || b instanceof Date || b instanceof RegExp ? a[s] = S(b, { symbols: y.symbols }) : w.merge(a[s], b, y);
              } else
                (b != null || y.nullOverride) && (a[s] = b);
            }
            return a;
          };
        }, 9621: ($, m, v) => {
          const u = v(375), S = {};
          $.exports = function(g, w, a) {
            if (w === !1 || w == null)
              return g;
            typeof (a = a || {}) == "string" && (a = { separator: a });
            const f = Array.isArray(w);
            u(!f || !a.separator, "Separator option no valid for array-based chain");
            const y = f ? w : w.split(a.separator || ".");
            let l = g;
            for (let c = 0; c < y.length; ++c) {
              let s = y[c];
              const b = a.iterables && S.iterables(l);
              if (Array.isArray(l) || b === "set") {
                const h = Number(s);
                Number.isInteger(h) && (s = h < 0 ? l.length + h : h);
              }
              if (!l || typeof l == "function" && a.functions === !1 || !b && l[s] === void 0) {
                u(!a.strict || c + 1 === y.length, "Missing segment", s, "in reach path ", w), u(typeof l == "object" || a.functions === !0 || typeof l != "function", "Invalid segment", s, "in reach path ", w), l = a.default;
                break;
              }
              l = b ? b === "set" ? [...l][s] : l.get(s) : l[s];
            }
            return l;
          }, S.iterables = function(g) {
            return g instanceof Set ? "set" : g instanceof Map ? "map" : void 0;
          };
        }, 8761: ($) => {
          $.exports = function(...m) {
            try {
              return JSON.stringify.apply(null, m);
            } catch (v) {
              return "[Cannot display object: " + v.message + "]";
            }
          };
        }, 4277: ($, m) => {
          const v = {};
          m = $.exports = { array: Array.prototype, buffer: !1, date: Date.prototype, error: Error.prototype, generic: Object.prototype, map: Map.prototype, promise: Promise.prototype, regex: RegExp.prototype, set: Set.prototype, weakMap: WeakMap.prototype, weakSet: WeakSet.prototype }, v.typeMap = /* @__PURE__ */ new Map([["[object Error]", m.error], ["[object Map]", m.map], ["[object Promise]", m.promise], ["[object Set]", m.set], ["[object WeakMap]", m.weakMap], ["[object WeakSet]", m.weakSet]]), m.getInternalProto = function(u) {
            if (Array.isArray(u))
              return m.array;
            if (u instanceof Date)
              return m.date;
            if (u instanceof RegExp)
              return m.regex;
            if (u instanceof Error)
              return m.error;
            const S = Object.prototype.toString.call(u);
            return v.typeMap.get(S) || m.generic;
          };
        }, 7043: ($, m) => {
          m.keys = function(v, u = {}) {
            return u.symbols !== !1 ? Reflect.ownKeys(v) : Object.getOwnPropertyNames(v);
          };
        }, 3652: ($, m, v) => {
          const u = v(375), S = {};
          m.Sorter = class {
            constructor() {
              this._items = [], this.nodes = [];
            }
            add(g, w) {
              const a = [].concat((w = w || {}).before || []), f = [].concat(w.after || []), y = w.group || "?", l = w.sort || 0;
              u(!a.includes(y), "Item cannot come before itself: ".concat(y)), u(!a.includes("?"), "Item cannot come before unassociated items"), u(!f.includes(y), "Item cannot come after itself: ".concat(y)), u(!f.includes("?"), "Item cannot come after unassociated items"), Array.isArray(g) || (g = [g]);
              for (const c of g) {
                const s = { seq: this._items.length, sort: l, before: a, after: f, group: y, node: c };
                this._items.push(s);
              }
              if (!w.manual) {
                const c = this._sort();
                u(c, "item", y !== "?" ? "added into group ".concat(y) : "", "created a dependencies error");
              }
              return this.nodes;
            }
            merge(g) {
              Array.isArray(g) || (g = [g]);
              for (const a of g)
                if (a)
                  for (const f of a._items)
                    this._items.push(Object.assign({}, f));
              this._items.sort(S.mergeSort);
              for (let a = 0; a < this._items.length; ++a)
                this._items[a].seq = a;
              const w = this._sort();
              return u(w, "merge created a dependencies error"), this.nodes;
            }
            sort() {
              const g = this._sort();
              return u(g, "sort created a dependencies error"), this.nodes;
            }
            _sort() {
              const g = {}, w = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null);
              for (const s of this._items) {
                const b = s.seq, h = s.group;
                a[h] = a[h] || [], a[h].push(b), g[b] = s.before;
                for (const k of s.after)
                  w[k] = w[k] || [], w[k].push(b);
              }
              for (const s in g) {
                const b = [];
                for (const h in g[s]) {
                  const k = g[s][h];
                  a[k] = a[k] || [], b.push(...a[k]);
                }
                g[s] = b;
              }
              for (const s in w)
                if (a[s])
                  for (const b of a[s])
                    g[b].push(...w[s]);
              const f = {};
              for (const s in g) {
                const b = g[s];
                for (const h of b)
                  f[h] = f[h] || [], f[h].push(s);
              }
              const y = {}, l = [];
              for (let s = 0; s < this._items.length; ++s) {
                let b = s;
                if (f[s]) {
                  b = null;
                  for (let h = 0; h < this._items.length; ++h) {
                    if (y[h] === !0)
                      continue;
                    f[h] || (f[h] = []);
                    const k = f[h].length;
                    let d = 0;
                    for (let O = 0; O < k; ++O)
                      y[f[h][O]] && ++d;
                    if (d === k) {
                      b = h;
                      break;
                    }
                  }
                }
                b !== null && (y[b] = !0, l.push(b));
              }
              if (l.length !== this._items.length)
                return !1;
              const c = {};
              for (const s of this._items)
                c[s.seq] = s;
              this._items = [], this.nodes = [];
              for (const s of l) {
                const b = c[s];
                this.nodes.push(b.node), this._items.push(b);
              }
              return !0;
            }
          }, S.mergeSort = (g, w) => g.sort === w.sort ? 0 : g.sort < w.sort ? -1 : 1;
        }, 5380: ($, m, v) => {
          const u = v(443), S = v(2178), g = { minDomainSegments: 2, nonAsciiRx: /[^\x00-\x7f]/, domainControlRx: /[\x00-\x20@\:\/\\#!\$&\'\(\)\*\+,;=\?]/, tldSegmentRx: /^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/, domainSegmentRx: /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/, URL: u.URL || URL };
          m.analyze = function(w, a = {}) {
            if (!w)
              return S.code("DOMAIN_NON_EMPTY_STRING");
            if (typeof w != "string")
              throw new Error("Invalid input: domain must be a string");
            if (w.length > 256)
              return S.code("DOMAIN_TOO_LONG");
            if (g.nonAsciiRx.test(w)) {
              if (a.allowUnicode === !1)
                return S.code("DOMAIN_INVALID_UNICODE_CHARS");
              w = w.normalize("NFC");
            }
            if (g.domainControlRx.test(w))
              return S.code("DOMAIN_INVALID_CHARS");
            w = g.punycode(w), a.allowFullyQualified && w[w.length - 1] === "." && (w = w.slice(0, -1));
            const f = a.minDomainSegments || g.minDomainSegments, y = w.split(".");
            if (y.length < f)
              return S.code("DOMAIN_SEGMENTS_COUNT");
            if (a.maxDomainSegments && y.length > a.maxDomainSegments)
              return S.code("DOMAIN_SEGMENTS_COUNT_MAX");
            const l = a.tlds;
            if (l) {
              const c = y[y.length - 1].toLowerCase();
              if (l.deny && l.deny.has(c) || l.allow && !l.allow.has(c))
                return S.code("DOMAIN_FORBIDDEN_TLDS");
            }
            for (let c = 0; c < y.length; ++c) {
              const s = y[c];
              if (!s.length)
                return S.code("DOMAIN_EMPTY_SEGMENT");
              if (s.length > 63)
                return S.code("DOMAIN_LONG_SEGMENT");
              if (c < y.length - 1) {
                if (!g.domainSegmentRx.test(s))
                  return S.code("DOMAIN_INVALID_CHARS");
              } else if (!g.tldSegmentRx.test(s))
                return S.code("DOMAIN_INVALID_TLDS_CHARS");
            }
            return null;
          }, m.isValid = function(w, a) {
            return !m.analyze(w, a);
          }, g.punycode = function(w) {
            w.includes("%") && (w = w.replace(/%/g, "%25"));
            try {
              return new g.URL("http://".concat(w)).host;
            } catch {
              return w;
            }
          };
        }, 1745: ($, m, v) => {
          const u = v(9848), S = v(5380), g = v(2178), w = { nonAsciiRx: /[^\x00-\x7f]/, encoder: new (u.TextEncoder || TextEncoder)() };
          m.analyze = function(a, f) {
            return w.email(a, f);
          }, m.isValid = function(a, f) {
            return !w.email(a, f);
          }, w.email = function(a, f = {}) {
            if (typeof a != "string")
              throw new Error("Invalid input: email must be a string");
            if (!a)
              return g.code("EMPTY_STRING");
            const y = !w.nonAsciiRx.test(a);
            if (!y) {
              if (f.allowUnicode === !1)
                return g.code("FORBIDDEN_UNICODE");
              a = a.normalize("NFC");
            }
            const l = a.split("@");
            if (l.length !== 2)
              return l.length > 2 ? g.code("MULTIPLE_AT_CHAR") : g.code("MISSING_AT_CHAR");
            const [c, s] = l;
            if (!c)
              return g.code("EMPTY_LOCAL");
            if (!f.ignoreLength) {
              if (a.length > 254)
                return g.code("ADDRESS_TOO_LONG");
              if (w.encoder.encode(c).length > 64)
                return g.code("LOCAL_TOO_LONG");
            }
            return w.local(c, y) || S.analyze(s, f);
          }, w.local = function(a, f) {
            const y = a.split(".");
            for (const l of y) {
              if (!l.length)
                return g.code("EMPTY_LOCAL_SEGMENT");
              if (f) {
                if (!w.atextRx.test(l))
                  return g.code("INVALID_LOCAL_CHARS");
              } else
                for (const c of l) {
                  if (w.atextRx.test(c))
                    continue;
                  const s = w.binary(c);
                  if (!w.atomRx.test(s))
                    return g.code("INVALID_LOCAL_CHARS");
                }
            }
          }, w.binary = function(a) {
            return Array.from(w.encoder.encode(a)).map((f) => String.fromCharCode(f)).join("");
          }, w.atextRx = /^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/, w.atomRx = new RegExp(["(?:[\\xc2-\\xdf][\\x80-\\xbf])", "(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})", "(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})"].join("|"));
        }, 2178: ($, m) => {
          m.codes = { EMPTY_STRING: "Address must be a non-empty string", FORBIDDEN_UNICODE: "Address contains forbidden Unicode characters", MULTIPLE_AT_CHAR: "Address cannot contain more than one @ character", MISSING_AT_CHAR: "Address must contain one @ character", EMPTY_LOCAL: "Address local part cannot be empty", ADDRESS_TOO_LONG: "Address too long", LOCAL_TOO_LONG: "Address local part too long", EMPTY_LOCAL_SEGMENT: "Address local part contains empty dot-separated segment", INVALID_LOCAL_CHARS: "Address local part contains invalid character", DOMAIN_NON_EMPTY_STRING: "Domain must be a non-empty string", DOMAIN_TOO_LONG: "Domain too long", DOMAIN_INVALID_UNICODE_CHARS: "Domain contains forbidden Unicode characters", DOMAIN_INVALID_CHARS: "Domain contains invalid character", DOMAIN_INVALID_TLDS_CHARS: "Domain contains invalid tld character", DOMAIN_SEGMENTS_COUNT: "Domain lacks the minimum required number of segments", DOMAIN_SEGMENTS_COUNT_MAX: "Domain contains too many segments", DOMAIN_FORBIDDEN_TLDS: "Domain uses forbidden TLD", DOMAIN_EMPTY_SEGMENT: "Domain contains empty dot-separated segment", DOMAIN_LONG_SEGMENT: "Domain contains dot-separated segment that is too long" }, m.code = function(v) {
            return { code: v, error: m.codes[v] };
          };
        }, 9959: ($, m, v) => {
          const u = v(375), S = v(5752);
          m.regex = function(g = {}) {
            u(g.cidr === void 0 || typeof g.cidr == "string", "options.cidr must be a string");
            const w = g.cidr ? g.cidr.toLowerCase() : "optional";
            u(["required", "optional", "forbidden"].includes(w), "options.cidr must be one of required, optional, forbidden"), u(g.version === void 0 || typeof g.version == "string" || Array.isArray(g.version), "options.version must be a string or an array of string");
            let a = g.version || ["ipv4", "ipv6", "ipvfuture"];
            Array.isArray(a) || (a = [a]), u(a.length >= 1, "options.version must have at least 1 version specified");
            for (let c = 0; c < a.length; ++c)
              u(typeof a[c] == "string", "options.version must only contain strings"), a[c] = a[c].toLowerCase(), u(["ipv4", "ipv6", "ipvfuture"].includes(a[c]), "options.version contains unknown version " + a[c] + " - must be one of ipv4, ipv6, ipvfuture");
            a = Array.from(new Set(a));
            const f = a.map((c) => {
              if (w === "forbidden")
                return S.ip[c];
              const s = "\\/".concat(c === "ipv4" ? S.ip.v4Cidr : S.ip.v6Cidr);
              return w === "required" ? "".concat(S.ip[c]).concat(s) : "".concat(S.ip[c], "(?:").concat(s, ")?");
            }), y = "(?:".concat(f.join("|"), ")"), l = new RegExp("^".concat(y, "$"));
            return { cidr: w, versions: a, regex: l, raw: y };
          };
        }, 5752: ($, m, v) => {
          const u = v(375), S = v(6064), g = { generate: function() {
            const w = {}, a = "!\\$&'\\(\\)\\*\\+,;=", f = "\\w-\\.~%\\dA-Fa-f" + a + ":@", y = "[" + f + "]", l = "(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
            w.ipv4address = "(?:" + l + "\\.){3}" + l;
            const c = "[\\dA-Fa-f]{1,4}", s = "(?:" + c + ":" + c + "|" + w.ipv4address + ")", b = "(?:" + c + ":){6}" + s, h = "::(?:" + c + ":){5}" + s, k = "(?:" + c + ")?::(?:" + c + ":){4}" + s, d = "(?:(?:" + c + ":){0,1}" + c + ")?::(?:" + c + ":){3}" + s, O = "(?:(?:" + c + ":){0,2}" + c + ")?::(?:" + c + ":){2}" + s, M = "(?:(?:" + c + ":){0,3}" + c + ")?::" + c + ":" + s, L = "(?:(?:" + c + ":){0,4}" + c + ")?::" + s;
            w.ipv4Cidr = "(?:\\d|[1-2]\\d|3[0-2])", w.ipv6Cidr = "(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8])", w.ipv6address = "(?:" + b + "|" + h + "|" + k + "|" + d + "|" + O + "|" + M + "|" + L + "|(?:(?:[\\dA-Fa-f]{1,4}:){0,5}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}|(?:(?:[\\dA-Fa-f]{1,4}:){0,6}[\\dA-Fa-f]{1,4})?::)", w.ipvFuture = "v[\\dA-Fa-f]+\\.[\\w-\\.~" + a + ":]+", w.scheme = "[a-zA-Z][a-zA-Z\\d+-\\.]*", w.schemeRegex = new RegExp(w.scheme);
            const x = "[\\w-\\.~%\\dA-Fa-f" + a + ":]*", T = "(?:\\[(?:" + w.ipv6address + "|" + w.ipvFuture + ")\\]|" + w.ipv4address + "|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=]{1,255})", N = "(?:" + x + "@)?" + T + "(?::\\d*)?", Y = "(?:" + x + "@)?(" + T + ")(?::\\d*)?", ot = y + "+", at = "(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*", St = "\\/(?:" + ot + at + ")?", wt = ot + at, Nt = "[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=@]+" + at;
            return w.hierPart = "(?:(?:\\/\\/" + N + at + ")|" + St + "|" + wt + "|(?:\\/\\/\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*))", w.hierPartCapture = "(?:(?:\\/\\/" + Y + at + ")|" + St + "|" + wt + ")", w.relativeRef = "(?:(?:\\/\\/" + N + at + ")|" + St + "|" + Nt + "|)", w.relativeRefCapture = "(?:(?:\\/\\/" + Y + at + ")|" + St + "|" + Nt + "|)", w.query = "[" + f + "\\/\\?]*(?=#|$)", w.queryWithSquareBrackets = "[" + f + "\\[\\]\\/\\?]*(?=#|$)", w.fragment = "[" + f + "\\/\\?]*", w;
          } };
          g.rfc3986 = g.generate(), m.ip = { v4Cidr: g.rfc3986.ipv4Cidr, v6Cidr: g.rfc3986.ipv6Cidr, ipv4: g.rfc3986.ipv4address, ipv6: g.rfc3986.ipv6address, ipvfuture: g.rfc3986.ipvFuture }, g.createRegex = function(w) {
            const a = g.rfc3986, f = "(?:\\?" + (w.allowQuerySquareBrackets ? a.queryWithSquareBrackets : a.query) + ")?(?:#" + a.fragment + ")?", y = w.domain ? a.relativeRefCapture : a.relativeRef;
            if (w.relativeOnly)
              return g.wrap(y + f);
            let l = "";
            if (w.scheme) {
              u(w.scheme instanceof RegExp || typeof w.scheme == "string" || Array.isArray(w.scheme), "scheme must be a RegExp, String, or Array");
              const b = [].concat(w.scheme);
              u(b.length >= 1, "scheme must have at least 1 scheme specified");
              const h = [];
              for (let k = 0; k < b.length; ++k) {
                const d = b[k];
                u(d instanceof RegExp || typeof d == "string", "scheme at position " + k + " must be a RegExp or String"), d instanceof RegExp ? h.push(d.source.toString()) : (u(a.schemeRegex.test(d), "scheme at position " + k + " must be a valid scheme"), h.push(S(d)));
              }
              l = h.join("|");
            }
            const c = "(?:" + (l ? "(?:" + l + ")" : a.scheme) + ":" + (w.domain ? a.hierPartCapture : a.hierPart) + ")", s = w.allowRelative ? "(?:" + c + "|" + y + ")" : c;
            return g.wrap(s + f, l);
          }, g.wrap = function(w, a) {
            return { raw: w = "(?=.)(?!https?:/(?:$|[^/]))(?!https?:///)(?!https?:[^/])".concat(w), regex: new RegExp("^".concat(w, "$")), scheme: a };
          }, g.uriRegex = g.createRegex({}), m.regex = function(w = {}) {
            return w.scheme || w.allowRelative || w.relativeOnly || w.allowQuerySquareBrackets || w.domain ? g.createRegex(w) : g.uriRegex;
          };
        }, 1447: ($, m) => {
          const v = { operators: ["!", "^", "*", "/", "%", "+", "-", "<", "<=", ">", ">=", "==", "!=", "&&", "||", "??"], operatorCharacters: ["!", "^", "*", "/", "%", "+", "-", "<", "=", ">", "&", "|", "?"], operatorsOrder: [["^"], ["*", "/", "%"], ["+", "-"], ["<", "<=", ">", ">="], ["==", "!="], ["&&"], ["||", "??"]], operatorsPrefix: ["!", "n"], literals: { '"': '"', "`": "`", "'": "'", "[": "]" }, numberRx: /^(?:[0-9]*\.?[0-9]*){1}$/, tokenRx: /^[\w\$\#\.\@\:\{\}]+$/, symbol: Symbol("formula"), settings: Symbol("settings") };
          m.Parser = class {
            constructor(u, S = {}) {
              if (!S[v.settings] && S.constants)
                for (const g in S.constants) {
                  const w = S.constants[g];
                  if (w !== null && !["boolean", "number", "string"].includes(typeof w))
                    throw new Error("Formula constant ".concat(g, " contains invalid ").concat(typeof w, " value type"));
                }
              this.settings = S[v.settings] ? S : Object.assign({ [v.settings]: !0, constants: {}, functions: {} }, S), this.single = null, this._parts = null, this._parse(u);
            }
            _parse(u) {
              let S = [], g = "", w = 0, a = !1;
              const f = (l) => {
                if (w)
                  throw new Error("Formula missing closing parenthesis");
                const c = S.length ? S[S.length - 1] : null;
                if (a || g || l) {
                  if (c && c.type === "reference" && l === ")")
                    return c.type = "function", c.value = this._subFormula(g, c.value), void (g = "");
                  if (l === ")") {
                    const s = new m.Parser(g, this.settings);
                    S.push({ type: "segment", value: s });
                  } else if (a) {
                    if (a === "]")
                      return S.push({ type: "reference", value: g }), void (g = "");
                    S.push({ type: "literal", value: g });
                  } else if (v.operatorCharacters.includes(g))
                    c && c.type === "operator" && v.operators.includes(c.value + g) ? c.value += g : S.push({ type: "operator", value: g });
                  else if (g.match(v.numberRx))
                    S.push({ type: "constant", value: parseFloat(g) });
                  else if (this.settings.constants[g] !== void 0)
                    S.push({ type: "constant", value: this.settings.constants[g] });
                  else {
                    if (!g.match(v.tokenRx))
                      throw new Error("Formula contains invalid token: ".concat(g));
                    S.push({ type: "reference", value: g });
                  }
                  g = "";
                }
              };
              for (const l of u)
                a ? l === a ? (f(), a = !1) : g += l : w ? l === "(" ? (g += l, ++w) : l === ")" ? (--w, w ? g += l : f(l)) : g += l : l in v.literals ? a = v.literals[l] : l === "(" ? (f(), ++w) : v.operatorCharacters.includes(l) ? (f(), g = l, f()) : l !== " " ? g += l : f();
              f(), S = S.map((l, c) => l.type !== "operator" || l.value !== "-" || c && S[c - 1].type !== "operator" ? l : { type: "operator", value: "n" });
              let y = !1;
              for (const l of S) {
                if (l.type === "operator") {
                  if (v.operatorsPrefix.includes(l.value))
                    continue;
                  if (!y)
                    throw new Error("Formula contains an operator in invalid position");
                  if (!v.operators.includes(l.value))
                    throw new Error("Formula contains an unknown operator ".concat(l.value));
                } else if (y)
                  throw new Error("Formula missing expected operator");
                y = !y;
              }
              if (!y)
                throw new Error("Formula contains invalid trailing operator");
              S.length === 1 && ["reference", "literal", "constant"].includes(S[0].type) && (this.single = { type: S[0].type === "reference" ? "reference" : "value", value: S[0].value }), this._parts = S.map((l) => {
                if (l.type === "operator")
                  return v.operatorsPrefix.includes(l.value) ? l : l.value;
                if (l.type !== "reference")
                  return l.value;
                if (this.settings.tokenRx && !this.settings.tokenRx.test(l.value))
                  throw new Error("Formula contains invalid reference ".concat(l.value));
                return this.settings.reference ? this.settings.reference(l.value) : v.reference(l.value);
              });
            }
            _subFormula(u, S) {
              const g = this.settings.functions[S];
              if (typeof g != "function")
                throw new Error("Formula contains unknown function ".concat(S));
              let w = [];
              if (u) {
                let a = "", f = 0, y = !1;
                const l = () => {
                  if (!a)
                    throw new Error("Formula contains function ".concat(S, " with invalid arguments ").concat(u));
                  w.push(a), a = "";
                };
                for (let c = 0; c < u.length; ++c) {
                  const s = u[c];
                  y ? (a += s, s === y && (y = !1)) : s in v.literals && !f ? (a += s, y = v.literals[s]) : s !== "," || f ? (a += s, s === "(" ? ++f : s === ")" && --f) : l();
                }
                l();
              }
              return w = w.map((a) => new m.Parser(a, this.settings)), function(a) {
                const f = [];
                for (const y of w)
                  f.push(y.evaluate(a));
                return g.call(a, ...f);
              };
            }
            evaluate(u) {
              const S = this._parts.slice();
              for (let g = S.length - 2; g >= 0; --g) {
                const w = S[g];
                if (w && w.type === "operator") {
                  const a = S[g + 1];
                  S.splice(g + 1, 1);
                  const f = v.evaluate(a, u);
                  S[g] = v.single(w.value, f);
                }
              }
              return v.operatorsOrder.forEach((g) => {
                for (let w = 1; w < S.length - 1; )
                  if (g.includes(S[w])) {
                    const a = S[w], f = v.evaluate(S[w - 1], u), y = v.evaluate(S[w + 1], u);
                    S.splice(w, 2);
                    const l = v.calculate(a, f, y);
                    S[w - 1] = l === 0 ? 0 : l;
                  } else
                    w += 2;
              }), v.evaluate(S[0], u);
            }
          }, m.Parser.prototype[v.symbol] = !0, v.reference = function(u) {
            return function(S) {
              return S && S[u] !== void 0 ? S[u] : null;
            };
          }, v.evaluate = function(u, S) {
            return u === null ? null : typeof u == "function" ? u(S) : u[v.symbol] ? u.evaluate(S) : u;
          }, v.single = function(u, S) {
            if (u === "!")
              return !S;
            const g = -S;
            return g === 0 ? 0 : g;
          }, v.calculate = function(u, S, g) {
            if (u === "??")
              return v.exists(S) ? S : g;
            if (typeof S == "string" || typeof g == "string") {
              if (u === "+")
                return (S = v.exists(S) ? S : "") + (v.exists(g) ? g : "");
            } else
              switch (u) {
                case "^":
                  return Math.pow(S, g);
                case "*":
                  return S * g;
                case "/":
                  return S / g;
                case "%":
                  return S % g;
                case "+":
                  return S + g;
                case "-":
                  return S - g;
              }
            switch (u) {
              case "<":
                return S < g;
              case "<=":
                return S <= g;
              case ">":
                return S > g;
              case ">=":
                return S >= g;
              case "==":
                return S === g;
              case "!=":
                return S !== g;
              case "&&":
                return S && g;
              case "||":
                return S || g;
            }
            return null;
          }, v.exists = function(u) {
            return u != null;
          };
        }, 9926: () => {
        }, 5688: () => {
        }, 9708: () => {
        }, 1152: () => {
        }, 443: () => {
        }, 9848: () => {
        } }, z = {}, function $(m) {
          var v = z[m];
          if (v !== void 0)
            return v.exports;
          var u = z[m] = { exports: {} };
          return j[m](u, u.exports, $), u.exports;
        }(5107);
        var j, z;
      });
    }, d3b7: function(F, G, o) {
      var j = o("00ee"), z = o("6eeb"), $ = o("b041");
      j || z(Object.prototype, "toString", $, { unsafe: !0 });
    }, d44e: function(F, G, o) {
      var j = o("9bf2").f, z = o("1a2d"), $ = o("b622"), m = $("toStringTag");
      F.exports = function(v, u, S) {
        v && !S && (v = v.prototype), v && !z(v, m) && j(v, m, { configurable: !0, value: u });
      };
    }, d4c3: function(F, G, o) {
      var j = o("342f"), z = o("da84");
      F.exports = /ipad|iphone|ipod/i.test(j) && z.Pebble !== void 0;
    }, d769: function(F, G, o) {
      function j(z, $) {
        if (z == null)
          return {};
        var m, v, u = {}, S = Object.keys(z);
        for (v = 0; v < S.length; v++)
          m = S[v], $.indexOf(m) >= 0 || (u[m] = z[m]);
        return u;
      }
      o("b64b"), F.exports = j, F.exports.__esModule = !0, F.exports.default = F.exports;
    }, d784: function(F, G, o) {
      o("ac1f");
      var j = o("e330"), z = o("6eeb"), $ = o("9263"), m = o("d039"), v = o("b622"), u = o("9112"), S = v("species"), g = RegExp.prototype;
      F.exports = function(w, a, f, y) {
        var l = v(w), c = !m(function() {
          var k = {};
          return k[l] = function() {
            return 7;
          }, ""[w](k) != 7;
        }), s = c && !m(function() {
          var k = !1, d = /a/;
          return w === "split" && (d = {}, d.constructor = {}, d.constructor[S] = function() {
            return d;
          }, d.flags = "", d[l] = /./[l]), d.exec = function() {
            return k = !0, null;
          }, d[l](""), !k;
        });
        if (!c || !s || f) {
          var b = j(/./[l]), h = a(l, ""[w], function(k, d, O, M, L) {
            var x = j(k), T = d.exec;
            return T === $ || T === g.exec ? c && !L ? { done: !0, value: b(d, O, M) } : { done: !0, value: x(O, d, M) } : { done: !1 };
          });
          z(String.prototype, w, h[0]), z(g, l, h[1]);
        }
        y && u(g[l], "sham", !0);
      };
    }, d81d: function(F, G, o) {
      var j = o("23e7"), z = o("b727").map, $ = o("1dde"), m = $("map");
      j({ target: "Array", proto: !0, forced: !m }, { map: function(v) {
        return z(this, v, arguments.length > 1 ? arguments[1] : void 0);
      } });
    }, d9b5: function(F, G, o) {
      var j = o("da84"), z = o("d066"), $ = o("1626"), m = o("3a9b"), v = o("fdbf"), u = j.Object;
      F.exports = v ? function(S) {
        return typeof S == "symbol";
      } : function(S) {
        var g = z("Symbol");
        return $(g) && m(g.prototype, u(S));
      };
    }, da0c: function(F, G, o) {
      var j = o("24fb");
      G = j(!1), G.push([F.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700,800&display=swap);"]), G.push([F.i, "@import url(https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700,800&display=swap);"]), G.push([F.i, `/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com */

/*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */html{-moz-tab-size:4;-o-tab-size:4;tab-size:4;line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji}hr{height:0;color:inherit}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}button{background-color:transparent;background-image:none}fieldset,ol,ul{margin:0;padding:0}ol,ul{list-style:none}html{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{font-family:inherit;line-height:inherit}*,:after,:before{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input:-ms-input-placeholder,textarea:-ms-input-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{padding:0;line-height:inherit;color:inherit}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}*,:after,:before{--tw-border-opacity:1;border-color:rgba(229,231,235,var(--tw-border-opacity))}#psaccounts .acc-pointer-events-none{pointer-events:none}#psaccounts .acc-fixed{position:fixed}#psaccounts .acc-absolute{position:absolute}#psaccounts .acc-relative{position:relative}#psaccounts .acc-inset-0{top:0;right:0;bottom:0;left:0}#psaccounts .acc-top-4{top:1rem}#psaccounts .acc-top-full{top:100%}#psaccounts .acc-right-0{right:0}#psaccounts .acc-right-4{right:1rem}#psaccounts .acc-z-10{z-index:10}#psaccounts .acc-z-50{z-index:50}#psaccounts .acc-z-1500{z-index:1500}#psaccounts .acc-m-0{margin:0}#psaccounts .acc-mx-4{margin-left:1rem;margin-right:1rem}#psaccounts .acc-mt-1{margin-top:.25rem}#psaccounts .acc-mt-2{margin-top:.5rem}#psaccounts .acc-mt-4{margin-top:1rem}#psaccounts .acc-mt-6{margin-top:1.5rem}#psaccounts .acc-mr-2{margin-right:.5rem}#psaccounts .acc-mb-1{margin-bottom:.25rem}#psaccounts .acc-mb-4{margin-bottom:1rem}#psaccounts .acc-ml-10{margin-left:2.5rem}#psaccounts .acc-block{display:block}#psaccounts .acc-inline-block{display:inline-block}#psaccounts .acc-flex{display:flex}#psaccounts .acc-inline-flex{display:inline-flex}#psaccounts .acc-h-5{height:1.25rem}#psaccounts .acc-h-6{height:1.5rem}#psaccounts .acc-h-11{height:2.75rem}#psaccounts .acc-h-full{height:100%}#psaccounts .acc-h-screen{height:100vh}#psaccounts .acc-w-5{width:1.25rem}#psaccounts .acc-w-6{width:1.5rem}#psaccounts .acc-w-11{width:2.75rem}#psaccounts .acc-w-full{width:100%}#psaccounts .acc-w-screen{width:100vw}#psaccounts .acc-flex-1{flex:1 1 0%}#psaccounts .acc-flex-shrink-0{flex-shrink:0}#psaccounts .acc-flex-grow{flex-grow:1}@-webkit-keyframes acc-spin{to{transform:rotate(1turn)}}@keyframes acc-spin{to{transform:rotate(1turn)}}@-webkit-keyframes acc-ping{75%,to{transform:scale(2);opacity:0}}@keyframes acc-ping{75%,to{transform:scale(2);opacity:0}}@-webkit-keyframes acc-pulse{50%{opacity:.5}}@keyframes acc-pulse{50%{opacity:.5}}@-webkit-keyframes acc-bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@keyframes acc-bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}#psaccounts .acc-cursor-pointer{cursor:pointer}#psaccounts .disabled\\:acc-cursor-not-allowed:disabled{cursor:not-allowed}#psaccounts .acc-select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#psaccounts .acc-appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}#psaccounts .acc-flex-row{flex-direction:row}#psaccounts .acc-flex-col{flex-direction:column}#psaccounts .acc-items-start{align-items:flex-start}#psaccounts .acc-items-center{align-items:center}#psaccounts .acc-justify-center{justify-content:center}#psaccounts .acc-overflow-hidden{overflow:hidden}#psaccounts .acc-whitespace-nowrap{white-space:nowrap}#psaccounts .acc-break-words{overflow-wrap:break-word}#psaccounts .acc-rounded{border-radius:.25rem}#psaccounts .acc-rounded-lg{border-radius:.5rem}#psaccounts .acc-rounded-full{border-radius:9999px}#psaccounts .acc-rounded-r-none{border-top-right-radius:0;border-bottom-right-radius:0}#psaccounts .acc-rounded-l-none{border-top-left-radius:0;border-bottom-left-radius:0}#psaccounts .acc-border-0{border-width:0}#psaccounts .acc-border{border-width:1px}#psaccounts .acc-border-transparent{border-color:transparent}#psaccounts .acc-border-purple-500{--tw-border-opacity:1;border-color:rgba(68,44,199,var(--tw-border-opacity))}#psaccounts .acc-border-grey-200{--tw-border-opacity:1;border-color:rgba(225,224,235,var(--tw-border-opacity))}#psaccounts .acc-border-grey-500{--tw-border-opacity:1;border-color:rgba(200,215,228,var(--tw-border-opacity))}#psaccounts .acc-border-success-500{--tw-border-opacity:1;border-color:rgba(33,131,77,var(--tw-border-opacity))}#psaccounts .acc-border-warning-500{--tw-border-opacity:1;border-color:rgba(255,160,0,var(--tw-border-opacity))}#psaccounts .acc-border-danger-500{--tw-border-opacity:1;border-color:rgba(213,52,60,var(--tw-border-opacity))}#psaccounts .acc-border-info-500{--tw-border-opacity:1;border-color:rgba(23,78,239,var(--tw-border-opacity))}#psaccounts .disabled\\:acc-border-purple-100:disabled{--tw-border-opacity:1;border-color:rgba(199,192,238,var(--tw-border-opacity))}#psaccounts .disabled\\:acc-border-grey-100:disabled{--tw-border-opacity:1;border-color:rgba(237,238,240,var(--tw-border-opacity))}#psaccounts .acc-bg-transparent{background-color:transparent}#psaccounts .acc-bg-black{--tw-bg-opacity:1;background-color:rgba(0,0,0,var(--tw-bg-opacity))}#psaccounts .acc-bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}#psaccounts .acc-bg-purple-500{--tw-bg-opacity:1;background-color:rgba(68,44,199,var(--tw-bg-opacity))}#psaccounts .acc-bg-success-50{--tw-bg-opacity:1;background-color:rgba(228,240,234,var(--tw-bg-opacity))}#psaccounts .acc-bg-success-500{--tw-bg-opacity:1;background-color:rgba(33,131,77,var(--tw-bg-opacity))}#psaccounts .acc-bg-warning-50{--tw-bg-opacity:1;background-color:rgba(255,244,224,var(--tw-bg-opacity))}#psaccounts .acc-bg-danger-50{--tw-bg-opacity:1;background-color:rgba(250,231,232,var(--tw-bg-opacity))}#psaccounts .acc-bg-info-50{--tw-bg-opacity:1;background-color:rgba(227,234,253,var(--tw-bg-opacity))}#psaccounts .hover\\:acc-bg-purple-500:hover{--tw-bg-opacity:1;background-color:rgba(68,44,199,var(--tw-bg-opacity))}#psaccounts .hover\\:acc-bg-purple-700:hover{--tw-bg-opacity:1;background-color:rgba(53,33,186,var(--tw-bg-opacity))}#psaccounts .hover\\:acc-bg-grey-100:hover{--tw-bg-opacity:1;background-color:rgba(237,238,240,var(--tw-bg-opacity))}#psaccounts .active\\:acc-bg-purple-900:active{--tw-bg-opacity:1;background-color:rgba(31,16,166,var(--tw-bg-opacity))}#psaccounts .active\\:acc-bg-grey-400:active{--tw-bg-opacity:1;background-color:rgba(210,212,217,var(--tw-bg-opacity))}#psaccounts .disabled\\:acc-bg-purple-50:disabled{--tw-bg-opacity:1;background-color:rgba(233,230,248,var(--tw-bg-opacity))}#psaccounts .acc-bg-opacity-50{--tw-bg-opacity:0.5}#psaccounts .acc-p-0{padding:0}#psaccounts .acc-p-4{padding:1rem}#psaccounts .acc-p-6{padding:1.5rem}#psaccounts .acc-p-0\\.5{padding:.125rem}#psaccounts .acc-px-2{padding-left:.5rem;padding-right:.5rem}#psaccounts .acc-px-4{padding-left:1rem;padding-right:1rem}#psaccounts .acc-px-6{padding-left:1.5rem;padding-right:1.5rem}#psaccounts .acc-py-1{padding-top:.25rem;padding-bottom:.25rem}#psaccounts .acc-py-2{padding-top:.5rem;padding-bottom:.5rem}#psaccounts .acc-py-3{padding-top:.75rem;padding-bottom:.75rem}#psaccounts .acc-pb-6{padding-bottom:1.5rem}#psaccounts .acc-text-left{text-align:left}#psaccounts .acc-text-center{text-align:center}#psaccounts .acc-align-middle{vertical-align:middle}#psaccounts .acc-font-primary{font-family:Inter,Helvetica,Verdana,sans-serif}#psaccounts .acc-font-secondary{font-family:Roboto,Helvetica,Verdana,sans-serif}#psaccounts .acc-text-sm{font-size:.875rem;line-height:1.25rem}#psaccounts .acc-text-base{font-size:1rem;line-height:1.5rem}#psaccounts .acc-text-xl{font-size:1.25rem;line-height:1.75rem}#psaccounts .acc-font-semibold{font-weight:600}#psaccounts .acc-font-bold{font-weight:700}#psaccounts .acc-leading-3{line-height:.75rem}#psaccounts .acc-leading-6{line-height:1.5rem}#psaccounts .acc-text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}#psaccounts .acc-text-purple-500{--tw-text-opacity:1;color:rgba(68,44,199,var(--tw-text-opacity))}#psaccounts .acc-text-grey-600{--tw-text-opacity:1;color:rgba(105,113,128,var(--tw-text-opacity))}#psaccounts .acc-text-grey-900{--tw-text-opacity:1;color:rgba(54,58,65,var(--tw-text-opacity))}#psaccounts .acc-text-success-500{--tw-text-opacity:1;color:rgba(33,131,77,var(--tw-text-opacity))}#psaccounts .acc-text-warning-500{--tw-text-opacity:1;color:rgba(255,160,0,var(--tw-text-opacity))}#psaccounts .acc-text-danger-500{--tw-text-opacity:1;color:rgba(213,52,60,var(--tw-text-opacity))}#psaccounts .acc-text-info-500{--tw-text-opacity:1;color:rgba(23,78,239,var(--tw-text-opacity))}#psaccounts .hover\\:acc-text-white:hover{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}#psaccounts .focus\\:acc-text-grey-600:focus,#psaccounts .hover\\:acc-text-grey-600:hover{--tw-text-opacity:1;color:rgba(105,113,128,var(--tw-text-opacity))}#psaccounts .disabled\\:acc-text-purple-100:disabled{--tw-text-opacity:1;color:rgba(199,192,238,var(--tw-text-opacity))}#psaccounts .disabled\\:acc-text-grey-400:disabled{--tw-text-opacity:1;color:rgba(210,212,217,var(--tw-text-opacity))}#psaccounts .acc-underline{text-decoration:underline}#psaccounts .acc-opacity-70{opacity:.7}*,:after,:before{--tw-shadow:0 0 transparent}#psaccounts .acc-shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)}#psaccounts .acc-shadow,#psaccounts .acc-shadow-2xl{box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}#psaccounts .acc-shadow-2xl{--tw-shadow:0 25px 50px -12px rgba(0,0,0,0.25)}#psaccounts .acc-outline-none,#psaccounts .focus\\:acc-outline-none:focus{outline:2px solid transparent;outline-offset:2px}*,:after,:before{--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,0.5);--tw-ring-offset-shadow:0 0 transparent;--tw-ring-shadow:0 0 transparent}#psaccounts .focus\\:acc-ring-0:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(var(--tw-ring-offset-width)) var(--tw-ring-color)}#psaccounts .focus\\:acc-ring-0:focus,#psaccounts .focus\\:acc-ring:focus{box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)}#psaccounts .focus\\:acc-ring:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)}#psaccounts .focus\\:acc-ring-blue-focus:focus{--tw-ring-opacity:1;--tw-ring-color:rgba(69,143,255,var(--tw-ring-opacity))}#psaccounts .acc-ring-offset-2{--tw-ring-offset-width:2px}#psaccounts .acc-blur-0{--tw-blur:blur(0)}#psaccounts .acc-transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}@media (min-width:768px){#psaccounts .md\\:acc-m-0{margin:0}#psaccounts .md\\:acc-mt-0{margin-top:0}#psaccounts .md\\:acc-mr-2{margin-right:.5rem}#psaccounts .md\\:acc-mr-3{margin-right:.75rem}#psaccounts .md\\:acc-flex-row{flex-direction:row}#psaccounts .md\\:acc-text-left{text-align:left}}`, ""]), F.exports = G;
    }, da84: function(F, G, o) {
      (function(j) {
        var z = function($) {
          return $ && $.Math == Math && $;
        };
        F.exports = z(typeof globalThis == "object" && globalThis) || z(typeof window == "object" && window) || z(typeof self == "object" && self) || z(typeof j == "object" && j) || function() {
          return this;
        }() || Function("return this")();
      }).call(this, o("c8ba"));
    }, dbb4: function(F, G, o) {
      var j = o("23e7"), z = o("83ab"), $ = o("56ef"), m = o("fc6a"), v = o("06cf"), u = o("8418");
      j({ target: "Object", stat: !0, sham: !z }, { getOwnPropertyDescriptors: function(S) {
        for (var g, w, a = m(S), f = v.f, y = $(a), l = {}, c = 0; y.length > c; )
          w = f(a, g = y[c++]), w !== void 0 && u(l, g, w);
        return l;
      } });
    }, dc4a: function(F, G, o) {
      var j = o("59ed");
      F.exports = function(z, $) {
        var m = z[$];
        return m == null ? void 0 : j(m);
      };
    }, ddb0: function(F, G, o) {
      var j = o("da84"), z = o("fdbc"), $ = o("785a"), m = o("e260"), v = o("9112"), u = o("b622"), S = u("iterator"), g = u("toStringTag"), w = m.values, a = function(y, l) {
        if (y) {
          if (y[S] !== w)
            try {
              v(y, S, w);
            } catch {
              y[S] = w;
            }
          if (y[g] || v(y, g, l), z[l]) {
            for (var c in m)
              if (y[c] !== m[c])
                try {
                  v(y, c, m[c]);
                } catch {
                  y[c] = m[c];
                }
          }
        }
      };
      for (var f in z)
        a(j[f] && j[f].prototype, f);
      a($, "DOMTokenList");
    }, df75: function(F, G, o) {
      var j = o("ca84"), z = o("7839");
      F.exports = Object.keys || function($) {
        return j($, z);
      };
    }, e01a: function(F, G, o) {
      var j = o("23e7"), z = o("83ab"), $ = o("da84"), m = o("e330"), v = o("1a2d"), u = o("1626"), S = o("3a9b"), g = o("577e"), w = o("9bf2").f, a = o("e893"), f = $.Symbol, y = f && f.prototype;
      if (z && u(f) && (!("description" in y) || f().description !== void 0)) {
        var l = {}, c = function() {
          var M = arguments.length < 1 || arguments[0] === void 0 ? void 0 : g(arguments[0]), L = S(y, this) ? new f(M) : M === void 0 ? f() : f(M);
          return M === "" && (l[L] = !0), L;
        };
        a(c, f), c.prototype = y, y.constructor = c;
        var s = String(f("test")) == "Symbol(test)", b = m(y.toString), h = m(y.valueOf), k = /^Symbol\((.*)\)[^)]+$/, d = m("".replace), O = m("".slice);
        w(y, "description", { configurable: !0, get: function() {
          var M = h(this), L = b(M);
          if (v(l, M))
            return "";
          var x = s ? O(L, 7, -1) : d(L, k, "$1");
          return x === "" ? void 0 : x;
        } }), j({ global: !0, forced: !0 }, { Symbol: c });
      }
    }, e163: function(F, G, o) {
      var j = o("da84"), z = o("1a2d"), $ = o("1626"), m = o("7b0b"), v = o("f772"), u = o("e177"), S = v("IE_PROTO"), g = j.Object, w = g.prototype;
      F.exports = u ? g.getPrototypeOf : function(a) {
        var f = m(a);
        if (z(f, S))
          return f[S];
        var y = f.constructor;
        return $(y) && f instanceof y ? y.prototype : f instanceof g ? w : null;
      };
    }, e177: function(F, G, o) {
      var j = o("d039");
      F.exports = !j(function() {
        function z() {
        }
        return z.prototype.constructor = null, Object.getPrototypeOf(new z()) !== z.prototype;
      });
    }, e260: function(F, G, o) {
      var j = o("fc6a"), z = o("44d2"), $ = o("3f8c"), m = o("69f3"), v = o("9bf2").f, u = o("7dd0"), S = o("c430"), g = o("83ab"), w = "Array Iterator", a = m.set, f = m.getterFor(w);
      F.exports = u(Array, "Array", function(l, c) {
        a(this, { type: w, target: j(l), index: 0, kind: c });
      }, function() {
        var l = f(this), c = l.target, s = l.kind, b = l.index++;
        return !c || b >= c.length ? (l.target = void 0, { value: void 0, done: !0 }) : s == "keys" ? { value: b, done: !1 } : s == "values" ? { value: c[b], done: !1 } : { value: [b, c[b]], done: !1 };
      }, "values");
      var y = $.Arguments = $.Array;
      if (z("keys"), z("values"), z("entries"), !S && g && y.name !== "values")
        try {
          v(y, "name", { value: "values" });
        } catch {
        }
    }, e2cc: function(F, G, o) {
      var j = o("6eeb");
      F.exports = function(z, $, m) {
        for (var v in $)
          j(z, v, $[v], m);
        return z;
      };
    }, e330: function(F, G) {
      var o = Function.prototype, j = o.bind, z = o.call, $ = j && j.bind(z, z);
      F.exports = j ? function(m) {
        return m && $(m);
      } : function(m) {
        return m && function() {
          return z.apply(m, arguments);
        };
      };
    }, e3db: function(F, G) {
      var o = {}.toString;
      F.exports = Array.isArray || function(j) {
        return o.call(j) == "[object Array]";
      };
    }, e439: function(F, G, o) {
      var j = o("23e7"), z = o("d039"), $ = o("fc6a"), m = o("06cf").f, v = o("83ab"), u = z(function() {
        m(1);
      }), S = !v || u;
      j({ target: "Object", stat: !0, forced: S, sham: !v }, { getOwnPropertyDescriptor: function(g, w) {
        return m($(g), w);
      } });
    }, e538: function(F, G, o) {
      var j = o("b622");
      G.f = j;
    }, e667: function(F, G) {
      F.exports = function(o) {
        try {
          return { error: !1, value: o() };
        } catch (j) {
          return { error: !0, value: j };
        }
      };
    }, e694: function(F, G, o) {
      var j = o("12c0").default, z = o("f3e1").default, $ = ["class", "staticClass", "style", "staticStyle", "attrs"];
      o("cca6"), o("99af"), F.exports = { functional: !0, render: function(m, v) {
        var u = v._c, S = (v._v, v.data), g = v.children, w = g === void 0 ? [] : g, a = S.class, f = S.staticClass, y = S.style, l = S.staticStyle, c = S.attrs, s = c === void 0 ? {} : c, b = z(S, $);
        return u("svg", j({ class: [a, f], style: [y, l], attrs: Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" }, s) }, b), w.concat([u("path", { attrs: { d: "M0 0h24v24H0z", fill: "none" } }), u("path", { attrs: { d: "M8.363 12c0-1-.816-1.816-1.816-1.816S4.727 11 4.727 12s.82 1.816 1.82 1.816S8.363 13 8.363 12zm1.82 0c0 1 .817 1.816 1.817 1.816S13.816 13 13.816 12 13 10.184 12 10.184 10.184 11 10.184 12zm5.454 0c0 1 .816 1.816 1.816 1.816S19.273 13 19.273 12s-.82-1.816-1.82-1.816S15.637 11 15.637 12zm0 0" } })]));
      } };
    }, e6cf: function(F, G, o) {
      var j, z, $, m, v = o("23e7"), u = o("c430"), S = o("da84"), g = o("d066"), w = o("c65b"), a = o("fea9"), f = o("6eeb"), y = o("e2cc"), l = o("d2bb"), c = o("d44e"), s = o("2626"), b = o("59ed"), h = o("1626"), k = o("861d"), d = o("19aa"), O = o("8925"), M = o("2266"), L = o("1c7e"), x = o("4840"), T = o("2cf4").set, N = o("b575"), Y = o("cdf9"), ot = o("44de"), at = o("f069"), St = o("e667"), wt = o("01b4"), Nt = o("69f3"), It = o("94ca"), xe = o("b622"), mt = o("6069"), pt = o("605d"), Et = o("2d00"), Mt = xe("species"), xt = "Promise", Yt = Nt.getterFor(xt), ce = Nt.set, ye = Nt.getterFor(xt), fe = a && a.prototype, Oe = a, be = fe, ar = S.TypeError, fr = S.document, Vr = S.process, en = at.f, rn = en, sr = !!(fr && fr.createEvent && S.dispatchEvent), zr = h(S.PromiseRejectionEvent), We = "unhandledrejection", fn = "rejectionhandled", _n = 0, P = 1, D = 2, W = 1, et = 2, ct = !1, yt = It(xt, function() {
        var Pt = O(Oe), Ut = Pt !== String(Oe);
        if (!Ut && Et === 66 || u && !be.finally)
          return !0;
        if (Et >= 51 && /native code/.test(Pt))
          return !1;
        var te = new Oe(function(tr) {
          tr(1);
        }), Jt = function(tr) {
          tr(function() {
          }, function() {
          });
        }, He = te.constructor = {};
        return He[Mt] = Jt, ct = te.then(function() {
        }) instanceof Jt, !ct || !Ut && mt && !zr;
      }), Wt = yt || !L(function(Pt) {
        Oe.all(Pt).catch(function() {
        });
      }), Se = function(Pt) {
        var Ut;
        return !(!k(Pt) || !h(Ut = Pt.then)) && Ut;
      }, Pe = function(Pt, Ut) {
        var te, Jt, He, tr = Ut.value, Dt = Ut.state == P, Vt = Dt ? Pt.ok : Pt.fail, ue = Pt.resolve, de = Pt.reject, Ke = Pt.domain;
        try {
          Vt ? (Dt || (Ut.rejection === et && kr(Ut), Ut.rejection = W), Vt === !0 ? te = tr : (Ke && Ke.enter(), te = Vt(tr), Ke && (Ke.exit(), He = !0)), te === Pt.promise ? de(ar("Promise-chain cycle")) : (Jt = Se(te)) ? w(Jt, te, ue, de) : ue(te)) : de(tr);
        } catch (xn) {
          Ke && !He && Ke.exit(), de(xn);
        }
      }, we = function(Pt, Ut) {
        Pt.notified || (Pt.notified = !0, N(function() {
          for (var te, Jt = Pt.reactions; te = Jt.get(); )
            Pe(te, Pt);
          Pt.notified = !1, Ut && !Pt.rejection && ur(Pt);
        }));
      }, ke = function(Pt, Ut, te) {
        var Jt, He;
        sr ? (Jt = fr.createEvent("Event"), Jt.promise = Ut, Jt.reason = te, Jt.initEvent(Pt, !1, !0), S.dispatchEvent(Jt)) : Jt = { promise: Ut, reason: te }, !zr && (He = S["on" + Pt]) ? He(Jt) : Pt === We && ot("Unhandled promise rejection", te);
      }, ur = function(Pt) {
        w(T, S, function() {
          var Ut, te = Pt.facade, Jt = Pt.value, He = Ce(Pt);
          if (He && (Ut = St(function() {
            pt ? Vr.emit("unhandledRejection", Jt, te) : ke(We, te, Jt);
          }), Pt.rejection = pt || Ce(Pt) ? et : W, Ut.error))
            throw Ut.value;
        });
      }, Ce = function(Pt) {
        return Pt.rejection !== W && !Pt.parent;
      }, kr = function(Pt) {
        w(T, S, function() {
          var Ut = Pt.facade;
          pt ? Vr.emit("rejectionHandled", Ut) : ke(fn, Ut, Pt.value);
        });
      }, Ge = function(Pt, Ut, te) {
        return function(Jt) {
          Pt(Ut, Jt, te);
        };
      }, Jr = function(Pt, Ut, te) {
        Pt.done || (Pt.done = !0, te && (Pt = te), Pt.value = Ut, Pt.state = D, we(Pt, !0));
      }, dr = function(Pt, Ut, te) {
        if (!Pt.done) {
          Pt.done = !0, te && (Pt = te);
          try {
            if (Pt.facade === Ut)
              throw ar("Promise can't be resolved itself");
            var Jt = Se(Ut);
            Jt ? N(function() {
              var He = { done: !1 };
              try {
                w(Jt, Ut, Ge(dr, He, Pt), Ge(Jr, He, Pt));
              } catch (tr) {
                Jr(He, tr, Pt);
              }
            }) : (Pt.value = Ut, Pt.state = P, we(Pt, !1));
          } catch (He) {
            Jr({ done: !1 }, He, Pt);
          }
        }
      };
      if (yt && (Oe = function(Pt) {
        d(this, be), b(Pt), w(j, this);
        var Ut = Yt(this);
        try {
          Pt(Ge(dr, Ut), Ge(Jr, Ut));
        } catch (te) {
          Jr(Ut, te);
        }
      }, be = Oe.prototype, j = function(Pt) {
        ce(this, { type: xt, done: !1, notified: !1, parent: !1, reactions: new wt(), rejection: !1, state: _n, value: void 0 });
      }, j.prototype = y(be, { then: function(Pt, Ut) {
        var te = ye(this), Jt = en(x(this, Oe));
        return te.parent = !0, Jt.ok = !h(Pt) || Pt, Jt.fail = h(Ut) && Ut, Jt.domain = pt ? Vr.domain : void 0, te.state == _n ? te.reactions.add(Jt) : N(function() {
          Pe(Jt, te);
        }), Jt.promise;
      }, catch: function(Pt) {
        return this.then(void 0, Pt);
      } }), z = function() {
        var Pt = new j(), Ut = Yt(Pt);
        this.promise = Pt, this.resolve = Ge(dr, Ut), this.reject = Ge(Jr, Ut);
      }, at.f = en = function(Pt) {
        return Pt === Oe || Pt === $ ? new z(Pt) : rn(Pt);
      }, !u && h(a) && fe !== Object.prototype)) {
        m = fe.then, ct || (f(fe, "then", function(Pt, Ut) {
          var te = this;
          return new Oe(function(Jt, He) {
            w(m, te, Jt, He);
          }).then(Pt, Ut);
        }, { unsafe: !0 }), f(fe, "catch", be.catch, { unsafe: !0 }));
        try {
          delete fe.constructor;
        } catch {
        }
        l && l(fe, be);
      }
      v({ global: !0, wrap: !0, forced: yt }, { Promise: Oe }), c(Oe, xt, !1, !0), s(xt), $ = g(xt), v({ target: xt, stat: !0, forced: yt }, { reject: function(Pt) {
        var Ut = en(this);
        return w(Ut.reject, void 0, Pt), Ut.promise;
      } }), v({ target: xt, stat: !0, forced: u || yt }, { resolve: function(Pt) {
        return Y(u && this === $ ? Oe : this, Pt);
      } }), v({ target: xt, stat: !0, forced: Wt }, { all: function(Pt) {
        var Ut = this, te = en(Ut), Jt = te.resolve, He = te.reject, tr = St(function() {
          var Dt = b(Ut.resolve), Vt = [], ue = 0, de = 1;
          M(Pt, function(Ke) {
            var xn = ue++, Lt = !1;
            de++, w(Dt, Ut, Ke).then(function(je) {
              Lt || (Lt = !0, Vt[xn] = je, --de || Jt(Vt));
            }, He);
          }), --de || Jt(Vt);
        });
        return tr.error && He(tr.value), te.promise;
      }, race: function(Pt) {
        var Ut = this, te = en(Ut), Jt = te.reject, He = St(function() {
          var tr = b(Ut.resolve);
          M(Pt, function(Dt) {
            w(tr, Ut, Dt).then(te.resolve, Jt);
          });
        });
        return He.error && Jt(He.value), te.promise;
      } });
    }, e893: function(F, G, o) {
      var j = o("1a2d"), z = o("56ef"), $ = o("06cf"), m = o("9bf2");
      F.exports = function(v, u, S) {
        for (var g = z(u), w = m.f, a = $.f, f = 0; f < g.length; f++) {
          var y = g[f];
          j(v, y) || S && j(S, y) || w(v, y, a(u, y));
        }
      };
    }, e8b5: function(F, G, o) {
      var j = o("c6b6");
      F.exports = Array.isArray || function(z) {
        return j(z) == "Array";
      };
    }, e95a: function(F, G, o) {
      var j = o("b622"), z = o("3f8c"), $ = j("iterator"), m = Array.prototype;
      F.exports = function(v) {
        return v !== void 0 && (z.Array === v || m[$] === v);
      };
    }, e9c4: function(F, G, o) {
      var j = o("23e7"), z = o("da84"), $ = o("d066"), m = o("2ba4"), v = o("e330"), u = o("d039"), S = z.Array, g = $("JSON", "stringify"), w = v(/./.exec), a = v("".charAt), f = v("".charCodeAt), y = v("".replace), l = v(1 .toString), c = /[\uD800-\uDFFF]/g, s = /^[\uD800-\uDBFF]$/, b = /^[\uDC00-\uDFFF]$/, h = function(d, O, M) {
        var L = a(M, O - 1), x = a(M, O + 1);
        return w(s, d) && !w(b, x) || w(b, d) && !w(s, L) ? "\\u" + l(f(d, 0), 16) : d;
      }, k = u(function() {
        return g("\uDF06\uD834") !== '"\\udf06\\ud834"' || g("\uDEAD") !== '"\\udead"';
      });
      g && j({ target: "JSON", stat: !0, forced: k }, { stringify: function(d, O, M) {
        for (var L = 0, x = arguments.length, T = S(x); L < x; L++)
          T[L] = arguments[L];
        var N = m(g, null, T);
        return typeof N == "string" ? y(N, c, h) : N;
      } });
    }, edd4: function(F) {
      F.exports = JSON.parse(`{"psaccounts":{"accountManager":{"errorInstallEnable":"Something went wrong. Please try again."},"alert":{"ps_accounts":{"enable":{"title":"Activate the PrestaShop Account module","message":"You need the PrestaShop account module to continue setting up this module.","action":"Activate","loading":"The PrestaShop Account module is currently being activated..."},"install":{"title":"Install the PrestaShop Account module","message":"You need the PrestaShop account module to continue setting up this module.","action":"Install","loading":"The PrestaShop Account module is currently being installed..."},"update":{"title":"Update PrestaShop Accounts module","message":"A new version of PrestaShop Accounts is available, please update the module to continue using the services","action":"Update","loading":"The PrestaShop Account module is currently being updated..."}},"ps_eventbus":{"enable":{"title":"Activate the PrestaShop Event Bus module","message":"You need the PrestaShop Event Bus module to continue setting up this module.","action":"Activate","loading":"The PrestaShop Event Bus module is currently being activated..."},"install":{"title":"Install the Prestashop Event Bus module","message":"You need the Prestashop Event Bus module to continue setting up this module.","action":"Install","loading":"The Prestashop Event Bus module is currently being installed..."}}},"alertShopDomainShouldExists":{"title":"Shop URL not filled in!","message":"Only shop with an assigned URL can be associated to a PrestaShop account.<br />The following shops don't have an assigned URL: "},"account":{"title":"Associate your shop with a PrestaShop account | Associate your shops with a PrestaShop account","authorize":"You can only associate your shop with one account. So be sure to choose the right one!","authorized":"Your shop is associated with the PrestaShop account: | Your shops is associated with the PrestaShop account:","authorizedPartially":"Your shops are partially associated with a PrestaShop Account","authorizedSeveral":"Your shops are associated with several PrestaShop account","connectButton":"Associate","reonboardButton":"Re-associate","disconnectButton":"Use another account","moduleUpdateInformation":"<strong>New update:</strong> you can manage your associated shops.<br /> Please reassociate yourself using <strong>the same email address</strong> to benefit from this update.<br /> Other module updates may be available in the Updates tab of the module manager.","emailNotVerified":{"title":"A confirmation email has been sent.","description":"Check your inbox and click on the link to activate your account."},"sendEmail":"Send it again","needToBeAdmin":"In order to proceed you need to be administrator of the shop","pleaseContact":"Please contact","manageAccountButton":"View my associated shops","unlinkButton":"Dissociate"}}}`);
    }, f069: function(F, G, o) {
      var j = o("59ed"), z = function($) {
        var m, v;
        this.promise = new $(function(u, S) {
          if (m !== void 0 || v !== void 0)
            throw TypeError("Bad Promise constructor");
          m = u, v = S;
        }), this.resolve = j(m), this.reject = j(v);
      };
      F.exports.f = function($) {
        return new z($);
      };
    }, f36a: function(F, G, o) {
      var j = o("e330");
      F.exports = j([].slice);
    }, f3e1: function(F, G, o) {
      o("a4d3");
      var j = o("d769");
      function z($, m) {
        if ($ == null)
          return {};
        var v, u, S = j($, m);
        if (Object.getOwnPropertySymbols) {
          var g = Object.getOwnPropertySymbols($);
          for (u = 0; u < g.length; u++)
            v = g[u], m.indexOf(v) >= 0 || Object.prototype.propertyIsEnumerable.call($, v) && (S[v] = $[v]);
        }
        return S;
      }
      F.exports = z, F.exports.__esModule = !0, F.exports.default = F.exports;
    }, f5df: function(F, G, o) {
      var j = o("da84"), z = o("00ee"), $ = o("1626"), m = o("c6b6"), v = o("b622"), u = v("toStringTag"), S = j.Object, g = m(function() {
        return arguments;
      }()) == "Arguments", w = function(a, f) {
        try {
          return a[f];
        } catch {
        }
      };
      F.exports = z ? m : function(a) {
        var f, y, l;
        return a === void 0 ? "Undefined" : a === null ? "Null" : typeof (y = w(f = S(a), u)) == "string" ? y : g ? m(f) : (l = m(f)) == "Object" && $(f.callee) ? "Arguments" : l;
      };
    }, f693: function(F) {
      F.exports = JSON.parse(`{"psaccounts":{"accountManager":{"errorInstallEnable":"Une erreur s'est produite. Veuillez r\xE9essayer."},"alert":{"ps_accounts":{"enable":{"title":"Activez le module PrestaShop Account","message":"Le module PrestaShop Account est n\xE9cessaire pour continuer la configuration de ce module.","action":"Activer","loading":"Activation du module PrestaShop Account en cours..."},"install":{"title":"Installez le module PrestaShop Account","message":"Le module PrestaShop Account est n\xE9cessaire pour continuer la configuration de ce module.","action":"Installer","loading":"Installation du module PrestaShop Account en cours..."},"update":{"title":"Mettez \xE0 jour le module PrestaShop Account","message":"Une nouvelle version de PrestaShop Account est disponible, merci de mettre \xE0 jour le module pour continuer d'utiliser les services","action":"Mettre \xE0 jour","loading":"Le module Compte PrestaShop est actuellement en cours de mise \xE0 jour..."}},"ps_eventbus":{"enable":{"title":"Activez le module PrestaShop Event Bus","message":"Vous avez besoin du module PrestaShop Event Bus pour continuer \xE0 configurer ce module.","action":"Activer","loading":"Le module PrestaShop Event Bus est actuellement en cours d'activation..."},"install":{"title":"Installez le module Prestashop Event Bus","message":"Le module Prestashop Event Bus est n\xE9cessaire pour continuer la configuration de ce module.","action":"Installer","loading":"Installation du module Prestashop Event Bus en cours..."}}},"alertShopDomainShouldExists":{"title":"L'URL de la boutique n'est pas renseign\xE9e !","message":"Seule la boutique avec une URL assign\xE9e peut \xEAtre associ\xE9e \xE0 un compte PrestaShop.<br />Les boutiques suivantes n'ont pas d'URL assign\xE9e : "},"account":{"title":"Associer votre boutique \xE0 un compte PrestaShop | Associer vos boutiques \xE0 un compte PrestaShop","authorize":"Vous ne pouvez associer votre boutique qu'\xE0 un seul compte. Choisissez le bien !","authorized":"Votre boutique est associ\xE9e au compte PrestaShop : | Votre boutique est associ\xE9e au compte PrestaShop :","authorizedPartially":"Vos boutiques sont partiellement associ\xE9es \xE0 un compte PrestaShop","authorizedSeveral":"Vos boutiques sont associ\xE9es \xE0 plusieurs comptes PrestaShop","connectButton":"Associer","reonboardButton":"R\xE9associer","disconnectButton":"Utiliser un autre compte","moduleUpdateInformation":"<strong>Nouvelle mise \xE0 jour :</strong> vous pouvez g\xE9rer vos boutiques associ\xE9es.<br /> Merci de vous r\xE9associer en utilisant <strong>la m\xEAme adresse mail</strong> pour profiter de cette mise \xE0 jour.<br /> D'autres mises \xE0 jour de modules peuvent \xEAtre disponibles dans Gestionnaire de modules onglet Mises \xE0 jour.","emailNotVerified":{"title":"Un courriel de confirmation a \xE9t\xE9 envoy\xE9.","description":"V\xE9rifiez votre bo\xEEte de r\xE9ception et cliquez sur le lien pour activer votre compte."},"sendEmail":"Renvoyer","needToBeAdmin":"Pour continuer, vous devez \xEAtre administrateur de la boutique","pleaseContact":"Merci de contacter","manageAccountButton":"Voir mes boutiques associ\xE9es","unlinkButton":"Dissocier"}}}`);
    }, f772: function(F, G, o) {
      var j = o("5692"), z = o("90e3"), $ = j("keys");
      F.exports = function(m) {
        return $[m] || ($[m] = z(m));
      };
    }, fb15: function(F, G, o) {
      if (o.r(G), o.d(G, "AccountPanel", function() {
        return or;
      }), o.d(G, "init", function() {
        return ns;
      }), o.d(G, "isOnboardingCompleted", function() {
        return es;
      }), o.d(G, "Plugin", function() {
        return Ga;
      }), o.d(G, "PsAccounts", function() {
        return Ha;
      }), o.d(G, "version", function() {
        return rs;
      }), typeof window < "u") {
        var j = window.document.currentScript, z = o("8875");
        j = z(), "currentScript" in document || Object.defineProperty(document, "currentScript", { get: z });
        var $ = j && j.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
        $ && (o.p = $[1]);
      }
      o("b64b"), o("a4d3"), o("4de4"), o("d3b7"), o("e439"), o("159b"), o("dbb4");
      function m(r, _, A) {
        return _ in r ? Object.defineProperty(r, _, { value: A, enumerable: !0, configurable: !0, writable: !0 }) : r[_] = A, r;
      }
      function v(r, _) {
        var A = Object.keys(r);
        if (Object.getOwnPropertySymbols) {
          var U = Object.getOwnPropertySymbols(r);
          _ && (U = U.filter(function(H) {
            return Object.getOwnPropertyDescriptor(r, H).enumerable;
          })), A.push.apply(A, U);
        }
        return A;
      }
      function u(r) {
        for (var _ = 1; _ < arguments.length; _++) {
          var A = arguments[_] != null ? arguments[_] : {};
          _ % 2 ? v(Object(A), !0).forEach(function(U) {
            m(r, U, A[U]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(A)) : v(Object(A)).forEach(function(U) {
            Object.defineProperty(r, U, Object.getOwnPropertyDescriptor(A, U));
          });
        }
        return r;
      }
      var S = o("a026"), g = ["compactDisplay", "currency", "currencyDisplay", "currencySign", "localeMatcher", "notation", "numberingSystem", "signDisplay", "style", "unit", "unitDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits"];
      /*!
       * vue-i18n v8.26.5 
       * (c) 2021 kazuya kawaguchi
       * Released under the MIT License.
       */
      function w(r, _) {
        typeof console < "u" && (console.warn("[vue-i18n] " + r), _ && console.warn(_.stack));
      }
      function a(r, _) {
        typeof console < "u" && (console.error("[vue-i18n] " + r), _ && console.error(_.stack));
      }
      var f = Array.isArray;
      function y(r) {
        return r !== null && typeof r == "object";
      }
      function l(r) {
        return typeof r == "boolean";
      }
      function c(r) {
        return typeof r == "string";
      }
      var s = Object.prototype.toString, b = "[object Object]";
      function h(r) {
        return s.call(r) === b;
      }
      function k(r) {
        return r == null;
      }
      function d(r) {
        return typeof r == "function";
      }
      function O() {
        for (var r = [], _ = arguments.length; _--; )
          r[_] = arguments[_];
        var A = null, U = null;
        return r.length === 1 ? y(r[0]) || f(r[0]) ? U = r[0] : typeof r[0] == "string" && (A = r[0]) : r.length === 2 && (typeof r[0] == "string" && (A = r[0]), (y(r[1]) || f(r[1])) && (U = r[1])), { locale: A, params: U };
      }
      function M(r) {
        return JSON.parse(JSON.stringify(r));
      }
      function L(r, _) {
        if (r.delete(_))
          return r;
      }
      function x(r) {
        var _ = [];
        return r.forEach(function(A) {
          return _.push(A);
        }), _;
      }
      function T(r, _) {
        return !!~r.indexOf(_);
      }
      var N = Object.prototype.hasOwnProperty;
      function Y(r, _) {
        return N.call(r, _);
      }
      function ot(r) {
        for (var _ = arguments, A = Object(r), U = 1; U < arguments.length; U++) {
          var H = _[U];
          if (H != null) {
            var tt = void 0;
            for (tt in H)
              Y(H, tt) && (y(H[tt]) ? A[tt] = ot(A[tt], H[tt]) : A[tt] = H[tt]);
          }
        }
        return A;
      }
      function at(r, _) {
        if (r === _)
          return !0;
        var A = y(r), U = y(_);
        if (!A || !U)
          return !A && !U && String(r) === String(_);
        try {
          var H = f(r), tt = f(_);
          if (H && tt)
            return r.length === _.length && r.every(function(lt, kt) {
              return at(lt, _[kt]);
            });
          if (H || tt)
            return !1;
          var Q = Object.keys(r), it = Object.keys(_);
          return Q.length === it.length && Q.every(function(lt) {
            return at(r[lt], _[lt]);
          });
        } catch {
          return !1;
        }
      }
      function St(r) {
        return r.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
      }
      function wt(r) {
        return r != null && Object.keys(r).forEach(function(_) {
          typeof r[_] == "string" && (r[_] = St(r[_]));
        }), r;
      }
      function Nt(r) {
        r.prototype.hasOwnProperty("$i18n") || Object.defineProperty(r.prototype, "$i18n", { get: function() {
          return this._i18n;
        } }), r.prototype.$t = function(_) {
          for (var A = [], U = arguments.length - 1; U-- > 0; )
            A[U] = arguments[U + 1];
          var H = this.$i18n;
          return H._t.apply(H, [_, H.locale, H._getMessages(), this].concat(A));
        }, r.prototype.$tc = function(_, A) {
          for (var U = [], H = arguments.length - 2; H-- > 0; )
            U[H] = arguments[H + 2];
          var tt = this.$i18n;
          return tt._tc.apply(tt, [_, tt.locale, tt._getMessages(), this, A].concat(U));
        }, r.prototype.$te = function(_, A) {
          var U = this.$i18n;
          return U._te(_, U.locale, U._getMessages(), A);
        }, r.prototype.$d = function(_) {
          for (var A, U = [], H = arguments.length - 1; H-- > 0; )
            U[H] = arguments[H + 1];
          return (A = this.$i18n).d.apply(A, [_].concat(U));
        }, r.prototype.$n = function(_) {
          for (var A, U = [], H = arguments.length - 1; H-- > 0; )
            U[H] = arguments[H + 1];
          return (A = this.$i18n).n.apply(A, [_].concat(U));
        };
      }
      function It(r) {
        function _() {
          this !== this.$root && this.$options.__INTLIFY_META__ && this.$el && this.$el.setAttribute("data-intlify", this.$options.__INTLIFY_META__);
        }
        return r === void 0 && (r = !1), r ? { mounted: _ } : { beforeCreate: function() {
          var A = this.$options;
          if (A.i18n = A.i18n || (A.__i18nBridge || A.__i18n ? {} : null), A.i18n) {
            if (A.i18n instanceof Lt) {
              if (A.__i18nBridge || A.__i18n)
                try {
                  var U = A.i18n && A.i18n.messages ? A.i18n.messages : {}, H = A.__i18nBridge || A.__i18n;
                  H.forEach(function(Rt) {
                    U = ot(U, JSON.parse(Rt));
                  }), Object.keys(U).forEach(function(Rt) {
                    A.i18n.mergeLocaleMessage(Rt, U[Rt]);
                  });
                } catch {
                }
              this._i18n = A.i18n, this._i18nWatcher = this._i18n.watchI18nData();
            } else if (h(A.i18n)) {
              var tt = this.$root && this.$root.$i18n && this.$root.$i18n instanceof Lt ? this.$root.$i18n : null;
              if (tt && (A.i18n.root = this.$root, A.i18n.formatter = tt.formatter, A.i18n.fallbackLocale = tt.fallbackLocale, A.i18n.formatFallbackMessages = tt.formatFallbackMessages, A.i18n.silentTranslationWarn = tt.silentTranslationWarn, A.i18n.silentFallbackWarn = tt.silentFallbackWarn, A.i18n.pluralizationRules = tt.pluralizationRules, A.i18n.preserveDirectiveContent = tt.preserveDirectiveContent), A.__i18nBridge || A.__i18n)
                try {
                  var Q = A.i18n && A.i18n.messages ? A.i18n.messages : {}, it = A.__i18nBridge || A.__i18n;
                  it.forEach(function(Rt) {
                    Q = ot(Q, JSON.parse(Rt));
                  }), A.i18n.messages = Q;
                } catch {
                }
              var lt = A.i18n, kt = lt.sharedMessages;
              kt && h(kt) && (A.i18n.messages = ot(A.i18n.messages, kt)), this._i18n = new Lt(A.i18n), this._i18nWatcher = this._i18n.watchI18nData(), (A.i18n.sync === void 0 || A.i18n.sync) && (this._localeWatcher = this.$i18n.watchLocale()), tt && tt.onComponentInstanceCreated(this._i18n);
            }
          } else
            this.$root && this.$root.$i18n && this.$root.$i18n instanceof Lt ? this._i18n = this.$root.$i18n : A.parent && A.parent.$i18n && A.parent.$i18n instanceof Lt && (this._i18n = A.parent.$i18n);
        }, beforeMount: function() {
          var A = this.$options;
          A.i18n = A.i18n || (A.__i18nBridge || A.__i18n ? {} : null), A.i18n ? (A.i18n instanceof Lt || h(A.i18n)) && (this._i18n.subscribeDataChanging(this), this._subscribing = !0) : (this.$root && this.$root.$i18n && this.$root.$i18n instanceof Lt || A.parent && A.parent.$i18n && A.parent.$i18n instanceof Lt) && (this._i18n.subscribeDataChanging(this), this._subscribing = !0);
        }, mounted: _, beforeDestroy: function() {
          if (this._i18n) {
            var A = this;
            this.$nextTick(function() {
              A._subscribing && (A._i18n.unsubscribeDataChanging(A), delete A._subscribing), A._i18nWatcher && (A._i18nWatcher(), A._i18n.destroyVM(), delete A._i18nWatcher), A._localeWatcher && (A._localeWatcher(), delete A._localeWatcher);
            });
          }
        } };
      }
      var xe = { name: "i18n", functional: !0, props: { tag: { type: [String, Boolean, Object], default: "span" }, path: { type: String, required: !0 }, locale: { type: String }, places: { type: [Array, Object] } }, render: function(r, _) {
        var A = _.data, U = _.parent, H = _.props, tt = _.slots, Q = U.$i18n;
        if (Q) {
          var it = H.path, lt = H.locale, kt = H.places, Rt = tt(), Ot = Q.i(it, lt, mt(Rt) || kt ? pt(Rt.default, kt) : Rt), $t = H.tag && H.tag !== !0 || H.tag === !1 ? H.tag : "span";
          return $t ? r($t, A, Ot) : Ot;
        }
      } };
      function mt(r) {
        var _;
        for (_ in r)
          if (_ !== "default")
            return !1;
        return Boolean(_);
      }
      function pt(r, _) {
        var A = _ ? Et(_) : {};
        if (!r)
          return A;
        r = r.filter(function(H) {
          return H.tag || H.text.trim() !== "";
        });
        var U = r.every(Yt);
        return r.reduce(U ? Mt : xt, A);
      }
      function Et(r) {
        return Array.isArray(r) ? r.reduce(xt, {}) : Object.assign({}, r);
      }
      function Mt(r, _) {
        return _.data && _.data.attrs && _.data.attrs.place && (r[_.data.attrs.place] = _), r;
      }
      function xt(r, _, A) {
        return r[A] = _, r;
      }
      function Yt(r) {
        return Boolean(r.data && r.data.attrs && r.data.attrs.place);
      }
      var ce, ye = { name: "i18n-n", functional: !0, props: { tag: { type: [String, Boolean, Object], default: "span" }, value: { type: Number, required: !0 }, format: { type: [String, Object] }, locale: { type: String } }, render: function(r, _) {
        var A = _.props, U = _.parent, H = _.data, tt = U.$i18n;
        if (!tt)
          return null;
        var Q = null, it = null;
        c(A.format) ? Q = A.format : y(A.format) && (A.format.key && (Q = A.format.key), it = Object.keys(A.format).reduce(function($t, ne) {
          var De;
          return T(g, ne) ? Object.assign({}, $t, (De = {}, De[ne] = A.format[ne], De)) : $t;
        }, null));
        var lt = A.locale || tt.locale, kt = tt._ntp(A.value, lt, Q, it), Rt = kt.map(function($t, ne) {
          var De, oe = H.scopedSlots && H.scopedSlots[$t.type];
          return oe ? oe((De = {}, De[$t.type] = $t.value, De.index = ne, De.parts = kt, De)) : $t.value;
        }), Ot = A.tag && A.tag !== !0 || A.tag === !1 ? A.tag : "span";
        return Ot ? r(Ot, { attrs: H.attrs, class: H.class, staticClass: H.staticClass }, Rt) : Rt;
      } };
      function fe(r, _, A) {
        ar(r, A) && Vr(r, _, A);
      }
      function Oe(r, _, A, U) {
        if (ar(r, A)) {
          var H = A.context.$i18n;
          fr(r, A) && at(_.value, _.oldValue) && at(r._localeMessage, H.getLocaleMessage(H.locale)) || Vr(r, _, A);
        }
      }
      function be(r, _, A, U) {
        var H = A.context;
        if (H) {
          var tt = A.context.$i18n || {};
          _.modifiers.preserve || tt.preserveDirectiveContent || (r.textContent = ""), r._vt = void 0, delete r._vt, r._locale = void 0, delete r._locale, r._localeMessage = void 0, delete r._localeMessage;
        } else
          w("Vue instance does not exists in VNode context");
      }
      function ar(r, _) {
        var A = _.context;
        return A ? !!A.$i18n || (w("VueI18n instance does not exists in Vue instance"), !1) : (w("Vue instance does not exists in VNode context"), !1);
      }
      function fr(r, _) {
        var A = _.context;
        return r._locale === A.$i18n.locale;
      }
      function Vr(r, _, A) {
        var U, H, tt = _.value, Q = en(tt), it = Q.path, lt = Q.locale, kt = Q.args, Rt = Q.choice;
        if (it || lt || kt)
          if (it) {
            var Ot = A.context;
            r._vt = r.textContent = Rt != null ? (U = Ot.$i18n).tc.apply(U, [it, Rt].concat(rn(lt, kt))) : (H = Ot.$i18n).t.apply(H, [it].concat(rn(lt, kt))), r._locale = Ot.$i18n.locale, r._localeMessage = Ot.$i18n.getLocaleMessage(Ot.$i18n.locale);
          } else
            w("`path` is required in v-t directive");
        else
          w("value type not supported");
      }
      function en(r) {
        var _, A, U, H;
        return c(r) ? _ = r : h(r) && (_ = r.path, A = r.locale, U = r.args, H = r.choice), { path: _, locale: A, args: U, choice: H };
      }
      function rn(r, _) {
        var A = [];
        return r && A.push(r), _ && (Array.isArray(_) || h(_)) && A.push(_), A;
      }
      function sr(r, _) {
        _ === void 0 && (_ = { bridge: !1 }), sr.installed = !0, ce = r, ce.version && Number(ce.version.split(".")[0]), Nt(ce), ce.mixin(It(_.bridge)), ce.directive("t", { bind: fe, update: Oe, unbind: be }), ce.component(xe.name, xe), ce.component(ye.name, ye);
        var A = ce.config.optionMergeStrategies;
        A.i18n = function(U, H) {
          return H === void 0 ? U : H;
        };
      }
      var zr = function() {
        this._caches = /* @__PURE__ */ Object.create(null);
      };
      zr.prototype.interpolate = function(r, _) {
        if (!_)
          return [r];
        var A = this._caches[r];
        return A || (A = _n(r), this._caches[r] = A), P(A, _);
      };
      var We = /^(?:\d)+/, fn = /^(?:\w)+/;
      function _n(r) {
        for (var _ = [], A = 0, U = ""; A < r.length; ) {
          var H = r[A++];
          if (H === "{") {
            U && _.push({ type: "text", value: U }), U = "";
            var tt = "";
            for (H = r[A++]; H !== void 0 && H !== "}"; )
              tt += H, H = r[A++];
            var Q = H === "}", it = We.test(tt) ? "list" : Q && fn.test(tt) ? "named" : "unknown";
            _.push({ value: tt, type: it });
          } else
            H === "%" ? r[A] !== "{" && (U += H) : U += H;
        }
        return U && _.push({ type: "text", value: U }), _;
      }
      function P(r, _) {
        var A = [], U = 0, H = Array.isArray(_) ? "list" : y(_) ? "named" : "unknown";
        if (H === "unknown")
          return A;
        for (; U < r.length; ) {
          var tt = r[U];
          switch (tt.type) {
            case "text":
              A.push(tt.value);
              break;
            case "list":
              A.push(_[parseInt(tt.value, 10)]);
              break;
            case "named":
              H === "named" && A.push(_[tt.value]);
              break;
          }
          U++;
        }
        return A;
      }
      var D = 0, W = 1, et = 2, ct = 3, yt = 0, Wt = 1, Se = 2, Pe = 3, we = 4, ke = 5, ur = 6, Ce = 7, kr = 8, Ge = [];
      Ge[yt] = { ws: [yt], ident: [Pe, D], "[": [we], eof: [Ce] }, Ge[Wt] = { ws: [Wt], ".": [Se], "[": [we], eof: [Ce] }, Ge[Se] = { ws: [Se], ident: [Pe, D], 0: [Pe, D], number: [Pe, D] }, Ge[Pe] = { ident: [Pe, D], 0: [Pe, D], number: [Pe, D], ws: [Wt, W], ".": [Se, W], "[": [we, W], eof: [Ce, W] }, Ge[we] = { "'": [ke, D], '"': [ur, D], "[": [we, et], "]": [Wt, ct], eof: kr, else: [we, D] }, Ge[ke] = { "'": [we, D], eof: kr, else: [ke, D] }, Ge[ur] = { '"': [we, D], eof: kr, else: [ur, D] };
      var Jr = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
      function dr(r) {
        return Jr.test(r);
      }
      function Pt(r) {
        var _ = r.charCodeAt(0), A = r.charCodeAt(r.length - 1);
        return _ !== A || _ !== 34 && _ !== 39 ? r : r.slice(1, -1);
      }
      function Ut(r) {
        if (r == null)
          return "eof";
        var _ = r.charCodeAt(0);
        switch (_) {
          case 91:
          case 93:
          case 46:
          case 34:
          case 39:
            return r;
          case 95:
          case 36:
          case 45:
            return "ident";
          case 9:
          case 10:
          case 13:
          case 160:
          case 65279:
          case 8232:
          case 8233:
            return "ws";
        }
        return "ident";
      }
      function te(r) {
        var _ = r.trim();
        return (r.charAt(0) !== "0" || !isNaN(r)) && (dr(_) ? Pt(_) : "*" + _);
      }
      function Jt(r) {
        var _, A, U, H, tt, Q, it, lt = [], kt = -1, Rt = yt, Ot = 0, $t = [];
        function ne() {
          var De = r[kt + 1];
          if (Rt === ke && De === "'" || Rt === ur && De === '"')
            return kt++, U = "\\" + De, $t[D](), !0;
        }
        for ($t[W] = function() {
          A !== void 0 && (lt.push(A), A = void 0);
        }, $t[D] = function() {
          A === void 0 ? A = U : A += U;
        }, $t[et] = function() {
          $t[D](), Ot++;
        }, $t[ct] = function() {
          if (Ot > 0)
            Ot--, Rt = we, $t[D]();
          else {
            if (Ot = 0, A === void 0 || (A = te(A), A === !1))
              return !1;
            $t[W]();
          }
        }; Rt !== null; )
          if (kt++, _ = r[kt], _ !== "\\" || !ne()) {
            if (H = Ut(_), it = Ge[Rt], tt = it[H] || it.else || kr, tt === kr || (Rt = tt[0], Q = $t[tt[1]], Q && (U = tt[2], U = U === void 0 ? _ : U, Q() === !1)))
              return;
            if (Rt === Ce)
              return lt;
          }
      }
      var He = function() {
        this._cache = /* @__PURE__ */ Object.create(null);
      };
      He.prototype.parsePath = function(r) {
        var _ = this._cache[r];
        return _ || (_ = Jt(r), _ && (this._cache[r] = _)), _ || [];
      }, He.prototype.getPathValue = function(r, _) {
        if (!y(r))
          return null;
        var A = this.parsePath(_);
        if (A.length === 0)
          return null;
        for (var U = A.length, H = r, tt = 0; tt < U; ) {
          var Q = H[A[tt]];
          if (Q == null)
            return null;
          H = Q, tt++;
        }
        return H;
      };
      var tr, Dt = /<\/?[\w\s="/.':;#-\/]+>/, Vt = /(?:@(?:\.[a-z]+)?:(?:[\w\-_|./]+|\([\w\-_|./]+\)))/g, ue = /^@(?:\.([a-z]+))?:/, de = /[()]/g, Ke = { upper: function(r) {
        return r.toLocaleUpperCase();
      }, lower: function(r) {
        return r.toLocaleLowerCase();
      }, capitalize: function(r) {
        return "" + r.charAt(0).toLocaleUpperCase() + r.substr(1);
      } }, xn = new zr(), Lt = function(r) {
        var _ = this;
        r === void 0 && (r = {}), !ce && typeof window < "u" && window.Vue && sr(window.Vue);
        var A = r.locale || "en-US", U = r.fallbackLocale !== !1 && (r.fallbackLocale || "en-US"), H = r.messages || {}, tt = r.dateTimeFormats || r.datetimeFormats || {}, Q = r.numberFormats || {};
        this._vm = null, this._formatter = r.formatter || xn, this._modifiers = r.modifiers || {}, this._missing = r.missing || null, this._root = r.root || null, this._sync = r.sync === void 0 || !!r.sync, this._fallbackRoot = r.fallbackRoot === void 0 || !!r.fallbackRoot, this._formatFallbackMessages = r.formatFallbackMessages !== void 0 && !!r.formatFallbackMessages, this._silentTranslationWarn = r.silentTranslationWarn !== void 0 && r.silentTranslationWarn, this._silentFallbackWarn = r.silentFallbackWarn !== void 0 && !!r.silentFallbackWarn, this._dateTimeFormatters = {}, this._numberFormatters = {}, this._path = new He(), this._dataListeners = /* @__PURE__ */ new Set(), this._componentInstanceCreatedListener = r.componentInstanceCreatedListener || null, this._preserveDirectiveContent = r.preserveDirectiveContent !== void 0 && !!r.preserveDirectiveContent, this.pluralizationRules = r.pluralizationRules || {}, this._warnHtmlInMessage = r.warnHtmlInMessage || "off", this._postTranslation = r.postTranslation || null, this._escapeParameterHtml = r.escapeParameterHtml || !1, "__VUE_I18N_BRIDGE__" in r && (this.__VUE_I18N_BRIDGE__ = r.__VUE_I18N_BRIDGE__), this.getChoiceIndex = function(it, lt) {
          var kt = Object.getPrototypeOf(_);
          if (kt && kt.getChoiceIndex) {
            var Rt = kt.getChoiceIndex;
            return Rt.call(_, it, lt);
          }
          var Ot = function($t, ne) {
            return $t = Math.abs($t), ne === 2 ? $t ? $t > 1 ? 1 : 0 : 1 : $t ? Math.min($t, 2) : 0;
          };
          return _.locale in _.pluralizationRules ? _.pluralizationRules[_.locale].apply(_, [it, lt]) : Ot(it, lt);
        }, this._exist = function(it, lt) {
          return !(!it || !lt) && (!k(_._path.getPathValue(it, lt)) || !!it[lt]);
        }, this._warnHtmlInMessage !== "warn" && this._warnHtmlInMessage !== "error" || Object.keys(H).forEach(function(it) {
          _._checkLocaleMessage(it, _._warnHtmlInMessage, H[it]);
        }), this._initVM({ locale: A, fallbackLocale: U, messages: H, dateTimeFormats: tt, numberFormats: Q });
      }, je = { vm: { configurable: !0 }, messages: { configurable: !0 }, dateTimeFormats: { configurable: !0 }, numberFormats: { configurable: !0 }, availableLocales: { configurable: !0 }, locale: { configurable: !0 }, fallbackLocale: { configurable: !0 }, formatFallbackMessages: { configurable: !0 }, missing: { configurable: !0 }, formatter: { configurable: !0 }, silentTranslationWarn: { configurable: !0 }, silentFallbackWarn: { configurable: !0 }, preserveDirectiveContent: { configurable: !0 }, warnHtmlInMessage: { configurable: !0 }, postTranslation: { configurable: !0 }, sync: { configurable: !0 } };
      Lt.prototype._checkLocaleMessage = function(r, _, A) {
        var U = [], H = function(tt, Q, it, lt) {
          if (h(it))
            Object.keys(it).forEach(function(Ot) {
              var $t = it[Ot];
              h($t) ? (lt.push(Ot), lt.push("."), H(tt, Q, $t, lt), lt.pop(), lt.pop()) : (lt.push(Ot), H(tt, Q, $t, lt), lt.pop());
            });
          else if (f(it))
            it.forEach(function(Ot, $t) {
              h(Ot) ? (lt.push("[" + $t + "]"), lt.push("."), H(tt, Q, Ot, lt), lt.pop(), lt.pop()) : (lt.push("[" + $t + "]"), H(tt, Q, Ot, lt), lt.pop());
            });
          else if (c(it)) {
            var kt = Dt.test(it);
            if (kt) {
              var Rt = "Detected HTML in message '" + it + "' of keypath '" + lt.join("") + "' at '" + Q + "'. Consider component interpolation with '<i18n>' to avoid XSS. See https://bit.ly/2ZqJzkp";
              tt === "warn" ? w(Rt) : tt === "error" && a(Rt);
            }
          }
        };
        H(_, r, A, U);
      }, Lt.prototype._initVM = function(r) {
        var _ = ce.config.silent;
        ce.config.silent = !0, this._vm = new ce({ data: r, __VUE18N__INSTANCE__: !0 }), ce.config.silent = _;
      }, Lt.prototype.destroyVM = function() {
        this._vm.$destroy();
      }, Lt.prototype.subscribeDataChanging = function(r) {
        this._dataListeners.add(r);
      }, Lt.prototype.unsubscribeDataChanging = function(r) {
        L(this._dataListeners, r);
      }, Lt.prototype.watchI18nData = function() {
        var r = this;
        return this._vm.$watch("$data", function() {
          for (var _ = x(r._dataListeners), A = _.length; A--; )
            ce.nextTick(function() {
              _[A] && _[A].$forceUpdate();
            });
        }, { deep: !0 });
      }, Lt.prototype.watchLocale = function() {
        if (!this._sync || !this._root)
          return null;
        var r = this._vm;
        return this._root.$i18n.vm.$watch("locale", function(_) {
          r.$set(r, "locale", _), r.$forceUpdate();
        }, { immediate: !0 });
      }, Lt.prototype.onComponentInstanceCreated = function(r) {
        this._componentInstanceCreatedListener && this._componentInstanceCreatedListener(r, this);
      }, je.vm.get = function() {
        return this._vm;
      }, je.messages.get = function() {
        return M(this._getMessages());
      }, je.dateTimeFormats.get = function() {
        return M(this._getDateTimeFormats());
      }, je.numberFormats.get = function() {
        return M(this._getNumberFormats());
      }, je.availableLocales.get = function() {
        return Object.keys(this.messages).sort();
      }, je.locale.get = function() {
        return this._vm.locale;
      }, je.locale.set = function(r) {
        this._vm.$set(this._vm, "locale", r);
      }, je.fallbackLocale.get = function() {
        return this._vm.fallbackLocale;
      }, je.fallbackLocale.set = function(r) {
        this._localeChainCache = {}, this._vm.$set(this._vm, "fallbackLocale", r);
      }, je.formatFallbackMessages.get = function() {
        return this._formatFallbackMessages;
      }, je.formatFallbackMessages.set = function(r) {
        this._formatFallbackMessages = r;
      }, je.missing.get = function() {
        return this._missing;
      }, je.missing.set = function(r) {
        this._missing = r;
      }, je.formatter.get = function() {
        return this._formatter;
      }, je.formatter.set = function(r) {
        this._formatter = r;
      }, je.silentTranslationWarn.get = function() {
        return this._silentTranslationWarn;
      }, je.silentTranslationWarn.set = function(r) {
        this._silentTranslationWarn = r;
      }, je.silentFallbackWarn.get = function() {
        return this._silentFallbackWarn;
      }, je.silentFallbackWarn.set = function(r) {
        this._silentFallbackWarn = r;
      }, je.preserveDirectiveContent.get = function() {
        return this._preserveDirectiveContent;
      }, je.preserveDirectiveContent.set = function(r) {
        this._preserveDirectiveContent = r;
      }, je.warnHtmlInMessage.get = function() {
        return this._warnHtmlInMessage;
      }, je.warnHtmlInMessage.set = function(r) {
        var _ = this, A = this._warnHtmlInMessage;
        if (this._warnHtmlInMessage = r, A !== r && (r === "warn" || r === "error")) {
          var U = this._getMessages();
          Object.keys(U).forEach(function(H) {
            _._checkLocaleMessage(H, _._warnHtmlInMessage, U[H]);
          });
        }
      }, je.postTranslation.get = function() {
        return this._postTranslation;
      }, je.postTranslation.set = function(r) {
        this._postTranslation = r;
      }, je.sync.get = function() {
        return this._sync;
      }, je.sync.set = function(r) {
        this._sync = r;
      }, Lt.prototype._getMessages = function() {
        return this._vm.messages;
      }, Lt.prototype._getDateTimeFormats = function() {
        return this._vm.dateTimeFormats;
      }, Lt.prototype._getNumberFormats = function() {
        return this._vm.numberFormats;
      }, Lt.prototype._warnDefault = function(r, _, A, U, H, tt) {
        if (!k(A))
          return A;
        if (this._missing) {
          var Q = this._missing.apply(null, [r, _, U, H]);
          if (c(Q))
            return Q;
        }
        if (this._formatFallbackMessages) {
          var it = O.apply(void 0, H);
          return this._render(_, tt, it.params, _);
        }
        return _;
      }, Lt.prototype._isFallbackRoot = function(r) {
        return !r && !k(this._root) && this._fallbackRoot;
      }, Lt.prototype._isSilentFallbackWarn = function(r) {
        return this._silentFallbackWarn instanceof RegExp ? this._silentFallbackWarn.test(r) : this._silentFallbackWarn;
      }, Lt.prototype._isSilentFallback = function(r, _) {
        return this._isSilentFallbackWarn(_) && (this._isFallbackRoot() || r !== this.fallbackLocale);
      }, Lt.prototype._isSilentTranslationWarn = function(r) {
        return this._silentTranslationWarn instanceof RegExp ? this._silentTranslationWarn.test(r) : this._silentTranslationWarn;
      }, Lt.prototype._interpolate = function(r, _, A, U, H, tt, Q) {
        if (!_)
          return null;
        var it, lt = this._path.getPathValue(_, A);
        if (f(lt) || h(lt))
          return lt;
        if (k(lt)) {
          if (!h(_) || (it = _[A], !c(it) && !d(it)))
            return null;
        } else {
          if (!c(lt) && !d(lt))
            return null;
          it = lt;
        }
        return c(it) && (it.indexOf("@:") >= 0 || it.indexOf("@.") >= 0) && (it = this._link(r, _, it, U, "raw", tt, Q)), this._render(it, H, tt, A);
      }, Lt.prototype._link = function(r, _, A, U, H, tt, Q) {
        var it = A, lt = it.match(Vt);
        for (var kt in lt)
          if (lt.hasOwnProperty(kt)) {
            var Rt = lt[kt], Ot = Rt.match(ue), $t = Ot[0], ne = Ot[1], De = Rt.replace($t, "").replace(de, "");
            if (T(Q, De))
              return it;
            Q.push(De);
            var oe = this._interpolate(r, _, De, U, H === "raw" ? "string" : H, H === "raw" ? void 0 : tt, Q);
            if (this._isFallbackRoot(oe)) {
              if (!this._root)
                throw Error("unexpected error");
              var Te = this._root.$i18n;
              oe = Te._translate(Te._getMessages(), Te.locale, Te.fallbackLocale, De, U, H, tt);
            }
            oe = this._warnDefault(r, De, oe, U, f(tt) ? tt : [tt], H), this._modifiers.hasOwnProperty(ne) ? oe = this._modifiers[ne](oe) : Ke.hasOwnProperty(ne) && (oe = Ke[ne](oe)), Q.pop(), it = oe ? it.replace(Rt, oe) : it;
          }
        return it;
      }, Lt.prototype._createMessageContext = function(r, _, A, U) {
        var H = this, tt = f(r) ? r : [], Q = y(r) ? r : {}, it = function(Ot) {
          return tt[Ot];
        }, lt = function(Ot) {
          return Q[Ot];
        }, kt = this._getMessages(), Rt = this.locale;
        return { list: it, named: lt, values: r, formatter: _, path: A, messages: kt, locale: Rt, linked: function(Ot) {
          return H._interpolate(Rt, kt[Rt] || {}, Ot, null, U, void 0, [Ot]);
        } };
      }, Lt.prototype._render = function(r, _, A, U) {
        if (d(r))
          return r(this._createMessageContext(A, this._formatter || xn, U, _));
        var H = this._formatter.interpolate(r, A, U);
        return H || (H = xn.interpolate(r, A, U)), _ !== "string" || c(H) ? H : H.join("");
      }, Lt.prototype._appendItemToChain = function(r, _, A) {
        var U = !1;
        return T(r, _) || (U = !0, _ && (U = _[_.length - 1] !== "!", _ = _.replace(/!/g, ""), r.push(_), A && A[_] && (U = A[_]))), U;
      }, Lt.prototype._appendLocaleToChain = function(r, _, A) {
        var U, H = _.split("-");
        do {
          var tt = H.join("-");
          U = this._appendItemToChain(r, tt, A), H.splice(-1, 1);
        } while (H.length && U === !0);
        return U;
      }, Lt.prototype._appendBlockToChain = function(r, _, A) {
        for (var U = !0, H = 0; H < _.length && l(U); H++) {
          var tt = _[H];
          c(tt) && (U = this._appendLocaleToChain(r, tt, A));
        }
        return U;
      }, Lt.prototype._getLocaleChain = function(r, _) {
        if (r === "")
          return [];
        this._localeChainCache || (this._localeChainCache = {});
        var A = this._localeChainCache[r];
        if (!A) {
          _ || (_ = this.fallbackLocale), A = [];
          for (var U, H = [r]; f(H); )
            H = this._appendBlockToChain(A, H, _);
          U = f(_) ? _ : y(_) ? _.default ? _.default : null : _, H = c(U) ? [U] : U, H && this._appendBlockToChain(A, H, null), this._localeChainCache[r] = A;
        }
        return A;
      }, Lt.prototype._translate = function(r, _, A, U, H, tt, Q) {
        for (var it, lt = this._getLocaleChain(_, A), kt = 0; kt < lt.length; kt++) {
          var Rt = lt[kt];
          if (it = this._interpolate(Rt, r[Rt], U, H, tt, Q, [U]), !k(it))
            return it;
        }
        return null;
      }, Lt.prototype._t = function(r, _, A, U) {
        for (var H, tt = [], Q = arguments.length - 4; Q-- > 0; )
          tt[Q] = arguments[Q + 4];
        if (!r)
          return "";
        var it = O.apply(void 0, tt);
        this._escapeParameterHtml && (it.params = wt(it.params));
        var lt = it.locale || _, kt = this._translate(A, lt, this.fallbackLocale, r, U, "string", it.params);
        if (this._isFallbackRoot(kt)) {
          if (!this._root)
            throw Error("unexpected error");
          return (H = this._root).$t.apply(H, [r].concat(tt));
        }
        return kt = this._warnDefault(lt, r, kt, U, tt, "string"), this._postTranslation && kt !== null && kt !== void 0 && (kt = this._postTranslation(kt, r)), kt;
      }, Lt.prototype.t = function(r) {
        for (var _, A = [], U = arguments.length - 1; U-- > 0; )
          A[U] = arguments[U + 1];
        return (_ = this)._t.apply(_, [r, this.locale, this._getMessages(), null].concat(A));
      }, Lt.prototype._i = function(r, _, A, U, H) {
        var tt = this._translate(A, _, this.fallbackLocale, r, U, "raw", H);
        if (this._isFallbackRoot(tt)) {
          if (!this._root)
            throw Error("unexpected error");
          return this._root.$i18n.i(r, _, H);
        }
        return this._warnDefault(_, r, tt, U, [H], "raw");
      }, Lt.prototype.i = function(r, _, A) {
        return r ? (c(_) || (_ = this.locale), this._i(r, _, this._getMessages(), null, A)) : "";
      }, Lt.prototype._tc = function(r, _, A, U, H) {
        for (var tt, Q = [], it = arguments.length - 5; it-- > 0; )
          Q[it] = arguments[it + 5];
        if (!r)
          return "";
        H === void 0 && (H = 1);
        var lt = { count: H, n: H }, kt = O.apply(void 0, Q);
        return kt.params = Object.assign(lt, kt.params), Q = kt.locale === null ? [kt.params] : [kt.locale, kt.params], this.fetchChoice((tt = this)._t.apply(tt, [r, _, A, U].concat(Q)), H);
      }, Lt.prototype.fetchChoice = function(r, _) {
        if (!r || !c(r))
          return null;
        var A = r.split("|");
        return _ = this.getChoiceIndex(_, A.length), A[_] ? A[_].trim() : r;
      }, Lt.prototype.tc = function(r, _) {
        for (var A, U = [], H = arguments.length - 2; H-- > 0; )
          U[H] = arguments[H + 2];
        return (A = this)._tc.apply(A, [r, this.locale, this._getMessages(), null, _].concat(U));
      }, Lt.prototype._te = function(r, _, A) {
        for (var U = [], H = arguments.length - 3; H-- > 0; )
          U[H] = arguments[H + 3];
        var tt = O.apply(void 0, U).locale || _;
        return this._exist(A[tt], r);
      }, Lt.prototype.te = function(r, _) {
        return this._te(r, this.locale, this._getMessages(), _);
      }, Lt.prototype.getLocaleMessage = function(r) {
        return M(this._vm.messages[r] || {});
      }, Lt.prototype.setLocaleMessage = function(r, _) {
        this._warnHtmlInMessage !== "warn" && this._warnHtmlInMessage !== "error" || this._checkLocaleMessage(r, this._warnHtmlInMessage, _), this._vm.$set(this._vm.messages, r, _);
      }, Lt.prototype.mergeLocaleMessage = function(r, _) {
        this._warnHtmlInMessage !== "warn" && this._warnHtmlInMessage !== "error" || this._checkLocaleMessage(r, this._warnHtmlInMessage, _), this._vm.$set(this._vm.messages, r, ot(typeof this._vm.messages[r] < "u" && Object.keys(this._vm.messages[r]).length ? Object.assign({}, this._vm.messages[r]) : {}, _));
      }, Lt.prototype.getDateTimeFormat = function(r) {
        return M(this._vm.dateTimeFormats[r] || {});
      }, Lt.prototype.setDateTimeFormat = function(r, _) {
        this._vm.$set(this._vm.dateTimeFormats, r, _), this._clearDateTimeFormat(r, _);
      }, Lt.prototype.mergeDateTimeFormat = function(r, _) {
        this._vm.$set(this._vm.dateTimeFormats, r, ot(this._vm.dateTimeFormats[r] || {}, _)), this._clearDateTimeFormat(r, _);
      }, Lt.prototype._clearDateTimeFormat = function(r, _) {
        for (var A in _) {
          var U = r + "__" + A;
          this._dateTimeFormatters.hasOwnProperty(U) && delete this._dateTimeFormatters[U];
        }
      }, Lt.prototype._localizeDateTime = function(r, _, A, U, H) {
        for (var tt = _, Q = U[tt], it = this._getLocaleChain(_, A), lt = 0; lt < it.length; lt++) {
          var kt = it[lt];
          if (Q = U[kt], tt = kt, !k(Q) && !k(Q[H]))
            break;
        }
        if (k(Q) || k(Q[H]))
          return null;
        var Rt = Q[H], Ot = tt + "__" + H, $t = this._dateTimeFormatters[Ot];
        return $t || ($t = this._dateTimeFormatters[Ot] = new Intl.DateTimeFormat(tt, Rt)), $t.format(r);
      }, Lt.prototype._d = function(r, _, A) {
        if (!A)
          return new Intl.DateTimeFormat(_).format(r);
        var U = this._localizeDateTime(r, _, this.fallbackLocale, this._getDateTimeFormats(), A);
        if (this._isFallbackRoot(U)) {
          if (!this._root)
            throw Error("unexpected error");
          return this._root.$i18n.d(r, A, _);
        }
        return U || "";
      }, Lt.prototype.d = function(r) {
        for (var _ = [], A = arguments.length - 1; A-- > 0; )
          _[A] = arguments[A + 1];
        var U = this.locale, H = null;
        return _.length === 1 ? c(_[0]) ? H = _[0] : y(_[0]) && (_[0].locale && (U = _[0].locale), _[0].key && (H = _[0].key)) : _.length === 2 && (c(_[0]) && (H = _[0]), c(_[1]) && (U = _[1])), this._d(r, U, H);
      }, Lt.prototype.getNumberFormat = function(r) {
        return M(this._vm.numberFormats[r] || {});
      }, Lt.prototype.setNumberFormat = function(r, _) {
        this._vm.$set(this._vm.numberFormats, r, _), this._clearNumberFormat(r, _);
      }, Lt.prototype.mergeNumberFormat = function(r, _) {
        this._vm.$set(this._vm.numberFormats, r, ot(this._vm.numberFormats[r] || {}, _)), this._clearNumberFormat(r, _);
      }, Lt.prototype._clearNumberFormat = function(r, _) {
        for (var A in _) {
          var U = r + "__" + A;
          this._numberFormatters.hasOwnProperty(U) && delete this._numberFormatters[U];
        }
      }, Lt.prototype._getNumberFormatter = function(r, _, A, U, H, tt) {
        for (var Q = _, it = U[Q], lt = this._getLocaleChain(_, A), kt = 0; kt < lt.length; kt++) {
          var Rt = lt[kt];
          if (it = U[Rt], Q = Rt, !k(it) && !k(it[H]))
            break;
        }
        if (k(it) || k(it[H]))
          return null;
        var Ot, $t = it[H];
        if (tt)
          Ot = new Intl.NumberFormat(Q, Object.assign({}, $t, tt));
        else {
          var ne = Q + "__" + H;
          Ot = this._numberFormatters[ne], Ot || (Ot = this._numberFormatters[ne] = new Intl.NumberFormat(Q, $t));
        }
        return Ot;
      }, Lt.prototype._n = function(r, _, A, U) {
        if (!Lt.availabilities.numberFormat)
          return "";
        if (!A) {
          var H = U ? new Intl.NumberFormat(_, U) : new Intl.NumberFormat(_);
          return H.format(r);
        }
        var tt = this._getNumberFormatter(r, _, this.fallbackLocale, this._getNumberFormats(), A, U), Q = tt && tt.format(r);
        if (this._isFallbackRoot(Q)) {
          if (!this._root)
            throw Error("unexpected error");
          return this._root.$i18n.n(r, Object.assign({}, { key: A, locale: _ }, U));
        }
        return Q || "";
      }, Lt.prototype.n = function(r) {
        for (var _ = [], A = arguments.length - 1; A-- > 0; )
          _[A] = arguments[A + 1];
        var U = this.locale, H = null, tt = null;
        return _.length === 1 ? c(_[0]) ? H = _[0] : y(_[0]) && (_[0].locale && (U = _[0].locale), _[0].key && (H = _[0].key), tt = Object.keys(_[0]).reduce(function(Q, it) {
          var lt;
          return T(g, it) ? Object.assign({}, Q, (lt = {}, lt[it] = _[0][it], lt)) : Q;
        }, null)) : _.length === 2 && (c(_[0]) && (H = _[0]), c(_[1]) && (U = _[1])), this._n(r, U, H, tt);
      }, Lt.prototype._ntp = function(r, _, A, U) {
        if (!Lt.availabilities.numberFormat)
          return [];
        if (!A) {
          var H = U ? new Intl.NumberFormat(_, U) : new Intl.NumberFormat(_);
          return H.formatToParts(r);
        }
        var tt = this._getNumberFormatter(r, _, this.fallbackLocale, this._getNumberFormats(), A, U), Q = tt && tt.formatToParts(r);
        if (this._isFallbackRoot(Q)) {
          if (!this._root)
            throw Error("unexpected error");
          return this._root.$i18n._ntp(r, _, A, U);
        }
        return Q || [];
      }, Object.defineProperties(Lt.prototype, je), Object.defineProperty(Lt, "availabilities", { get: function() {
        if (!tr) {
          var r = typeof Intl < "u";
          tr = { dateTimeFormat: r && typeof Intl.DateTimeFormat < "u", numberFormat: r && typeof Intl.NumberFormat < "u" };
        }
        return tr;
      } }), Lt.install = sr, Lt.version = "8.26.5";
      var Ro = Lt;
      o("e260"), o("ddb0"), o("ac1f"), o("466d");
      function ua() {
        var r = o("49f8"), _ = {};
        return r.keys().forEach(function(A) {
          var U = A.match(/([A-Za-z0-9-_]+)\./i);
          if (U && U.length > 1) {
            var H = U[1];
            _[H] = r(A);
          }
        }), _;
      }
      var la = function() {
        var r;
        return new Ro({ fallbackLocale: "en", locale: ((r = window) === null || r === void 0 ? void 0 : r.iso_user) || "en", messages: ua() });
      }, oo = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("div", { attrs: { id: "psaccounts" } }, [A("BaseAlert", { attrs: { variant: "danger", show: r.hasError, dismissible: "" }, on: { dismissed: function(U) {
          r.hasError = !1;
        } } }, [A("p", { staticClass: "acc-text-sm acc-leading-6" }, [r._v(" " + r._s(r.$t("psaccounts.accountManager.errorInstallEnable")) + " ")])]), r.validContext.errors && r.validContext.errors.length ? A("BaseAlert", { class: { "acc-mt-4": r.hasError }, attrs: { variant: "danger" } }, [A("p", { staticClass: "acc-text-sm acc-leading-6" }, [r._v(" <PsAccounts> integration: Given context is invalid: " + r._s(r.validContext.errors.join(";")) + " ")])]) : [A("PsAccountComponentAlertDisplay", { staticClass: "acc-mb-4", on: { hasError: function(U) {
          r.hasError = !0;
        } } }), r.hasBlockingAlert ? r._e() : [A("AccountPanel", { attrs: { "accounts-ui-url": r.validContext.accountsUiUrl, app: r.app, "backend-user": r.validContext.backendUser, "onboarding-link": r.validContext.onboardingLink, shops: r.shops, "shop-context": r.validContext.currentContext ? r.validContext.currentContext.type : 4, "sso-resend-verification-email": r.validContext.ssoResendVerificationEmail, "super-admin-email": r.validContext.superAdminEmail } }, [r.hasAllShopsLinked ? r._t("account-footer") : r._e()], 2), A("BaseOverlay", { staticClass: "acc-mt-4", attrs: { show: !r.hasAllShopsLinked } }, [r._t("default"), r._t("body")], 2), A("div", { staticClass: "acc-mt-4" }, [r._t("customBody")], 2)]]], 2);
      }, _o = [], _i = function(r) {
        return Object.prototype.toString.call(r);
      };
      function Io(r) {
        return typeof r == "function" && /native code/.test(r.toString());
      }
      var xi = typeof Symbol < "u" && Io(Symbol) && typeof Reflect < "u" && Io(Reflect.ownKeys), vr = function(r) {
        return r;
      };
      function Hr(r, _, A) {
        var U = A.get, H = A.set;
        Object.defineProperty(r, _, { enumerable: !0, configurable: !0, get: U || vr, set: H || vr });
      }
      function Jo(r, _, A, U) {
        Object.defineProperty(r, _, { value: A, enumerable: !!U, writable: !0, configurable: !0 });
      }
      function Sn(r, _) {
        return Object.hasOwnProperty.call(r, _);
      }
      function fa(r, _) {
        if (!r)
          throw new Error("[vue-composition-api] " + _);
      }
      function $n(r) {
        return Array.isArray(r);
      }
      var Ia = Object.prototype.toString, Fi = function(r) {
        return Ia.call(r);
      }, Zo = function(r) {
        return Fi(r) === "[object Map]";
      }, Bi = function(r) {
        return Fi(r) === "[object Set]";
      }, io = 4294967295;
      function Xo(r) {
        var _ = parseFloat(String(r));
        return _ >= 0 && Math.floor(_) === _ && isFinite(r) && _ <= io;
      }
      function Pn(r) {
        return r !== null && typeof r == "object";
      }
      function Wn(r) {
        return _i(r) === "[object Object]";
      }
      function kn(r) {
        return typeof r == "function";
      }
      function Si(r, _, A) {
        if (typeof window > "u" || typeof console > "u")
          throw r;
        console.error(r);
      }
      /*! *****************************************************************************
      	Copyright (c) Microsoft Corporation.
      
      	Permission to use, copy, modify, and/or distribute this software for any
      	purpose with or without fee is hereby granted.
      
      	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      	PERFORMANCE OF THIS SOFTWARE.
      	***************************************************************************** */
      var To = function(r, _) {
        return To = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(A, U) {
          A.__proto__ = U;
        } || function(A, U) {
          for (var H in U)
            Object.prototype.hasOwnProperty.call(U, H) && (A[H] = U[H]);
        }, To(r, _);
      };
      function Ui(r, _) {
        if (typeof _ != "function" && _ !== null)
          throw new TypeError("Class extends value " + String(_) + " is not a constructor or null");
        function A() {
          this.constructor = r;
        }
        To(r, _), r.prototype = _ === null ? Object.create(_) : (A.prototype = _.prototype, new A());
      }
      var An, qn = function() {
        return qn = Object.assign || function(r) {
          for (var _, A = 1, U = arguments.length; A < U; A++)
            for (var H in _ = arguments[A], _)
              Object.prototype.hasOwnProperty.call(_, H) && (r[H] = _[H]);
          return r;
        }, qn.apply(this, arguments);
      };
      function hn(r) {
        var _ = typeof Symbol == "function" && Symbol.iterator, A = _ && r[_], U = 0;
        if (A)
          return A.call(r);
        if (r && typeof r.length == "number")
          return { next: function() {
            return r && U >= r.length && (r = void 0), { value: r && r[U++], done: !r };
          } };
        throw new TypeError(_ ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }
      function ki(r, _) {
        var A = typeof Symbol == "function" && r[Symbol.iterator];
        if (!A)
          return r;
        var U, H, tt = A.call(r), Q = [];
        try {
          for (; (_ === void 0 || _-- > 0) && !(U = tt.next()).done; )
            Q.push(U.value);
        } catch (it) {
          H = { error: it };
        } finally {
          try {
            U && !U.done && (A = tt.return) && A.call(tt);
          } finally {
            if (H)
              throw H.error;
          }
        }
        return Q;
      }
      function Be(r, _) {
        for (var A = 0, U = _.length, H = r.length; A < U; A++, H++)
          r[H] = _[A];
        return r;
      }
      var Yr = [], Ai = function() {
        function r(_) {
          this.active = !0, this.effects = [], this.cleanups = [], this.vm = _;
        }
        return r.prototype.run = function(_) {
          if (this.active)
            try {
              return this.on(), _();
            } finally {
              this.off();
            }
        }, r.prototype.on = function() {
          this.active && (Yr.push(this), An = this);
        }, r.prototype.off = function() {
          this.active && (Yr.pop(), An = Yr[Yr.length - 1]);
        }, r.prototype.stop = function() {
          this.active && (this.vm.$destroy(), this.effects.forEach(function(_) {
            return _.stop();
          }), this.cleanups.forEach(function(_) {
            return _();
          }), this.active = !1);
        }, r;
      }();
      (function(r) {
        function _(A) {
          A === void 0 && (A = !1);
          var U = this, H = void 0;
          return da(function() {
            H = Lo(Yn());
          }), U = r.call(this, H) || this, A || Mo(U), U;
        }
        Ui(_, r);
      })(Ai);
      function Mo(r, _) {
        var A;
        if (_ = _ || An, _ && _.active)
          _.effects.push(r);
        else {
          var U = (A = uo()) === null || A === void 0 ? void 0 : A.proxy;
          U && U.$on("hook:destroyed", function() {
            return r.stop();
          });
        }
      }
      function xr() {
        return An;
      }
      function Wi() {
        var r, _;
        return ((r = xr()) === null || r === void 0 ? void 0 : r.vm) || ((_ = uo()) === null || _ === void 0 ? void 0 : _.proxy);
      }
      function Qo(r) {
        if (!r.scope) {
          var _ = new Ai(r.proxy);
          r.scope = _, r.proxy.$on("hook:destroyed", function() {
            return _.stop();
          });
        }
        return r.scope;
      }
      var ti = void 0;
      try {
        var Vn = o("a026");
        Vn && so(Vn) ? ti = Vn : Vn && "default" in Vn && so(Vn.default) && (ti = Vn.default);
      } catch {
      }
      var xo = null, ao = null, Hn = !0, ei = "__composition_api_installed__";
      function so(r) {
        return r && kn(r) && r.name === "Vue";
      }
      function on(r) {
        return xo && Sn(r, ei);
      }
      function Yn() {
        return xo;
      }
      function co() {
        var r = xo || ti;
        return r;
      }
      function Ta(r) {
        xo = r, Object.defineProperty(r, ei, { configurable: !0, writable: !0, value: !0 });
      }
      function da(r) {
        var _ = Hn;
        Hn = !1;
        try {
          r();
        } finally {
          Hn = _;
        }
      }
      function zo(r) {
        if (Hn) {
          var _ = ao;
          _ == null || _.scope.off(), ao = r, ao == null || ao.scope.on();
        }
      }
      function uo() {
        return ao;
      }
      var lo, ri = /* @__PURE__ */ new WeakMap();
      function Do(r) {
        if (ri.has(r))
          return ri.get(r);
        var _ = { proxy: r, update: r.$forceUpdate, type: r.$options, uid: r._uid, emit: r.$emit.bind(r), parent: null, root: null };
        Qo(_);
        var A = ["data", "props", "attrs", "refs", "vnode", "slots"];
        return A.forEach(function(U) {
          Hr(_, U, { get: function() {
            return r["$" + U];
          } });
        }), Hr(_, "isMounted", { get: function() {
          return r._isMounted;
        } }), Hr(_, "isUnmounted", { get: function() {
          return r._isDestroyed;
        } }), Hr(_, "isDeactivated", { get: function() {
          return r._inactive;
        } }), Hr(_, "emitted", { get: function() {
          return r._events;
        } }), ri.set(r, _), r.$parent && (_.parent = Do(r.$parent)), r.$root && (_.root = Do(r.$root)), _;
      }
      function pa(r, _) {
        return _ = _ || uo(), _;
      }
      function Lo(r, _) {
        _ === void 0 && (_ = {});
        var A = r.config.silent;
        r.config.silent = !0;
        var U = new r(_);
        return r.config.silent = A, U;
      }
      function Ei(r) {
        var _ = Yn();
        return _ && r instanceof _;
      }
      function qi(r, _) {
        return function() {
          for (var A = [], U = 0; U < arguments.length; U++)
            A[U] = arguments[U];
          if (r.$scopedSlots[_])
            return r.$scopedSlots[_].apply(r, A);
        };
      }
      function No(r, _) {
        var A;
        if (r) {
          if (r._normalized)
            return r._normalized;
          for (var U in A = {}, r)
            r[U] && U[0] !== "$" && (A[U] = !0);
        } else
          A = {};
        for (var U in _)
          U in A || (A[U] = !0);
        return A;
      }
      var Fo = function() {
        if (!lo) {
          var r = Lo(Yn(), { computed: { value: function() {
            return 0;
          } } }), _ = r._computedWatchers.value.constructor, A = r._data.__ob__.dep.constructor;
          lo = { Watcher: _, Dep: A }, r.$destroy();
        }
        return lo;
      };
      function ni(r) {
        return xi ? Symbol.for(r) : r;
      }
      var So = ni("composition-api.preFlushQueue"), ko = ni("composition-api.postFlushQueue"), Bo = "composition-api.refKey", mn = /* @__PURE__ */ new WeakMap(), Oi = /* @__PURE__ */ new WeakMap();
      function ha(r, _, A) {
        var U = Yn(), H = U.util, tt = (H.warn, H.defineReactive), Q = r.__ob__;
        function it() {
          Q && Pn(A) && !Sn(A, "__ob__") && Yi(A);
        }
        if ($n(r)) {
          if (Xo(_))
            return r.length = Math.max(r.length, _), r.splice(_, 1, A), it(), A;
          if (_ === "length" && A !== r.length)
            return r.length = A, Q == null || Q.dep.notify(), A;
        }
        return _ in r && !(_ in Object.prototype) ? (r[_] = A, it(), A) : r._isVue || Q && Q.vmCount ? A : Q ? (tt(Q.value, _, A), Hi(r, _, A), it(), Q.dep.notify(), A) : (r[_] = A, A);
      }
      var Vi = function() {
        function r(_) {
          var A = _.get, U = _.set;
          Hr(this, "value", { get: A, set: U });
        }
        return r;
      }();
      function ji(r, _, A) {
        _ === void 0 && (_ = !1), A === void 0 && (A = !1);
        var U = new Vi(r);
        A && (U.effect = !0);
        var H = Object.seal(U);
        return _ && Oi.set(H, !0), H;
      }
      function Cn(r) {
        var _;
        if (gr(r))
          return r;
        var A = vn((_ = {}, _[Bo] = r, _));
        return ji({ get: function() {
          return A[Bo];
        }, set: function(U) {
          return A[Bo] = U;
        } });
      }
      function gr(r) {
        return r instanceof Vi;
      }
      function oi(r) {
        if (!Wn(r))
          return r;
        var _ = {};
        for (var A in r)
          _[A] = ma(r, A);
        return _;
      }
      function ma(r, _) {
        _ in r || ha(r, _, void 0);
        var A = r[_];
        return gr(A) ? A : ji({ get: function() {
          return r[_];
        }, set: function(U) {
          return r[_] = U;
        } });
      }
      function fo(r) {
        var _;
        return Boolean(r && Sn(r, "__ob__") && typeof r.__ob__ == "object" && ((_ = r.__ob__) === null || _ === void 0 ? void 0 : _.__raw__));
      }
      function Gn(r) {
        var _;
        return Boolean(r && Sn(r, "__ob__") && typeof r.__ob__ == "object" && !(!((_ = r.__ob__) === null || _ === void 0) && _.__raw__));
      }
      function $i(r) {
        if (!(!Wn(r) || fo(r) || $n(r) || gr(r) || Ei(r) || mn.has(r))) {
          mn.set(r, !0);
          for (var _ = Object.keys(r), A = 0; A < _.length; A++)
            Hi(r, _[A]);
        }
      }
      function Hi(r, _, A) {
        if (_ !== "__ob__" && !fo(r[_])) {
          var U, H, tt = Object.getOwnPropertyDescriptor(r, _);
          if (tt) {
            if (tt.configurable === !1)
              return;
            U = tt.get, H = tt.set, U && !H || arguments.length !== 2 || (A = r[_]);
          }
          $i(A), Hr(r, _, { get: function() {
            var Q = U ? U.call(r) : A;
            return _ !== Bo && gr(Q) ? Q.value : Q;
          }, set: function(Q) {
            U && !H || (_ !== Bo && gr(A) && !gr(Q) ? A.value = Q : (H && H.call(r, Q), A = Q), $i(Q));
          } });
        }
      }
      function Pi(r) {
        var _, A = co();
        if (A.observable)
          _ = A.observable(r);
        else {
          var U = Lo(A, { data: { $$state: r } });
          _ = U._data.$$state;
        }
        return Sn(_, "__ob__") || Yi(_), _;
      }
      function Yi(r, _) {
        var A, U;
        if (_ === void 0 && (_ = /* @__PURE__ */ new Set()), !_.has(r) && !Sn(r, "__ob__") && Object.isExtensible(r)) {
          Jo(r, "__ob__", Ci(r)), _.add(r);
          try {
            for (var H = hn(Object.keys(r)), tt = H.next(); !tt.done; tt = H.next()) {
              var Q = tt.value, it = r[Q];
              (Wn(it) || $n(it)) && !fo(it) && Object.isExtensible(it) && Yi(it, _);
            }
          } catch (lt) {
            A = { error: lt };
          } finally {
            try {
              tt && !tt.done && (U = H.return) && U.call(H);
            } finally {
              if (A)
                throw A.error;
            }
          }
        }
      }
      function Ci(r) {
        return r === void 0 && (r = {}), { value: r, dep: { notify: vr, depend: vr, addSub: vr, removeSub: vr } };
      }
      function Rn() {
        return Pi({}).__ob__;
      }
      function vn(r) {
        if (!Pn(r) || !Wn(r) && !$n(r) || fo(r) || !Object.isExtensible(r))
          return r;
        var _ = Pi(r);
        return $i(_), _;
      }
      var gn = function(r) {
        return "on" + (r[0].toUpperCase() + r.slice(1));
      };
      function Gi(r) {
        return function(_, A) {
          var U = pa(gn(r), A);
          return U && va(Yn(), U, r, _);
        };
      }
      function va(r, _, A, U) {
        var H = _.proxy.$options, tt = r.config.optionMergeStrategies[A], Q = Ri(_, U);
        return H[A] = tt(H[A], Q), Q;
      }
      function Ri(r, _) {
        return function() {
          for (var A = [], U = 0; U < arguments.length; U++)
            A[U] = arguments[U];
          var H = uo();
          zo(r);
          try {
            return _.apply(void 0, Be([], ki(A), !1));
          } finally {
            zo(H);
          }
        };
      }
      var ii, Uo = Gi("mounted");
      function Ii() {
        ai(this, So);
      }
      function ga() {
        ai(this, ko);
      }
      function Ao(r) {
        return r[So] !== void 0;
      }
      function Ir(r) {
        r[So] = [], r[ko] = [], r.$on("hook:beforeUpdate", Ii), r.$on("hook:updated", ga);
      }
      function yr(r) {
        return qn({ immediate: !1, deep: !1, flush: "pre" }, r);
      }
      function ya() {
        var r = Wi();
        return r ? Ao(r) || Ir(r) : (ii || (ii = Lo(Yn())), r = ii), r;
      }
      function ai(r, _) {
        for (var A = r[_], U = 0; U < A.length; U++)
          A[U]();
        A.length = 0;
      }
      function Wo(r, _, A) {
        var U = function() {
          r.$nextTick(function() {
            r[So].length && ai(r, So), r[ko].length && ai(r, ko);
          });
        };
        switch (A) {
          case "pre":
            U(), r[So].push(_);
            break;
          case "post":
            U(), r[ko].push(_);
            break;
          default:
            fa(!1, 'flush must be one of ["post", "pre", "sync"], but got ' + A);
            break;
        }
      }
      function Ki(r, _, A, U) {
        var H = r._watchers.length;
        return r.$watch(_, A, { immediate: U.immediateInvokeCallback, deep: U.deep, lazy: U.noRun, sync: U.sync, before: U.before }), r._watchers[H];
      }
      function Ji(r, _) {
        var A = r.teardown;
        r.teardown = function() {
          for (var U = [], H = 0; H < arguments.length; H++)
            U[H] = arguments[H];
          A.apply(r, U), _();
        };
      }
      function Zi(r, _, A, U) {
        var H, tt, Q = U.flush, it = Q === "sync", lt = function(qr) {
          tt = function() {
            try {
              qr();
            } catch (Nn) {
              Si(Nn);
            }
          };
        }, kt = function() {
          tt && (tt(), tt = null);
        }, Rt = function(qr) {
          return it || r === ii ? qr : function() {
            for (var Nn = [], gi = 0; gi < arguments.length; gi++)
              Nn[gi] = arguments[gi];
            return Wo(r, function() {
              qr.apply(void 0, Be([], ki(Nn)));
            }, Q);
          };
        };
        if (A === null) {
          var Ot = !1, $t = function() {
            if (!Ot)
              try {
                Ot = !0, _(lt);
              } finally {
                Ot = !1;
              }
          }, ne = Ki(r, $t, vr, { deep: U.deep || !1, sync: it, before: kt });
          Ji(ne, kt), ne.lazy = !1;
          var De = ne.get.bind(ne);
          return ne.get = Rt(De), function() {
            ne.teardown();
          };
        }
        var oe, Te = U.deep, ir = !1;
        if (gr(_) ? oe = function() {
          return _.value;
        } : Gn(_) ? (oe = function() {
          return _;
        }, Te = !0) : $n(_) ? (ir = !0, oe = function() {
          return _.map(function(qr) {
            return gr(qr) ? qr.value : Gn(qr) ? Eo(qr) : kn(qr) ? qr() : vr;
          });
        }) : oe = kn(_) ? _ : vr, Te) {
          var Li = oe;
          oe = function() {
            return Eo(Li());
          };
        }
        var vi = function(qr, Nn) {
          if (Te || !ir || !qr.every(function(gi, ss) {
            return Object.is(gi, Nn[ss]);
          }))
            return kt(), A(qr, Nn, lt);
        }, Ka = Rt(vi);
        if (U.immediate) {
          var os = Ka, is = function(qr, Nn) {
            return is = os, vi(qr, $n(qr) ? [] : Nn);
          };
          Ka = function(qr, Nn) {
            return is(qr, Nn);
          };
        }
        var as = r.$watch(oe, Ka, { immediate: U.immediate, deep: Te, sync: it }), Ni = r._watchers[r._watchers.length - 1];
        return Gn(Ni.value) && ((H = Ni.value.__ob__) === null || H === void 0 ? void 0 : H.dep) && Te && Ni.value.__ob__.dep.addSub({ update: function() {
          Ni.run();
        } }), Ji(Ni, kt), function() {
          as();
        };
      }
      function ba(r, _, A) {
        var U = null;
        kn(_) ? U = _ : (A = _, U = null);
        var H = yr(A), tt = ya();
        return Zi(tt, r, U, H);
      }
      function Eo(r, _) {
        if (_ === void 0 && (_ = /* @__PURE__ */ new Set()), !Pn(r) || _.has(r))
          return r;
        if (_.add(r), gr(r))
          Eo(r.value, _);
        else if ($n(r))
          for (var A = 0; A < r.length; A++)
            Eo(r[A], _);
        else if (Bi(r) || Zo(r))
          r.forEach(function(H) {
            Eo(H, _);
          });
        else if (Wn(r))
          for (var U in r)
            Eo(r[U], _);
        return r;
      }
      function Ie(r) {
        var _, A, U, H, tt = Wi();
        if (kn(r) ? _ = r : (_ = r.get, A = r.set), tt && !tt.$isServer) {
          var Q, it = Fo(), lt = it.Watcher, kt = it.Dep;
          H = function() {
            return Q || (Q = new lt(tt, _, vr, { lazy: !0 })), Q.dirty && Q.evaluate(), kt.target && Q.depend(), Q.value;
          }, U = function(Ot) {
            A && A(Ot);
          };
        } else {
          var Rt = Lo(Yn(), { computed: { $$state: { get: _, set: A } } });
          tt && tt.$on("hook:destroyed", function() {
            return Rt.$destroy();
          }), H = function() {
            return Rt.$$state;
          }, U = function(Ot) {
            Rt.$$state = Ot;
          };
        }
        return ji({ get: H, set: U }, !A, !0);
      }
      function Ma(r, _, A) {
        var U = r.__composition_api_state__ = r.__composition_api_state__ || {};
        U[_] = A;
      }
      function za(r, _) {
        return (r.__composition_api_state__ || {})[_];
      }
      var po = { set: Ma, get: za };
      function Da(r, _, A) {
        var U = r.$options.props;
        _ in r || U && Sn(U, _) || (gr(A) ? Hr(r, _, { get: function() {
          return A.value;
        }, set: function(H) {
          A.value = H;
        } }) : Hr(r, _, { get: function() {
          return Gn(A) && A.__ob__.dep.depend(), A;
        }, set: function(H) {
          A = H;
        } }));
      }
      function Ti(r) {
        var _ = po.get(r, "rawBindings") || {};
        if (_ && Object.keys(_).length) {
          for (var A = r.$refs, U = po.get(r, "refs") || [], H = 0; H < U.length; H++) {
            var tt = U[H], Q = _[tt];
            !A[tt] && Q && gr(Q) && (Q.value = null);
          }
          var it = Object.keys(A), lt = [];
          for (H = 0; H < it.length; H++)
            tt = it[H], Q = _[tt], A[tt] && Q && gr(Q) && (Q.value = A[tt], lt.push(tt));
          po.set(r, "refs", lt);
        }
      }
      function Kn(r, _) {
        var A, U;
        if (r) {
          var H = po.get(r, "attrBindings");
          if (H || _) {
            if (!H) {
              var tt = vn({});
              H = { ctx: _, data: tt }, po.set(r, "attrBindings", H), Hr(_, "attrs", { get: function() {
                return H == null ? void 0 : H.data;
              }, set: function() {
              } });
            }
            var Q = r.$attrs, it = function(Ot) {
              Sn(H.data, Ot) || Hr(H.data, Ot, { get: function() {
                return r.$attrs[Ot];
              } });
            };
            try {
              for (var lt = hn(Object.keys(Q)), kt = lt.next(); !kt.done; kt = lt.next()) {
                var Rt = kt.value;
                it(Rt);
              }
            } catch (Ot) {
              A = { error: Ot };
            } finally {
              try {
                kt && !kt.done && (U = lt.return) && U.call(lt);
              } finally {
                if (A)
                  throw A.error;
              }
            }
          }
        }
      }
      function yn(r, _) {
        var A = r.$options._parentVnode;
        if (A) {
          for (var U = po.get(r, "slots") || [], H = No(A.data.scopedSlots, r.$slots), tt = 0; tt < U.length; tt++) {
            var Q = U[tt];
            H[Q] || delete _[Q];
          }
          var it = Object.keys(H);
          for (tt = 0; tt < it.length; tt++)
            Q = it[tt], _[Q] || (_[Q] = qi(r, Q));
          po.set(r, "slots", it);
        }
      }
      function qo(r, _, A) {
        var U = uo();
        zo(r);
        try {
          return _(r);
        } catch (H) {
          if (!A)
            throw H;
          A(H);
        } finally {
          zo(U);
        }
      }
      function Xi(r) {
        function _() {
          var Q = this, it = Q.$options, lt = it.setup, kt = it.render;
          if (kt && (it.render = function() {
            for (var Ot = this, $t = [], ne = 0; ne < arguments.length; ne++)
              $t[ne] = arguments[ne];
            return qo(Do(Q), function() {
              return kt.apply(Ot, $t);
            });
          }), lt && kn(lt)) {
            var Rt = it.data;
            it.data = function() {
              return A(Q, Q.$props), kn(Rt) ? Rt.call(Q, Q) : Rt || {};
            };
          }
        }
        function A(Q, it) {
          it === void 0 && (it = {});
          var lt, kt = Q.$options.setup, Rt = tt(Q), Ot = Do(Q);
          if (Ot.setupContext = Rt, Jo(it, "__ob__", Rn()), yn(Q, Rt.slots), qo(Ot, function() {
            lt = kt(it, Rt);
          }), lt) {
            if (kn(lt)) {
              var $t = lt;
              Q.$options.render = function() {
                return yn(Q, Rt.slots), qo(Ot, function() {
                  return $t();
                });
              };
            } else if (Pn(lt)) {
              Gn(lt) && (lt = oi(lt)), po.set(Q, "rawBindings", lt);
              var ne = lt;
              Object.keys(ne).forEach(function(De) {
                var oe = ne[De];
                if (!gr(oe))
                  if (Gn(oe))
                    $n(oe) && (oe = Cn(oe));
                  else if (kn(oe)) {
                    var Te = oe;
                    oe = oe.bind(Q), Object.keys(Te).forEach(function(ir) {
                      oe[ir] = Te[ir];
                    });
                  } else
                    Pn(oe) ? H(oe) && U(oe) : oe = Cn(oe);
                Da(Q, De, oe);
              });
            }
          }
        }
        function U(Q, it) {
          if (it === void 0 && (it = /* @__PURE__ */ new Set()), !it.has(Q) && Wn(Q) && !gr(Q) && !Gn(Q) && !fo(Q)) {
            var lt = Yn(), kt = lt.util.defineReactive;
            Object.keys(Q).forEach(function(Rt) {
              var Ot = Q[Rt];
              kt(Q, Rt, Ot), Ot && (it.add(Ot), U(Ot, it));
            });
          }
        }
        function H(Q, it) {
          return it === void 0 && (it = /* @__PURE__ */ new Map()), it.has(Q) ? it.get(Q) : (it.set(Q, !1), $n(Q) && Gn(Q) ? (it.set(Q, !0), !0) : !(!Wn(Q) || fo(Q) || gr(Q)) && Object.keys(Q).some(function(lt) {
            return H(Q[lt], it);
          }));
        }
        function tt(Q) {
          var it = { slots: {} }, lt = ["root", "parent", "refs", "listeners", "isServer", "ssrContext"], kt = ["emit"];
          return lt.forEach(function(Rt) {
            var Ot = "$" + Rt;
            Hr(it, Rt, { get: function() {
              return Q[Ot];
            }, set: function() {
            } });
          }), Kn(Q, it), kt.forEach(function(Rt) {
            var Ot = "$" + Rt;
            Hr(it, Rt, { get: function() {
              return function() {
                for (var $t = [], ne = 0; ne < arguments.length; ne++)
                  $t[ne] = arguments[ne];
                var De = Q[Ot];
                De.apply(Q, $t);
              };
            } });
          }), it;
        }
        r.mixin({ beforeCreate: _, mounted: function() {
          Ti(this);
        }, beforeUpdate: function() {
          Kn(this);
        }, updated: function() {
          var Q;
          Ti(this), !((Q = this.$vnode) === null || Q === void 0) && Q.context && Ti(this.$vnode.context);
        } });
      }
      function wa(r, _) {
        if (!r)
          return _;
        if (!_)
          return r;
        for (var A, U, H, tt = xi ? Reflect.ownKeys(r) : Object.keys(r), Q = 0; Q < tt.length; Q++)
          A = tt[Q], A !== "__ob__" && (U = _[A], H = r[A], Sn(_, A) ? U !== H && Wn(U) && !gr(U) && Wn(H) && !gr(H) && wa(H, U) : _[A] = H);
        return _;
      }
      function La(r) {
        on(r) || (r.config.optionMergeStrategies.setup = function(_, A) {
          return function(U, H) {
            return wa(kn(_) ? _(U, H) || {} : void 0, kn(A) ? A(U, H) || {} : void 0);
          };
        }, Ta(r), Xi(r));
      }
      var Qi = { install: function(r) {
        return La(r);
      } };
      function _a(r) {
        return r;
      }
      function ta(r) {
        r = r || S.default, r && !r.__composition_api_installed__ && S.default.use(Qi);
      }
      typeof window < "u" && window.Vue && window.Vue.use(Qi), ta(S.default), S.default, S.default.version;
      var p = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("BaseCard", { scopedSlots: r._u([{ key: "header", fn: function() {
          return [A("AccountHeader", { attrs: { "has-all-shops-linked": r.hasAllShopsLinked } }, [r._v(" " + r._s(r.$tc("psaccounts.account.title", r.shopsWithUrl.length)) + " ")])];
        }, proxy: !0 }, { key: "body", fn: function() {
          return [r.hasShopsWithoutUrl ? A("ShopUrlShouldExistsAlert", { attrs: { "has-all-shops-without-url": r.hasAllShopsWithoutUrl, "shop-names-without-url": r.shopNamesWithoutUrl } }) : r._e(), A("div", { staticClass: "acc-flex acc-flex-col acc-items-center md:acc-flex-row", class: { "acc-mt-2": r.hasShopsWithoutUrl } }, [A("AccountShopLinkMessage", { staticClass: "md:acc-mr-2", attrs: { shops: r.shopsWithUrl } }), A("AccountLinkToUi", { staticClass: "acc-mt-2 md:acc-mt-0", attrs: { "accounts-ui-url": r.accountsUiUrl, app: r.app, "backend-user": r.backendUser, "onboarding-link": r.onboardingLink, shops: r.shopsWithUrl, "shop-context": r.shopContext } })], 1), r.isLinkedV4 ? A("ModuleUpdateInformationAlert", { staticClass: "acc-mt-6" }) : r._e(), r.userHasEmailNotVerified ? A("UserEmailNotValidatedAlert", { staticClass: "acc-mt-6", attrs: { "sso-resend-verification-email": r.ssoResendVerificationEmail } }) : r._e(), r.backendUser.isSuperAdmin ? r._e() : A("UserNotSuperAdminAlert", { staticClass: "acc-mt-6", attrs: { "super-admin-email": r.superAdminEmail } }), r.$slots.default ? A("div", { staticClass: "acc-mt-6" }, [r._t("default")], 2) : r._e()];
        }, proxy: !0 }], null, !0) });
      }, C = [], I = (o("a9e3"), o("d81d"), o("b0c0"), function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("div", { staticClass: "acc-bg-white acc-border acc-border-grey-200 acc-rounded-lg" }, [A("header", { staticClass: "acc-p-6 acc-text-base acc-font-bold acc-font-primary acc-text-grey-900" }, [r._t("header")], 2), A("div", { staticClass: "acc-font-secondary acc-px-6 acc-pb-6" }, [r._t("body")], 2)]);
      }), B = [], q = { name: "BaseCard" }, X = q;
      function J(r, _, A, U, H, tt, Q, it) {
        var lt, kt = typeof r == "function" ? r.options : r;
        if (_ && (kt.render = _, kt.staticRenderFns = A, kt._compiled = !0), U && (kt.functional = !0), tt && (kt._scopeId = "data-v-" + tt), Q ? (lt = function($t) {
          $t = $t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, $t || typeof __VUE_SSR_CONTEXT__ > "u" || ($t = __VUE_SSR_CONTEXT__), H && H.call(this, $t), $t && $t._registeredComponents && $t._registeredComponents.add(Q);
        }, kt._ssrRegister = lt) : H && (lt = it ? function() {
          H.call(this, (kt.functional ? this.parent : this).$root.$options.shadowRoot);
        } : H), lt)
          if (kt.functional) {
            kt._injectStyles = lt;
            var Rt = kt.render;
            kt.render = function($t, ne) {
              return lt.call(ne), Rt($t, ne);
            };
          } else {
            var Ot = kt.beforeCreate;
            kt.beforeCreate = Ot ? [].concat(Ot, lt) : [lt];
          }
        return { exports: r, options: kt };
      }
      var rt, ut = J(X, I, B, !1, null, null, null), st = ut.exports, ft = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("div", { staticClass: "acc-flex acc-items-center" }, [r.hasAllShopsLinked ? A("span", { staticClass: "acc-flex-shrink-0 acc-w-6 acc-h-6 acc-mr-2 acc-p-0.5 acc-rounded-full acc-bg-success-500" }, [A("CheckIcon", { staticClass: "acc-text-white" })], 1) : r._e(), A("p", { staticClass: "acc-m-0 acc-font-primary acc-font-semibold" }, [r._t("default")], 2)]);
      }, ht = [], gt = o("8525"), bt = o.n(gt), Ct = { name: "AccountHeader", components: { CheckIcon: bt.a }, props: { hasAllShopsLinked: { type: Boolean, required: !0 } } }, Bt = Ct, re = J(Bt, ft, ht, !1, null, null, null), Xt = re.exports, pe = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return r.hasAllShopsWithoutUrl ? r._e() : A("div", [r.hasAllShopsLinked ? r.hasShopsLinked ? A(r.isShopContext && r.hasShopsLinkedByUserInBackoffice ? "BaseDropdown" : "BaseButton", { tag: "component", attrs: { id: "manage-shops-" + (r.isShopContext ? "dropdown" : "button"), variant: "secondary", text: r.$t("psaccounts.account.manageAccountButton"), disabled: !r.backendUser.isSuperAdmin }, on: { click: function(U) {
          return r.openLinkShopModal("manage");
        } } }, [r.isShopContext && r.hasShopsLinkedByUserInBackoffice ? A("BaseDropdownItemButton", { on: { click: function(U) {
          return r.openLinkShopModal("unlink");
        } } }, [r._v(" " + r._s(r.$t("psaccounts.account.unlinkButton")) + " ")]) : [r._v(" " + r._s(r.$t("psaccounts.account.manageAccountButton")) + " ")]], 2) : r._e() : A(r.hasShopsLinked ? "BaseDropdown" : "BaseButton", { tag: "component", attrs: { id: "associate-shop-" + (r.hasShopsLinked ? "dropdown" : "button"), text: r.$t("psaccounts.account." + (r.isLinkedV4 ? "reonboard" : "connect") + "Button"), disabled: !r.backendUser.isSuperAdmin }, on: { click: function(U) {
          return r.openLinkShopModal(r.isLinkedV4 ? "reonboard" : "associate");
        } } }, [r.hasShopsLinked ? A("BaseDropdownItemButton", { on: { click: function(U) {
          return r.openLinkShopModal("manage");
        } } }, [r._v(" " + r._s(r.$t("psaccounts.account.manageAccountButton")) + " ")]) : [r._v(" " + r._s(r.$t("psaccounts.account." + (r.isLinkedV4 ? "reonboard" : "connect") + "Button")) + " ")]], 2), A("link-shop-modal", { ref: "linkShopModal", attrs: { "accounts-ui-url": r.accountsUiUrl, app: r.app, "on-boarding-link": r.onboardingLink, shops: r.unlinkedShopsWithEmployeeId, "specific-ui-url": r.specificUiUrl }, on: { closed: r.closeOnBoarding } })], 1);
      }, ge = [];
      o("caad"), o("25f0"), function(r) {
        r[r.Shop = 1] = "Shop", r[r.Group = 2] = "Group", r[r.All = 4] = "All";
      }(rt || (rt = {}));
      var Ft, Ue = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("button", { staticClass: `acc-inline-block acc-py-2 acc-px-4
    acc-border acc-border-transparent acc-rounded
    acc-font-primary acc-text-sm acc-text-center acc-font-semibold acc-align-middle acc-whitespace-nowrap
    acc-select-none acc-cursor-pointer acc-transition-all focus:acc-ring focus:acc-ring-blue-focus acc-ring-offset-2 focus:acc-outline-none disabled:acc-cursor-not-allowed`, class: { "acc-bg-purple-500 acc-text-white hover:acc-bg-purple-700 active:acc-bg-purple-900 disabled:acc-bg-purple-50": r.variant === "primary", "acc-bg-white acc-border-purple-500 acc-text-purple-500 hover:acc-bg-purple-500 hover:acc-text-white active:acc-bg-purple-900 disabled:acc-text-purple-100 disabled:acc-border-purple-100": r.variant === "secondary", "acc-border-grey-500 acc-text-grey-900 hover:acc-bg-grey-100 active:acc-bg-grey-400 disabled:acc-text-grey-400 disabled:acc-border-grey-100": r.variant === "tertiary" }, attrs: { type: "button", disabled: r.disabled }, on: { click: function(U) {
          return r.$emit("click");
        } } }, [r._t("default")], 2);
      }, me = [];
      (function(r) {
        r.Primary = "primary", r.Secondary = "secondary", r.Tertiary = "tertiary";
      })(Ft || (Ft = {}));
      var ve, Re = { name: "BaseButton", props: { disabled: { type: Boolean, default: !1 }, variant: { type: String, default: Ft.Primary } } }, pr = Re, Dr = J(pr, Ue, me, !1, null, null, null), Je = Dr.exports, Jn = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("div", { directives: [{ name: "click-outside", rawName: "v-click-outside", value: r.closeDropdown, expression: "closeDropdown" }], staticClass: "acc-relative acc-inline-flex acc-font-primary acc-align-middle", on: { keyup: function(U) {
          return !U.type.indexOf("key") && r._k(U.keyCode, "esc", 27, U.key, ["Esc", "Escape"]) ? null : r.closeDropdown.apply(null, arguments);
        } } }, [A("BaseButton", { staticClass: "acc-rounded-r-none", attrs: { id: "acc-dropdown-" + r._uid, variant: "secondary", disabled: r.disabled }, on: { click: function(U) {
          return r.$emit("click");
        } } }, [r._v(" " + r._s(r.text) + " ")]), A("BaseButton", { staticClass: "acc-rounded-l-none focus:acc-ring-0", attrs: { disabled: r.disabled, "aria-haspopup": "true", "aria-expanded": r.expanded }, on: { click: r.toggleDropdown } }, [A("MoreHorIcon", { staticClass: "acc-w-5 acc-h-5" })], 1), A("ul", { directives: [{ name: "show", rawName: "v-show", value: r.expanded, expression: "expanded" }], staticClass: "acc-z-50 acc-absolute acc-top-full acc-right-0 acc-mt-1 acc-py-1 acc-bg-white acc-rounded acc-border acc-border-purple-500 acc-shadow", staticStyle: { "min-width": "8rem" }, attrs: { role: "menu", tabindex: "-1", "aria-labelledby": "acc-dropdown-" + r._uid } }, [r._t("default")], 2)], 1);
      }, ho = [], mo = o("c28b"), Zn = o.n(mo), In = o("e694"), Oo = o.n(In), vo = { name: "BaseDropdown", components: { BaseButton: Je, MoreHorIcon: Oo.a }, directives: { clickOutside: Zn.a.directive }, props: { disabled: { type: Boolean, default: !1 }, text: { type: String, required: !0 } }, setup: function() {
        var r = Cn(!1), _ = function() {
          return r.value = !1;
        }, A = function() {
          return r.value = !r.value;
        };
        return { expanded: r, closeDropdown: _, toggleDropdown: A };
      } }, Xn = vo, go = J(Xn, Jn, ho, !1, null, null, null), Tn = go.exports, Me = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("button", { staticClass: "acc-block acc-w-full acc-py-1 acc-px-2 acc-font-secondary acc-text-grey-900 acc-text-left acc-text-sm acc-whitespace-nowrap hover:acc-text-grey-600 focus:acc-text-grey-600 focus:acc-outline-none", attrs: { type: "button", role: "menuitem" }, on: { click: function(U) {
          return r.$emit("click");
        } } }, [r._t("default")], 2);
      }, Ae = [], Ar = { name: "BaseDropdownItemButton" }, Lr = Ar, Er = J(Lr, Me, Ae, !1, null, null, null), Nr = Er.exports, Ee = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("transition", { attrs: { name: "fade" } }, [A("div", { directives: [{ name: "show", rawName: "v-show", value: r.opened, expression: "opened" }], staticClass: "acc-z-1500 acc-fixed acc-inset-0 acc-bg-black acc-bg-opacity-50 acc-overflow-hidden acc-outline-none" }, [A("div", { staticClass: "acc-flex acc-flex-col acc-items-center acc-justify-center acc-w-full acc-h-full", attrs: { role: "document" } }, [r.opened ? A("div", { directives: [{ name: "click-outside", rawName: "v-click-outside", value: r.close, expression: "close" }], staticClass: "acc-w-screen acc-h-screen acc-bg-white acc-rounded-lg acc-shadow-2xl acc-overflow-hidden crossdomain" }, [A("link-shop-crossdomain", { attrs: { app: r.app, specificUiUrl: r.specificUiUrl, shops: r.shops, onBoardingFinished: r.close, accountsUiUrl: r.accountsUiUrl, triggerFallback: r.triggerFallback } })], 1) : r._e()])])]);
      }, Sr = [], En = (o("e9c4"), o("99af"), o("b997")), Gr = ((ve = window) === null || ve === void 0 ? void 0 : ve.psAccountZoidExport) || En.create({ tag: "crossdomains-account-link-shop", url: function(r) {
        var _ = r.props;
        return "".concat(_.accountsUiUrl).concat(_.specificUiUrl, "/");
      }, context: "iframe", dimensions: { height: "100%", width: "100%" }, props: { app: { type: "string", required: !0, queryParam: !0 }, cdc: { type: "boolean", required: !1, default: function() {
        return !0;
      }, queryParam: !0 }, shops: { type: "array", required: !0 }, specificUiUrl: { type: "string", required: !0 }, onBoardingFinished: { type: "function", required: !1 }, tracking: { type: "object", required: !1 }, onLogout: { type: "function", required: !1 }, accountsUiUrl: { type: "string", required: !0 }, triggerFallback: { type: "function", required: !1 } } });
      window.psAccountZoidExport = Gr;
      var bn, an = Gr, dn = { name: "LinkShopModal", components: { "link-shop-crossdomain": an.driver("vue", S.default) }, directives: { clickOutside: Zn.a.directive }, props: { app: { type: String, required: !0 }, shops: { type: Array, required: !0 }, specificUiUrl: { type: String, required: !0 }, onBoardingLink: { type: String, required: !0 }, accountsUiUrl: { type: String, required: !0 } }, setup: function(r, _) {
        var A = _.emit, U = Cn(!1);
        function H() {
          U.value = !0;
        }
        function tt() {
          U.value = !1, A("closed");
        }
        function Q() {
          var it = btoa(JSON.stringify(r.shops)), lt = "".concat(r.accountsUiUrl).concat(r.specificUiUrl, "?");
          lt += "shops=".concat(it, "&return_to=").concat(encodeURIComponent(window.location.href)), window.location.assign(lt);
        }
        return Uo(function() {
          setTimeout(function() {
            document.querySelector(".crossdomain .zoid-invisible") && Q();
          }, 6e4);
        }), { opened: U, open: H, close: tt, triggerFallback: Q };
      } }, yo = dn, jo = (o("9ea5"), J(yo, Ee, Sr, !1, null, "03440518", null)), Qn = jo.exports, si = { name: "AccountLinkToUi", components: { BaseButton: Je, BaseDropdown: Tn, BaseDropdownItemButton: Nr, LinkShopModal: Qn }, props: { accountsUiUrl: { type: String, required: !0 }, app: { type: String, required: !0 }, backendUser: { type: Object, required: !0 }, onboardingLink: { type: String, required: !0 }, shops: { type: Array, default: function() {
        return [];
      } }, shopContext: { type: Number, required: !0 } }, setup: function(r, _) {
        var A = _.refs, U = Cn("associate"), H = Cn(!1), tt = Ie(function() {
          return ne.value.length === 0;
        }), Q = Ie(function() {
          return r.shops.every(function(ir) {
            return ir.domain === null;
          });
        }), it = Ie(function() {
          return lt.value || kt.value;
        }), lt = Ie(function() {
          return r.shops.some(function(ir) {
            return ir.employeeId === r.backendUser.employeeId;
          });
        }), kt = Ie(function() {
          return r.shops.some(function(ir) {
            return ir.uuid !== null && !ir.isLinkedV4 && ir.employeeId === null;
          });
        }), Rt = Ie(function() {
          return r.shops.every(function(ir) {
            return ir.isLinkedV4;
          });
        }), Ot = Ie(function() {
          return r.shopContext === rt.Shop;
        }), $t = Ie(function() {
          return ["reonboard", "associate"].includes(U.value) ? "" : ["unlink"].includes(U.value) ? "/shop/".concat(r.shops[0].uuid) : "/shop";
        }), ne = Ie(function() {
          return r.shops.filter(function(ir) {
            return !ir.uuid || ir.uuid && ir.isLinkedV4;
          });
        }), De = Ie(function() {
          return ne.value.map(function(ir) {
            return u(u({}, ir), {}, { employeeId: r.backendUser.employeeId.toString() });
          });
        });
        function oe(ir) {
          r.backendUser.isSuperAdmin && (U.value = ir, H.value = !0);
        }
        function Te() {
          H.value = !1, window.location.reload();
        }
        return ba(H, function(ir) {
          var Li, vi;
          if (ir)
            return (vi = A.linkShopModal) === null || vi === void 0 || vi.open(), void document.body.classList.add("ui-displayed");
          (Li = A.linkShopModal) === null || Li === void 0 || Li.close(), document.body.classList.remove("ui-displayed");
        }), { cdcUiDisplayed: H, hasAllShopsLinked: tt, hasAllShopsWithoutUrl: Q, hasShopsLinked: it, hasShopsLinkedByUserInBackoffice: lt, isLinkedV4: Rt, isShopContext: Ot, specificUiUrl: $t, unlinkedShopsWithEmployeeId: De, openLinkShopModal: oe, closeOnBoarding: Te };
      } }, Vo = si, Ho = (o("63f5"), J(Vo, pe, ge, !1, null, null, null)), Yo = Ho.exports, xa = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("div", { staticClass: "acc-flex acc-flex-col acc-flex-grow acc-items-center md:acc-flex-row" }, [A("PuffinLogo", { staticClass: "acc-w-11 acc-h-11 md:acc-mr-3" }), A("div", { staticClass: "acc-mt-2 acc-font-secondary acc-text-sm acc-text-center acc-align-middle md:acc-mt-0 md:acc-text-left" }, [r.hasSomeShopsLinked ? [r.hasShopsLinkedBySameUser ? A("div", [A("p", { staticClass: "acc-m-0" }, [r._v(" " + r._s(r.$tc("psaccounts.account.authorized", r.linkedShops.length)) + " ")]), A("p", { staticClass: "acc-m-0 acc-text-grey-600 acc-break-words" }, [r._v(" " + r._s(r.linkedUserEmail) + " ")])]) : r.hasOneOrMoreNotLinkedShop ? A("span", [r._v(" " + r._s(r.$t("psaccounts.account.authorizedPartially")) + " ")]) : A("span", [r._v(" " + r._s(r.$t("psaccounts.account.authorizedSeveral")) + " ")])] : A("span", [r._v(" " + r._s(r.$t("psaccounts.account.authorize")) + " ")])], 2)], 1);
      }, ea = [], ci = o("14d2"), Mn = o.n(ci), Mi = { name: "AccountShopLinkMessage", components: { PuffinLogo: Mn.a }, props: { shops: { type: Array, default: function() {
        return [];
      } } }, setup: function(r) {
        var _ = Ie(function() {
          return r.shops.some(function(Q) {
            return !Q.uuid;
          });
        }), A = Ie(function() {
          return r.shops.some(function(Q) {
            return Q.uuid && !Q.isLinkedV4;
          });
        }), U = Ie(function() {
          return r.shops.every(function(Q) {
            return Q.employeeId === r.shops[0].employeeId;
          });
        }), H = Ie(function() {
          return r.shops.filter(function(Q) {
            return Q.uuid && !Q.isLinkedV4;
          });
        }), tt = Ie(function() {
          var Q, it;
          return ((Q = H.value[0]) === null || Q === void 0 || (it = Q.user) === null || it === void 0 ? void 0 : it.email) || "";
        });
        return { hasOneOrMoreNotLinkedShop: _, hasSomeShopsLinked: A, hasShopsLinkedBySameUser: U, linkedShops: H, linkedUserEmail: tt };
      } }, ra = Mi, ui = J(ra, xa, ea, !1, null, null, null), li = ui.exports, na = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("BaseAlert", { attrs: { variant: "info" } }, [A("p", { staticClass: "acc-m-0 acc-p-0 acc-text-sm acc-leading-6", domProps: { innerHTML: r._s(r.$t("psaccounts.account.moduleUpdateInformation")) } })]);
      }, Sa = [], zi = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return r.isDisplayed ? A("div", { staticClass: "acc-relative acc-flex acc-flex-col md:acc-flex-row acc-items-start acc-p-4 acc-border acc-rounded-lg", class: { "acc-bg-success-50 acc-border-success-500": r.variant === "success", "acc-bg-danger-50 acc-border-danger-500": r.variant === "danger", "acc-bg-warning-50 acc-border-warning-500": r.variant === "warning", "acc-bg-info-50 acc-border-info-500": r.variant === "info" } }, [A("div", { staticClass: "acc-flex acc-flex-row acc-flex-grow" }, [A(r.variant + "-icon", { tag: "component", staticClass: "acc-w-6 acc-h-6 acc-flex-shrink-0", class: { "acc-text-success-500": r.variant === "success", "acc-text-danger-500": r.variant === "danger", "acc-text-warning-500": r.variant === "warning", "acc-text-info-500": r.variant === "info" } }), A("div", { staticClass: "acc-mx-4" }, [r.title ? A("h3", { staticClass: "acc-text-base acc-font-semibold acc-font-primary acc-mb-1" }, [r._v(r._s(r.title))]) : r._e(), A("div", { staticClass: "acc-flex-1 acc-font-secondary acc-text-sm" }, [r._t("default")], 2)])], 1), r.buttonLabel ? A("button", { staticClass: "acc-font-primary acc-text-grey-900 acc-font-semibold acc-text-sm acc-px-4 acc-py-3 acc-border acc-rounded acc-mt-2 acc-ml-10 md:acc-m-0 block", class: { "acc-border-success-500": r.variant === "success", "acc-border-danger-500": r.variant === "danger", "acc-border-warning-500": r.variant === "warning", "acc-border-info-500": r.variant === "info" }, on: { click: function(U) {
          return r.$emit("clicked");
        } } }, [r._v(" " + r._s(r.buttonLabel) + " ")]) : r._e(), r.dismissible ? A("button", { staticClass: "acc-absolute acc-top-4 acc-right-4 acc-flex-shrink-0 acc-w-6 acc-h-6 acc-p-0 acc-text-grey-600 acc-bg-transparent acc-border-0 acc-text-xl acc-leading-3 acc-appearance-none acc-cursor-pointer", attrs: { type: "button", "aria-label": "Close" }, on: { click: r.dismiss } }, [r._v(" \xD7 ")]) : r._e()]) : r._e();
      }, Di = [], ka = o("15be"), Na = o.n(ka), Tt = o("5daa"), qt = o.n(Tt), Gt = o("845c"), ee = o.n(Gt);
      (function(r) {
        r.Success = "success", r.Danger = "danger", r.Warning = "warning", r.Info = "info";
      })(bn || (bn = {}));
      var ae = { name: "BaseAlert", components: { SuccessIcon: bt.a, DangerIcon: Na.a, WarningIcon: qt.a, InfoIcon: ee.a }, props: { title: { type: String, required: !1, default: "" }, dismissible: { type: Boolean, default: !1 }, show: { type: Boolean, default: !0 }, variant: { type: String, default: bn.Success }, buttonLabel: { type: String, required: !1, default: "" } }, emits: ["dismissed", "clicked"], setup: function(r, _) {
        var A = _.emit, U = Cn(r.show);
        function H() {
          U.value = !1, A("dismissed");
        }
        return ba(function() {
          return r.show;
        }, function(tt) {
          U.value = tt;
        }), { dismiss: H, isDisplayed: U };
      } }, ze = ae, Ze = J(ze, zi, Di, !1, null, null, null), rr = Ze.exports, hr = { name: "ModuleUpdateInformationAlert", components: { BaseAlert: rr } }, $e = hr, Zr = J($e, na, Sa, !1, null, null, null), Or = Zr.exports, Fr = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("BaseAlert", { attrs: { variant: r.hasAllShopsWithoutUrl ? "danger" : "warning" } }, [A("h3", { staticClass: "acc-m-0 acc-p-0 acc-text-base acc-font-bold" }, [r._v(" " + r._s(r.$t("psaccounts.alertShopDomainShouldExists.title")) + " ")]), A("p", { staticClass: "acc-m-0 acc-mt-2 acc-p-0 acc-text-sm" }, [A("span", { domProps: { innerHTML: r._s(r.$t("psaccounts.alertShopDomainShouldExists.message")) } }), r._v(" " + r._s(r.shopNamesWithoutUrl.join(", ")) + " ")])]);
      }, Br = [], lr = { name: "ShopUrlShouldExistsAlert", components: { BaseAlert: rr }, props: { hasAllShopsWithoutUrl: { type: Boolean, required: !0 }, shopNamesWithoutUrl: { type: Array, required: !0 } } }, jr = lr, sn = J(jr, Fr, Br, !1, null, null, null), nr = sn.exports, cn = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("BaseAlert", { attrs: { title: r.$t("psaccounts.account.emailNotVerified.title"), "button-label": r.$t("psaccounts.account.sendEmail"), variant: "warning" }, on: { clicked: r.sendEmailConfirmation } }, [A("p", { staticClass: "acc-m-0 acc-p-0" }, [r._v(r._s(r.$t("psaccounts.account.emailNotVerified.description")))])]);
      }, Xr = [], br = { name: "UserEmailNotValidatedAlert", components: { BaseAlert: rr }, props: { ssoResendVerificationEmail: { type: String, required: !0 } }, setup: function(r) {
        function _() {
          window.open(r.ssoResendVerificationEmail, "_blank");
        }
        return { sendEmailConfirmation: _ };
      } }, Ur = br, pn = J(Ur, cn, Xr, !1, null, null, null), fi = pn.exports, zn = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("BaseAlert", { attrs: { variant: "warning" } }, [A("p", { staticClass: "acc-m-0 acc-p-0 acc-text-sm acc-leading-6" }, [r._v(" " + r._s(r.$t("psaccounts.account.needToBeAdmin")) + " ")]), A("p", { staticClass: "acc-m-0 acc-p-0 acc-text-sm acc-leading-6" }, [r._v(" " + r._s(r.$t("psaccounts.account.pleaseContact")) + " "), A("a", { staticClass: "acc-font-semibold acc-text-grey-900 acc-underline hover:acc-text-grey-600", attrs: { href: "mailto:" + r.superAdminEmail } }, [r._v(" " + r._s(r.superAdminEmail) + " ")])])]);
      }, Dn = [], to = { name: "UserNotSuperAdminAlert", components: { BaseAlert: rr }, props: { superAdminEmail: { type: String, required: !0 } } }, On = to, he = J(On, zn, Dn, !1, null, null, null), er = he.exports, Xe = { name: "AccountPanel", components: { BaseCard: st, AccountHeader: Xt, AccountLinkToUi: Yo, AccountShopLinkMessage: li, ModuleUpdateInformationAlert: Or, ShopUrlShouldExistsAlert: nr, UserEmailNotValidatedAlert: fi, UserNotSuperAdminAlert: er }, props: { accountsUiUrl: { type: String, required: !0 }, app: { type: String, required: !0 }, backendUser: { type: Object, required: !0 }, onboardingLink: { type: String, required: !0 }, shops: { type: Array, default: function() {
        return [];
      } }, shopContext: { type: Number, required: !0 }, ssoResendVerificationEmail: { type: String, required: !0 }, superAdminEmail: { type: String, required: !0 } }, setup: function(r) {
        var _ = Ie(function() {
          return tt.value.every(function(lt) {
            return lt.uuid;
          });
        }), A = Ie(function() {
          return r.shops.every(function(lt) {
            return lt.domain === null;
          });
        }), U = Ie(function() {
          return r.shops.some(function(lt) {
            return lt.domain === null;
          });
        }), H = Ie(function() {
          return tt.value.every(function(lt) {
            return lt.isLinkedV4;
          });
        }), tt = Ie(function() {
          return r.shops.filter(function(lt) {
            return lt.domain;
          });
        }), Q = Ie(function() {
          return r.shops.filter(function(lt) {
            return lt.domain === null;
          }).map(function(lt) {
            return lt.name;
          });
        }), it = Ie(function() {
          return tt.value.some(function(lt) {
            var kt = lt.employeeId === r.backendUser.employeeId, Rt = lt.user && lt.user.emailIsValidated;
            return kt && !Rt && !lt.isLinkedV4;
          });
        });
        return { hasAllShopsLinked: _, hasAllShopsWithoutUrl: A, hasShopsWithoutUrl: U, isLinkedV4: H, shopsWithUrl: tt, shopNamesWithoutUrl: Q, userHasEmailNotVerified: it };
      } }, qe = Xe, wr = J(qe, p, C, !1, null, null, null), or = wr.exports, Qr = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("div", { staticClass: "acc-relative" }, [r._t("default"), A("div", { directives: [{ name: "show", rawName: "v-show", value: r.show, expression: "show" }], staticClass: "acc-z-10 acc-absolute acc-inset-0" }, [A("div", { staticClass: "acc-absolute acc-inset-0 acc-opacity-70 acc-bg-white acc-blur-0 acc-select-none acc-pointer-events-none" })])], 2);
      }, mr = [], Qt = { name: "BaseOverlay", props: { show: { type: Boolean, default: !1 } } }, se = Qt, zt = J(se, Qr, mr, !1, null, null, null), _e = zt.exports, $o = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return r.alert.module && r.alert.action ? A("ModuleAlert", { attrs: { title: r.$t("psaccounts.alert." + r.alert.module + "." + r.alert.action + ".title"), message: r.$t("psaccounts.alert." + r.alert.module + "." + r.alert.action + ".message"), "action-text": r.$t("psaccounts.alert." + r.alert.module + "." + r.alert.action + ".action"), "loading-text": r.$t("psaccounts.alert." + r.alert.module + "." + r.alert.action + ".loading"), loading: r.loading }, on: { action: r.onAction } }) : r._e();
      }, di = [];
      o("e6cf");
      function pi(r, _, A, U, H, tt, Q) {
        try {
          var it = r[tt](Q), lt = it.value;
        } catch (kt) {
          return void A(kt);
        }
        it.done ? _(lt) : Promise.resolve(lt).then(U, H);
      }
      function Wr(r) {
        return function() {
          var _ = this, A = arguments;
          return new Promise(function(U, H) {
            var tt = r.apply(_, A);
            function Q(lt) {
              pi(tt, U, H, Q, it, "next", lt);
            }
            function it(lt) {
              pi(tt, U, H, Q, it, "throw", lt);
            }
            Q(void 0);
          });
        };
      }
      o("96cf"), o("9911");
      var _r, un, Tr = function() {
        var r = this, _ = r.$createElement, A = r._self._c || _;
        return A("BaseAlert", { attrs: { title: r.title, "button-label": r.loading ? r.loadingText : r.actionText, variant: "warning" }, on: { clicked: function(U) {
          return r.$emit("action");
        } } }, [A("p", { staticClass: "acc-m-0 acc-p-0" }, [r._v(" " + r._s(r.message) + " ")])]);
      }, eo = [], Aa = { name: "ModuleAlert", components: { BaseAlert: rr }, props: { actionText: { type: String, required: !0 }, loading: { type: Boolean, required: !0 }, loadingText: { type: String, required: !0 }, message: { type: String, required: !0 }, title: { type: String, required: !0 } } }, Fa = Aa, ys = J(Fa, Tr, eo, !1, null, null, null), bs = ys.exports;
      function Ba(r) {
        function _(U, H, tt) {
          return A.apply(this, arguments);
        }
        function A() {
          return A = Wr(regeneratorRuntime.mark(function U(H, tt, Q) {
            var it, lt;
            return regeneratorRuntime.wrap(function(kt) {
              for (; ; )
                switch (kt.prev = kt.next) {
                  case 0:
                    return kt.prev = 0, kt.next = 3, fetch(Q, { method: "POST" });
                  case 3:
                    if (it = kt.sent, !r) {
                      kt.next = 13;
                      break;
                    }
                    return kt.next = 7, it.json();
                  case 7:
                    if (lt = kt.sent, it.ok) {
                      kt.next = 10;
                      break;
                    }
                    throw new Error("An error has occured: ".concat(it.status));
                  case 10:
                    if (lt[H].status !== !1) {
                      kt.next = 12;
                      break;
                    }
                    throw new Error("Cannot ".concat(tt, " ").concat(H, " module."));
                  case 12:
                    return kt.abrupt("return", lt);
                  case 13:
                    return kt.prev = 13, kt.finish(13);
                  case 15:
                  case "end":
                    return kt.stop();
                }
            }, U, null, [[0, , 13, 15]]);
          })), A.apply(this, arguments);
        }
        return { manageModule: _ };
      }
      function Ua(r, _) {
        (_ == null || _ > r.length) && (_ = r.length);
        for (var A = 0, U = new Array(_); A < _; A++)
          U[A] = r[A];
        return U;
      }
      function Ja(r) {
        if (Array.isArray(r))
          return Ua(r);
      }
      (function(r) {
        r.Enable = "enable", r.Install = "install", r.Update = "update";
      })(_r || (_r = {})), function(r) {
        r.PsEventbus = "ps_eventbus", r.PsAccounts = "ps_accounts";
      }(un || (un = {})), o("e01a"), o("d28b"), o("3ca3"), o("a630");
      function oa(r) {
        if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null)
          return Array.from(r);
      }
      o("fb6a"), o("00b4");
      function hi(r, _) {
        if (r) {
          if (typeof r == "string")
            return Ua(r, _);
          var A = Object.prototype.toString.call(r).slice(8, -1);
          return A === "Object" && r.constructor && (A = r.constructor.name), A === "Map" || A === "Set" ? Array.from(r) : A === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(A) ? Ua(r, _) : void 0;
        }
      }
      function Wa() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function mi(r) {
        return Ja(r) || oa(r) || hi(r) || Wa();
      }
      o("7db0");
      var ws = o("d370"), Zt = o.n(ws), Po = Zt.a.object().keys({ email: Zt.a.string().email({ tlds: !1 }).allow(null).default(null), employeeId: Zt.a.number(), isSuperAdmin: Zt.a.boolean().required() }).unknown(!0), _s = Zt.a.object().keys({ type: Zt.a.number().required(), id: Zt.a.number().allow(null).default(null) }).unknown(!0), Ln = Zt.a.object().keys({ email: Zt.a.string().email({ tlds: !1 }).allow(null).default(null), uuid: Zt.a.string().allow(null) }).unknown(!0), Mr = Zt.a.object().keys({ domain: Zt.a.string().pattern(/([a-z0-9]+(-[a-z0-9]+)*)+/i, "domain").allow(null).required(), domainSsl: Zt.a.string().pattern(/([a-z0-9]+(-[a-z0-9]+)*)+/i, "domainSsl").allow(null).required(), employeeId: Zt.a.number().allow(null), frontUrl: Zt.a.string().optional().uri().allow(null), id: Zt.a.string().required(), moduleName: Zt.a.string(), multishop: Zt.a.boolean(), name: Zt.a.string().required().min(1).max(128), physicalUri: Zt.a.string().allow(null).allow(!1), psVersion: Zt.a.string().optional(), publicKey: Zt.a.string(), url: Zt.a.string().uri().required(), user: Ln.optional().allow({}).default({}), uuid: Zt.a.string().allow(null), virtualUri: Zt.a.string().optional().allow("").allow(null).allow(!1) }).unknown(!0), Za = Zt.a.object().keys({ id: Zt.a.string().required(), moduleName: Zt.a.string(), multishop: Zt.a.boolean(), name: Zt.a.string().required().min(1).max(128), psVersion: Zt.a.string().optional(), shops: Zt.a.array().items(Mr).min(1).max(128).required() }).unknown(!0), ia = Zt.a.object().keys({ email: Zt.a.string().email({ tlds: !1 }).allow(null).default(null), emailIsValidated: Zt.a.boolean(), isSuperAdmin: Zt.a.boolean().required(), uuid: Zt.a.string().allow(null) }).unknown(!0), Xa = Zt.a.object().keys({ accountsUiUrl: Zt.a.string().allow(null).default(null), adminAjaxLink: Zt.a.string().allow(null).default(null), backendUser: Po.optional().allow({}).default({}), currentContext: _s.optional().allow({}).default({}), currentShop: Mr.optional().allow(null).default(null), isOnboardedV4: Zt.a.boolean(), isShopContext: Zt.a.boolean(), manageAccountLink: Zt.a.string().uri().optional().allow(null).allow("").default(null), onboardingLink: Zt.a.string().uri().optional().allow(null).allow("").default(null), psAccountsEnableLink: Zt.a.string().uri().allow(null).default(null), psAccountsInstallLink: Zt.a.string().uri().allow(null).default(null), psAccountsIsEnabled: Zt.a.boolean().default(!0), psAccountsIsInstalled: Zt.a.boolean().default(!0), psAccountsUpdateLink: Zt.a.string().uri().allow(null).default(null), psAccountsIsUptodate: Zt.a.boolean().default(!0), psAccountsVersion: Zt.a.string().optional(), psIs17: Zt.a.boolean().required(), psxName: Zt.a.string(), segmentApiKey: Zt.a.string().allow(null).default(null), shops: Zt.a.array().items(Za).required().min(0).max(128), ssoResendVerificationEmail: Zt.a.string().uri().optional().allow(null).allow("").default(null), superAdminEmail: Zt.a.string().email({ tlds: !1 }).allow(null).default(null), user: ia.optional().allow({}).default({ email: null }) }).unknown(!0), Go = function() {
        return { psAccountsInstallLink: null, psAccountsEnableLink: null, psAccountsUpdateLink: null, psAccountsIsInstalled: !1, psAccountsIsEnabled: !1, psAccountsIsUptodate: !1, onboardingLink: null, user: { email: null, emailIsValidated: !1, isSuperAdmin: !1 }, currentShop: null, shops: [], superAdminEmail: null, ssoResendVerificationEmail: null, manageAccountLink: null, errors: void 0 };
      }, Kr = vn({ context: {} });
      function Ea() {
        function r(Ot) {
          var $t = u(u(u({}, Go()), window.contextPsAccounts || {}), Ot), ne = Xa.validate($t), De = ne.value, oe = ne.error, Te = u(u({}, De), {}, { errors: oe ? oe.details.map(function(ir) {
            return ir.message;
          }) : [] });
          Kr.context = u({}, Te);
        }
        var _ = Ie(function() {
          var Ot, $t;
          return ((Ot = Kr.context.dependencies) === null || Ot === void 0 || ($t = Ot.ps_eventbus) === null || $t === void 0 ? void 0 : $t.isInstalled) || !1;
        }), A = Ie(function() {
          var Ot, $t;
          return ((Ot = Kr.context.dependencies) === null || Ot === void 0 || ($t = Ot.ps_eventbus) === null || $t === void 0 ? void 0 : $t.isEnabled) || !1;
        }), U = Ie(function() {
          var Ot, $t;
          return ((Ot = Kr.context.dependencies) === null || Ot === void 0 || ($t = Ot.ps_eventbus) === null || $t === void 0 ? void 0 : $t.installLink) || "";
        }), H = Ie(function() {
          var Ot, $t;
          return ((Ot = Kr.context.dependencies) === null || Ot === void 0 || ($t = Ot.ps_eventbus) === null || $t === void 0 ? void 0 : $t.enableLink) || "";
        }), tt = Ie(function() {
          return !_.value && Kr.context.psIs17;
        }), Q = Ie(function() {
          return Kr.context.psIs17 && !A.value;
        }), it = Ie(function() {
          return Kr.context.psAccountsIsUptodate ? Kr.context.psAccountsIsEnabled ? Kr.context.psAccountsIsInstalled ? "installed" : "to_install" : "to_enable" : "to_update";
        }), lt = Ie(function() {
          return A.value ? _.value ? "installed" : "to_install" : "to_enable";
        }), kt = Ie(function() {
          var Ot;
          return (Ot = Kr.context.shops) === null || Ot === void 0 ? void 0 : Ot.reduce(function($t, ne) {
            return [].concat(mi($t), mi(ne.shops));
          }, []);
        }), Rt = Ie(function() {
          var Ot, $t, ne;
          if (!Kr.context.currentContext)
            return [];
          if (Kr.context.currentContext.type === rt.All)
            return kt.value;
          if (Kr.context.currentContext.type === rt.Group)
            return mi((($t = Kr.context.shops) === null || $t === void 0 || (ne = $t.find(function(oe) {
              var Te;
              return parseInt(oe.id, 10) === ((Te = Kr.context.currentContext) === null || Te === void 0 ? void 0 : Te.id);
            })) === null || ne === void 0 ? void 0 : ne.shops) || []);
          var De = (Ot = Kr.context.shops) === null || Ot === void 0 ? void 0 : Ot.reduce(function(oe, Te) {
            return [].concat(mi(oe), mi(Te.shops));
          }, []).find(function(oe) {
            var Te;
            return parseInt(oe.id, 10) === ((Te = Kr.context.currentContext) === null || Te === void 0 ? void 0 : Te.id);
          });
          return De ? [De] : [];
        });
        return u(u({}, oi(Kr)), {}, { eventbusIsEnabled: A, eventbusShouldBeEnabled: Q, eventbusShouldBeInstalled: tt, eventbusInstallLink: U, eventbusEnableLink: H, psAccountModuleState: it, psEventBusModuleState: lt, setContext: r, shopsInContext: Rt });
      }
      var qa = { name: "PsAccountComponentAlertDisplay", components: { ModuleAlert: bs }, setup: function(r, _) {
        var A = _.emit, U = Cn(!1), H = Ea(), tt = H.context, Q = H.eventbusShouldBeEnabled, it = H.eventbusShouldBeInstalled, lt = H.eventbusInstallLink, kt = H.eventbusEnableLink, Rt = Ba(tt.value.psIs17 || !1), Ot = Rt.manageModule, $t = Ie(function() {
          return tt.value.psAccountsIsInstalled ? tt.value.psAccountsIsEnabled ? tt.value.psAccountsIsUptodate ? it.value ? { module: un.PsEventbus, action: _r.Install, link: lt.value } : Q.value ? { module: un.PsEventbus, action: _r.Enable, link: kt.value } : { module: null, action: null, link: null } : { module: un.PsAccounts, action: _r.Update, link: tt.value.psAccountsUpdateLink } : { module: un.PsAccounts, action: _r.Enable, link: tt.value.psAccountsEnableLink } : { module: un.PsAccounts, action: _r.Install, link: tt.value.psAccountsInstallLink };
        });
        function ne() {
          return De.apply(this, arguments);
        }
        function De() {
          return De = Wr(regeneratorRuntime.mark(function oe() {
            return regeneratorRuntime.wrap(function(Te) {
              for (; ; )
                switch (Te.prev = Te.next) {
                  case 0:
                    if ($t.value.module && $t.value.action && $t.value.link) {
                      Te.next = 2;
                      break;
                    }
                    return Te.abrupt("return");
                  case 2:
                    return Te.prev = 2, U.value = !0, Te.next = 6, Ot($t.value.module, $t.value.action, $t.value.link);
                  case 6:
                    window.location.reload(), Te.next = 13;
                    break;
                  case 9:
                    Te.prev = 9, Te.t0 = Te.catch(2), U.value = !1, A("hasError", Te.t0);
                  case 13:
                  case "end":
                    return Te.stop();
                }
            }, oe, null, [[2, 9]]);
          })), De.apply(this, arguments);
        }
        return { alert: $t, loading: U, onAction: ne };
      } }, Qa = qa, xs = J(Qa, $o, di, !1, null, null, null), ts = xs.exports, aa = (o("a2f0"), { name: "PsAccounts", components: { AccountPanel: or, BaseAlert: rr, BaseOverlay: _e, PsAccountComponentAlertDisplay: ts }, props: { context: { type: Object, required: !1, default: function() {
        return window.contextPsAccounts || {};
      } } }, setup: function(r) {
        var _ = Ea(), A = _.context, U = _.setContext, H = _.shopsInContext, tt = Cn(!1), Q = Ie(function() {
          return A.value.psxName;
        }), it = Ie(function() {
          return kt.value.every(function(Rt) {
            return Rt.uuid;
          });
        }), lt = Ie(function() {
          return !A.value.psAccountsIsInstalled || !A.value.psAccountsIsUptodate || !A.value.psAccountsIsEnabled;
        }), kt = Ie(function() {
          var Rt;
          return ((Rt = H.value) === null || Rt === void 0 ? void 0 : Rt.filter(function(Ot) {
            return Ot.domain;
          })) || [];
        });
        return Uo(function() {
          U(r.context);
        }), { validContext: A, app: Q, hasAllShopsLinked: it, hasBlockingAlert: lt, hasError: tt, shops: H };
      } }), Oa = aa, Va = J(Oa, oo, _o, !1, null, null, null), Ha = Va.exports, es = function() {
        var r = window.contextPsAccounts.user || {};
        return !!(r.email && typeof r.email == "string" && r.email.length > 0 && r.isSuperAdmin === !0);
      }, rs = "4.1.0", Ya = { PsAccounts: Ha, AccountPanel: or }, Ga = { install: function(r) {
        r.use(Ro), Object.keys(Ya).forEach(function(_) {
          r.component(_, Ya[_]);
        });
      } };
      function ns() {
        S.default.use(Ga), new S.default({ i18n: la(), components: { "prestashop-accounts": Ha } }).$mount("prestashop-accounts");
      }
      var Ss = u(u({}, Ya), {}, { init: ns, isOnboardingCompleted: es, Plugin: Ga, version: rs });
      G.default = Ss;
    }, fb6a: function(F, G, o) {
      var j = o("23e7"), z = o("da84"), $ = o("e8b5"), m = o("68ee"), v = o("861d"), u = o("23cb"), S = o("07fa"), g = o("fc6a"), w = o("8418"), a = o("b622"), f = o("1dde"), y = o("f36a"), l = f("slice"), c = a("species"), s = z.Array, b = Math.max;
      j({ target: "Array", proto: !0, forced: !l }, { slice: function(h, k) {
        var d, O, M, L = g(this), x = S(L), T = u(h, x), N = u(k === void 0 ? x : k, x);
        if ($(L) && (d = L.constructor, m(d) && (d === s || $(d.prototype)) ? d = void 0 : v(d) && (d = d[c], d === null && (d = void 0)), d === s || d === void 0))
          return y(L, T, N);
        for (O = new (d === void 0 ? s : d)(b(N - T, 0)), M = 0; T < N; T++, M++)
          T in L && w(O, M, L[T]);
        return O.length = M, O;
      } });
    }, fc6a: function(F, G, o) {
      var j = o("44ad"), z = o("1d80");
      F.exports = function($) {
        return j(z($));
      };
    }, fce3: function(F, G, o) {
      var j = o("d039"), z = o("da84"), $ = z.RegExp;
      F.exports = j(function() {
        var m = $(".", "s");
        return !(m.dotAll && m.exec(`
`) && m.flags === "s");
      });
    }, fdbc: function(F, G) {
      F.exports = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };
    }, fdbf: function(F, G, o) {
      var j = o("4930");
      F.exports = j && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }, fea9: function(F, G, o) {
      var j = o("da84");
      F.exports = j.Promise;
    } });
  });
})(Hs);
const Xl = /* @__PURE__ */ Zl(Hs.exports), Ql = /* @__PURE__ */ Kl({
  __proto__: null,
  default: Xl
}, [Hs.exports]);
export {
  Ql as p
};
