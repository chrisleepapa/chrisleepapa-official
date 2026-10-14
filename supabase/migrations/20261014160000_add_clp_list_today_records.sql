CREATE OR REPLACE FUNCTION public.clp_list_today_records(p_initials text, p_pin_hash text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DECLARE
  v_account public.clp_accounts%rowtype;
  v_records jsonb;
BEGIN
  IF p_initials IS NULL OR upper(trim(p_initials)) !~ '^[A-Z]{3}$'
     OR p_pin_hash IS NULL OR p_pin_hash !~ '^[a-fA-F0-9]{64}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', '인증 정보가 올바르지 않습니다.');
  END IF;

  SELECT * INTO v_account
  FROM public.clp_accounts
  WHERE initials = upper(trim(p_initials)) AND pin_hash = lower(p_pin_hash)
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', '인증에 실패했습니다.');
  END IF;

  SELECT COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'record_date', record_date,
        'data', data,
        'updated_at', updated_at
      ) ORDER BY record_date DESC
    ),
    '[]'::jsonb
  )
  INTO v_records
  FROM (
    SELECT record_date, data, updated_at
    FROM public.clp_today
    WHERE account_id = v_account.id
    ORDER BY record_date DESC
    LIMIT 1000
  ) AS recent_records;

  RETURN jsonb_build_object('ok', true, 'records', v_records);
END;
$function$;

REVOKE ALL ON FUNCTION public.clp_list_today_records(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.clp_list_today_records(text, text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.clp_list_today_records(text, text) TO anon;
