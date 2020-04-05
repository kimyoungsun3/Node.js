using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace NodeTest
{
	public class Ui_Connect : MonoBehaviour
	{
		GameObject body;
		private void Start()
		{
			if(body == null)
			{
				body = transform.GetChild(0).gameObject;
			}
		}

		public void Invoke_Connect()
		{
			NetworkManager.ins.Connect();
			body.SetActive(false);
		}
	}

}