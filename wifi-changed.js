/**
 * @description
 * 如果是家里WI-FI则开启直连模式
 * 如果不是家里WI-FI则开启代理模式
 */
const WIFI_DONT_NEED_PROXYS = ['ASUS_4C_5G'];
if (wifiChanged()) {
  if (WIFI_DONT_NEED_PROXYS.includes($network.wifi.ssid)) {
    $surge.setOutboundMode('direct');
    $notification.post(
      'Surge',
      Wi-Fi changed to ${$network.wifi.ssid},
      'use direct mode'
    );
  } else {
    $surge.setSelectGroupPolicy('Final-select', 'Group');
    $surge.setOutboundMode('rule');
    $notification.post(
      'Surge',
      Wi-Fi changed to ${$network.wifi.ssid},
      'use rule-based proxy mode'
    );
  }
}
function wifiChanged() {
  const currentWifiSSid = $persistentStore.read('current_wifi_ssid');
  const changed = currentWifiSSid !== $network.wifi.ssid;
  if (changed) {
    $persistentStore.write($network.wifi.ssid, 'current_wifi_ssid');
  }
  return changed;
}

$done();
