using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace NodeTest
{
	public class Ui_Connect : MonoBehaviour
	{
		[SerializeField] GameObject body;

		public NetworkManager network;

		public void InvokeConnect()
		{
			network.Connect();
			body.SetActive(false);
		}
	}

}