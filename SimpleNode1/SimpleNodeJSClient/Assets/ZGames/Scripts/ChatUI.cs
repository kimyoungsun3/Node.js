using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ChatUI : MonoBehaviour
{
    public GameObject msgUnit;
    public GameObject gridMsg;
    public InputField edit;
    public ScrollRect scrollRect;	
    //
    public void btnSendMessage() {
        setMessage();
        edit.Select();
        edit.text = "";        
    }

    public void setMessage() {
        var txt = edit.text;
        if (string.IsNullOrEmpty(txt))
        {
            return;
        }
        NetClientMgr.instance.sendMessage(txt);
        //createMessage(txt);
    }

    public void createMessage(string msg) {
        var msgObj = Instantiate(msgUnit);
        msgObj.transform.parent = gridMsg.transform;
        var txt = msgObj.GetComponentInChildren<Text>();
        txt.text = msg;
    }
}
