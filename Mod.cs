using System.Reflection;
using Colossal.IO.AssetDatabase;
using Colossal.Logging;
using Game;
using Game.Input;
using Game.Modding;
using Game.SceneFlow;
using UnityEngine;

namespace CS2_BetterDevMenu
{
    public class Mod : IMod
    {
        /// <summary>
        /// Gets the mod's version
        /// </summary>
        public static string Version => Assembly.GetExecutingAssembly().GetName().Version.ToString(4);

        /// <summary>
        /// Gets the mod's informational version
        /// </summary>
        public static string InformationalVersion => Assembly.GetExecutingAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>().InformationalVersion;

        public static ILog log = LogManager.GetLogger($"{nameof(CS2_BetterDevMenu)}.{nameof(Mod)}").SetShowsErrorsInUI(false);

        public void OnLoad(UpdateSystem updateSystem)
        {
            log.Info(nameof(OnLoad));

            if (GameManager.instance.modManager.TryGetExecutableAsset(this, out var asset))
                log.Info($"Current mod asset at {asset.path}");
        }

        public void OnDispose()
        {
            log.Info(nameof(OnDispose));
        }
    }
}
