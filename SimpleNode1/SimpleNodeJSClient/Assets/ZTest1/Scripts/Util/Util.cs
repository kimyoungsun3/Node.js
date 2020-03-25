using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class Util {
	public static Quaternion LookRotation2D(Vector3 _dir)
	{
		float _angle = Mathf.Atan2(_dir.y, _dir.x) * Mathf.Rad2Deg;
		return Quaternion.Euler(Vector3.forward * _angle);
	}

	//public static string ToString(this Vector3 _pos)
	//{
	//	return Format("({0:F1}, {1:F1}, {2:F1})", new object[] { _pos.x, _pos.y, _pos.z });
	//}

}
