using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class ConnectUI : MonoBehaviour
{
    public GameObject connectUI;
    public GameObject chatUI;
    public InputField ip;
    public InputField port;
    public NetClientMgr client;
	[SerializeField] string defaultIP;
	[SerializeField] string defaultPort;

	private void Start()
	{
		if (!string.IsNullOrEmpty(defaultIP))
		{
			ip.text = defaultIP;
		}

		if (!string.IsNullOrEmpty(defaultPort))
		{
			port.text = defaultPort;
		}
	}

	public void btnConnectAct() {
        connectUI.active = false;
        chatUI.active = true;

        string ip_ = ip.text;
        string port_ = port.text;
        client.Connect(ip_, port_);
    }



}
