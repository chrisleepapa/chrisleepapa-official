CREATE OR REPLACE FUNCTION public.clp_delete_today(p_initials text, p_pin_hash text, p_date date)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DECLARE
  v_account public.clp_accounts%rowtype;
  v_deleted integer := 0;
BEGIN
  IF p_initials IS NULL OR upper(trim(p_initials)) !~ '^[A-Z]{3}$'
     OR p_pin_hash IS NULL OR p_pin_hash !~ '^[a-fA-F0-9]{64}$'
     OR p_date IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', '요청 정보가 올바르지 않습니다.');
  END IF;

  SELECT * INTO v_account
  FROM public.clp_accounts
  WHERE initials = upper(trim(p_initials)) AND pin_hash = lower(p_pin_hash)
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', '인증에 실패했습니다.');
  END IF;

  DELETE FROM public.clp_today
  WHERE account_id = v_account.id AND record_date = p_date;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  RETURN jsonb_build_object('ok', true, 'deleted', v_deleted);
END;
$function$;

REVOKE ALL ON FUNCTION public.clp_delete_today(text, text, date) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.clp_delete_today(text, text, date) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.clp_delete_today(text, text, date) TO anon;
