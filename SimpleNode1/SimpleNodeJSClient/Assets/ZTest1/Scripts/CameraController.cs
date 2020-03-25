using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour
{
	Transform target;
	Vector3 offset;

	public void SetTarget(Transform _target)
	{
		target = _target;
		offset = target.position - transform.position;
	}

	// Update is called once per frame
	void Update()
    {
        if(target != null)
		{
			transform.position = target.position - offset;
		}
    }
}
